import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';
import { FiSend, FiLoader, FiUser, FiCpu, FiAlertCircle, FiCloudRain, FiWind, FiThermometer, FiDroplet, FiImage, FiX } from 'react-icons/fi';

// ─── Types ────────────────────────────────────────────────────────────────────
interface Message {
  id: string;
  role: 'user' | 'assistant' | 'error';
  text: string;
  timestamp: Date;
  image?: string;
}

interface WeatherContext {
  temperature: number;
  humidity: number;
  condition: string;
  description: string;
  wind_speed: number;
  rain_prob: number;
  city: string;
  last_updated: string;
}

// ─── Config ───────────────────────────────────────────────────────────────────
// Calls Django directly on port 8000 (CORS is allowed in Django settings)
const DJANGO_API_BASE = 'http://127.0.0.1:8000';

const SUGGESTED_QUESTIONS = [
  'Should I irrigate today?',
  'What crops suit current weather?',
  'Any pest risk I should know about?',
  'Is today good for fertilizer application?',
  'What farm activities do you recommend?',
];

// ─── Helpers ──────────────────────────────────────────────────────────────────
function uid() {
  return Math.random().toString(36).slice(2, 10);
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// ─── Weather Strip ────────────────────────────────────────────────────────────
function WeatherStrip({ weather }: { weather: WeatherContext }) {
  return (
    <div className="chat-weather-strip">
      <span className="chat-weather-item">
        <FiThermometer /> {weather.temperature.toFixed(1)}°C
      </span>
      <span className="chat-weather-item">
        <FiDroplet /> {weather.humidity}%
      </span>
      <span className="chat-weather-item">
        <FiWind /> {weather.wind_speed} m/s
      </span>
      <span className="chat-weather-item">
        <FiCloudRain /> {weather.rain_prob} mm
      </span>
      <span className="chat-weather-badge">{weather.condition}</span>
    </div>
  );
}

// ─── Single Message Bubble ────────────────────────────────────────────────────
function MessageBubble({ msg }: { msg: Message }) {
  const isUser = msg.role === 'user';
  const isError = msg.role === 'error';

  return (
    <div className={`chat-message-row ${isUser ? 'chat-message-row--user' : 'chat-message-row--ai'}`}>
      {/* Avatar */}
      {!isUser && (
        <div className={`chat-avatar ${isError ? 'chat-avatar--error' : 'chat-avatar--ai'}`}>
          {isError ? <FiAlertCircle /> : <FiCpu />}
        </div>
      )}

      {/* Bubble */}
      <div className={`chat-bubble ${isUser ? 'chat-bubble--user' : isError ? 'chat-bubble--error' : 'chat-bubble--ai'}`}>
        {msg.image && (
          <img src={msg.image} alt="User upload" className="max-w-[200px] rounded-lg mb-2 object-contain bg-black/10" />
        )}
        <p className="chat-bubble-text">{msg.text}</p>
        <span className="chat-bubble-time">{formatTime(msg.timestamp)}</span>
      </div>

      {isUser && (
        <div className="chat-avatar chat-avatar--user">
          <FiUser />
        </div>
      )}
    </div>
  );
}

// ─── Typing Indicator ─────────────────────────────────────────────────────────
function TypingIndicator() {
  return (
    <div className="chat-message-row chat-message-row--ai">
      <div className="chat-avatar chat-avatar--ai">
        <FiCpu />
      </div>
      <div className="chat-bubble chat-bubble--ai chat-bubble--typing">
        <span className="typing-dot" />
        <span className="typing-dot" />
        <span className="typing-dot" />
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: uid(),
      role: 'assistant',
      text: "Hello! I'm Annam Farm AI 🌿 I have access to the live weather data for your farm in Neeliyamodai, Vavuniya. Ask me anything about today's conditions, crop advice, pest risks, irrigation, and more!",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherContext | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  // Send message to Django API
  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed && !selectedImage || loading) return;

    const imgBase64 = selectedImage;

    // Append user message
    const userMsg: Message = { id: uid(), role: 'user', text: trimmed, timestamp: new Date(), image: imgBase64 || undefined };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setSelectedImage(null);
    setLoading(true);

    // Build history for context (last 10 msgs)
    const history = messages.slice(-10).map(m => ({
      role: m.role === 'user' ? 'user' : 'assistant',
      text: m.text,
    }));

    try {
      const res = await fetch(`${DJANGO_API_BASE}/api/weather-chat/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: trimmed || "What do you see in this image?", history, image_base64: imgBase64 }),
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ detail: `HTTP ${res.status}` }));
        throw new Error(err.detail || `HTTP ${res.status}`);
      }

      const data = await res.json();

      // Update weather context if returned
      if (data.weather) setWeather(data.weather);

      const aiMsg: Message = {
        id: uid(),
        role: 'assistant',
        text: data.answer || 'Sorry, I could not generate a response.',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err: any) {
      const errorMsg: Message = {
        id: uid(),
        role: 'error',
        text: `Error: ${err.message || 'Failed to reach the AI server. Make sure the Django server is running on port 8000.'}`,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleImageSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="chatbot-container">
      {/* Header */}
      <div className="chatbot-header">
        <div className="chatbot-header-icon">
          <FiCpu />
        </div>
        <div>
          <h3 className="chatbot-header-title">Annam Farm AI</h3>
          <p className="chatbot-header-sub">Powered by Gemini · Live weather context</p>
        </div>
        <div className="chatbot-online-dot" title="AI Online" />
      </div>

      {/* Weather Context Strip */}
      {weather && <WeatherStrip weather={weather} />}

      {/* Messages */}
      <div className="chatbot-messages">
        {messages.map(msg => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>

      {/* Suggested Questions */}
      {messages.length <= 1 && (
        <div className="chatbot-suggestions">
          {SUGGESTED_QUESTIONS.map(q => (
            <button
              key={q}
              className="chatbot-suggestion-btn"
              onClick={() => sendMessage(q)}
              disabled={loading}
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="chatbot-input-row relative">
        {selectedImage && (
          <div className="absolute bottom-[calc(100%+8px)] left-0 p-2 bg-emerald-950 border border-emerald-500/20 rounded-xl flex items-center gap-4 z-10 shadow-lg">
            <img src={selectedImage} alt="Preview" className="h-12 w-auto rounded object-cover" />
            <button onClick={() => setSelectedImage(null)} className="text-slate-400 hover:text-white p-1 rounded-full bg-white/10 hover:bg-white/20 transition">
              <FiX />
            </button>
          </div>
        )}
        <input 
          type="file" 
          accept="image/*" 
          ref={fileInputRef} 
          className="hidden" 
          onChange={handleImageSelect} 
        />
        <button
          className="p-2 text-slate-400 hover:text-emerald-400 transition-colors shrink-0"
          onClick={() => fileInputRef.current?.click()}
          disabled={loading}
          title="Upload image"
        >
          <FiImage size={20} />
        </button>
        <textarea
          ref={inputRef}
          className="chatbot-textarea"
          placeholder="Ask about weather, crops, irrigation, pests…"
          rows={1}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={loading}
        />
        <button
          className={`chatbot-send-btn ${loading ? 'chatbot-send-btn--loading' : ''}`}
          onClick={() => sendMessage(input)}
          disabled={loading || (!input.trim() && !selectedImage)}
          title="Send (Enter)"
        >
          {loading ? <FiLoader className="spin" /> : <FiSend />}
        </button>
      </div>
      <p className="chatbot-hint">Press Enter to send · Shift+Enter for new line</p>
    </div>
  );
}
