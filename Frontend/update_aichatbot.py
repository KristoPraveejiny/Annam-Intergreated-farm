import re

file_path = r'd:\Praveena\3rd year\2nd semi\Annam Integrated Farm\Frontend\src\components\AIChatbot\AIChatbot.tsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Imports
content = content.replace(
    "import { useState, useRef, useEffect, KeyboardEvent } from 'react';",
    "import { useState, useRef, useEffect, KeyboardEvent, ChangeEvent } from 'react';"
)
content = content.replace(
    "import { FiSend, FiLoader, FiUser, FiCpu, FiAlertCircle, FiCloudRain, FiWind, FiThermometer, FiDroplet } from 'react-icons/fi';",
    "import { FiSend, FiLoader, FiUser, FiCpu, FiAlertCircle, FiCloudRain, FiWind, FiThermometer, FiDroplet, FiImage, FiX } from 'react-icons/fi';"
)

# 2. Types
content = content.replace(
    "  text: string;\n  timestamp: Date;\n}",
    "  text: string;\n  timestamp: Date;\n  image?: string;\n}"
)

# 3. MessageBubble
bubble_old = """      {/* Bubble */}
      <div className={`chat-bubble ${isUser ? 'chat-bubble--user' : isError ? 'chat-bubble--error' : 'chat-bubble--ai'}`}>
        <p className="chat-bubble-text">{msg.text}</p>"""
bubble_new = """      {/* Bubble */}
      <div className={`chat-bubble ${isUser ? 'chat-bubble--user' : isError ? 'chat-bubble--error' : 'chat-bubble--ai'}`}>
        {msg.image && (
          <img src={msg.image} alt="User upload" className="max-w-[200px] rounded-lg mb-2 object-contain bg-black/10" />
        )}
        <p className="chat-bubble-text">{msg.text}</p>"""
content = content.replace(bubble_old, bubble_new)

# 4. State and refs
state_old = """  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherContext | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);"""
state_new = """  const [loading, setLoading] = useState(false);
  const [weather, setWeather] = useState<WeatherContext | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);"""
content = content.replace(state_old, state_new)

# 5. sendMessage logic
send_old = """  // Send message to Django API
  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    // Append user message
    const userMsg: Message = { id: uid(), role: 'user', text: trimmed, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
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
        body: JSON.stringify({ question: trimmed, history }),
      });"""
send_new = """  // Send message to Django API
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
      });"""
content = content.replace(send_old, send_new)

# 6. handleImageSelect and JSX
jsx_old = """  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  return (
    <div className="chatbot-container">"""
jsx_new = """  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
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
    <div className="chatbot-container">"""
content = content.replace(jsx_old, jsx_new)

# 7. Input row
input_old = """      {/* Input Area */}
      <div className="chatbot-input-row">
        <textarea"""
input_new = """      {/* Input Area */}
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
        <textarea"""
content = content.replace(input_old, input_new)

# 8. Send button disabled state
content = content.replace(
    "disabled={loading || !input.trim()}",
    "disabled={loading || (!input.trim() && !selectedImage)}"
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print('Updated AIChatbot.tsx successfully.')
