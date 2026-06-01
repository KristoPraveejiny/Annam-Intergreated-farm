import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { FiArrowRight, FiCheckCircle, FiCpu, FiFeather, FiGrid, FiShield, FiShoppingBag, FiTrendingUp, FiUsers } from 'react-icons/fi';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { SectionHeading } from '../components/ui/SectionHeading';
import { PublicHeader } from '../components/layout/PublicHeader';
import { features, landingStats, testimonials } from '../data/mock';
import { FiMapPin, FiMail, FiPhone } from 'react-icons/fi';

const featureIcons = [FiCpu, FiFeather, FiShield, FiShoppingBag];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-transparent text-slate-900">
      <PublicHeader active="home" />

      <main>
        <section
          className="relative overflow-hidden bg-cover bg-center text-white"
          style={{ backgroundImage: "url('/hero-custom.jpg')" }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
          <div className="section-shell relative grid min-h-[92vh] items-center gap-12 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:py-24">
            <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
              <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.3em] text-white/90 backdrop-blur-xl">Smart Farming Platform</span>
              <h2 className="mt-6 text-5xl font-black tracking-tight md:text-7xl">Smart Farming for Better Productivity and Decision-Making</h2>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-emerald-50 md:text-xl">
                Manage crops, livestock, workforce, marketplace, and AI-powered farming insights in one intelligent platform.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <a href="/register"><Button theme="light" className="px-6 py-4 text-base">Get Started <FiArrowRight className="ml-2" /></Button></a>
                <a href="#about-us"><Button theme="light" variant="secondary" className="px-6 py-4 text-base">Learn More</Button></a>
              </div>
              <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {landingStats.map((stat) => (
                  <div key={stat.label} className="rounded-3xl border border-white/15 bg-white/10 p-4 backdrop-blur-2xl shadow-[0_12px_30px_rgba(2,6,23,0.12)]">
                    <p className="text-2xl font-black">{stat.value}</p>
                    <p className="mt-1 text-sm text-emerald-50/90">{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative">
              <div className="absolute -left-6 top-10 h-36 w-36 rounded-full bg-emerald-300/20 blur-3xl" />
              <div className="absolute bottom-6 right-6 h-44 w-44 rounded-full bg-lime-300/20 blur-3xl" />
              <div className="glass-panel relative overflow-hidden rounded-[2rem] p-6 text-slate-900 shadow-[0_30px_80px_rgba(2,6,23,0.25)]">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Card variant="light" title="Field Health" subtitle="AI scan summary">
                    <div className="space-y-3 text-sm">
                      <p className="flex items-center gap-2 text-emerald-700"><FiCheckCircle /> 92% crops healthy</p>
                      <p className="flex items-center gap-2 text-slate-600"><FiShield /> Low disease risk</p>
                      <p className="flex items-center gap-2 text-slate-600"><FiTrendingUp /> Yield forecast increasing</p>
                    </div>
                  </Card>
                  <Card variant="light" title="Live Operations" subtitle="Today">
                    <div className="space-y-3 text-sm text-slate-600">
                      <p>14 irrigation tasks completed</p>
                      <p>8 marketplace orders dispatched</p>
                      <p>5 livestock checks due this afternoon</p>
                    </div>
                  </Card>
                </div>
                <div className="mt-4 rounded-3xl bg-gradient-to-br from-emerald-50 to-lime-50 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-600">Farming Intelligence</p>
                  <p className="mt-2 text-2xl font-black text-slate-900">A premium, SaaS-style control center for the entire farm ecosystem.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="about-us" className="bg-white py-20">
          <div className="section-shell">
            <SectionHeading eyebrow="About Us" title="About Annam Integrated Farm: Cultivating Sustainability and Growth" description="Annam Integrated Farm combines modern techniques with traditional knowledge to create a sustainable, productive farming environment. We focus on crop and livestock integration, environmental stewardship, and community development." />
            <div className="mt-6 max-w-3xl text-sm text-slate-600">
              <p><strong>Annam Integrated Farm</strong> is a modern agricultural farm dedicated to promoting sustainable and efficient farming practices. The farm integrates crop cultivation with livestock management to create a balanced and productive farming environment. By combining traditional agricultural knowledge with modern farming techniques, Annam Integrated Farm aims to produce high-quality crops and livestock products while ensuring environmental sustainability.</p>
              <p className="mt-3">The farm is committed to improving agricultural productivity, supporting food security, and providing opportunities for learning and innovation in farming. Through responsible resource management and continuous improvement, Annam Integrated Farm strives to serve as a model for integrated farming practices.</p>
              <p className="mt-3">Beyond agricultural production, the farm encourages knowledge sharing and community development by promoting awareness of sustainable farming methods and modern agricultural technologies. Annam Integrated Farm believes that successful farming is not only about growing healthy crops and livestock but also about building a stronger and more sustainable future for agriculture.</p>
              <p className="mt-3">For more information about Annam Integrated Farm and its activities, please contact the farm management team. 🌾🐄🌱</p>
              <div className="mt-6">
                <a href="/about"><Button theme="light">Read More</Button></a>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="bg-white py-20">
          <div className="section-shell">
            <SectionHeading eyebrow="Services" title="Comprehensive farm services" description="We provide on-ground and digital services to run farms efficiently." />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                { title: 'Farm Planning', desc: 'Layout planning, crop rotation and scheduling.' },
                { title: 'Crop Monitoring', desc: 'AI-powered image detection and alerts.' },
                { title: 'Resource Management', desc: 'Inventory, inputs and workforce management.' },
                { title: 'Agricultural Analytics', desc: 'Reports, forecasting and KPI dashboards.' },
                { title: 'Equipment Tracking', desc: 'GPS and maintenance scheduling for machinery.' },
                { title: 'Irrigation Optimization', desc: 'Smart water scheduling and sensors integration.' },
              ].map((s) => (
                <Card key={s.title} variant="light" title={s.title} subtitle="Service">
                  <p className="text-sm text-slate-600">{s.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Dashboard preview removed */}

        <section id="benefits" className="bg-emerald-50/40 py-20">
          <div className="section-shell">
            <SectionHeading eyebrow="Benefits" title="Why choose Annam Integrated Farm" description="Data-driven agriculture that improves yield while reducing costs." />
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {[
                'Increase Productivity',
                'Reduce Costs',
                'Improve Crop Yield',
                'Real-Time Monitoring',
                'Data-Driven Decision Making',
                'Seamless Team Collaboration',
              ].map((b) => (
                <div key={b} className="rounded-3xl border border-white/40 bg-white/90 p-6 shadow-[0_12px_35px_rgba(2,6,23,0.06)] backdrop-blur-xl">
                  <p className="text-lg font-bold text-slate-900">{b}</p>
                  <p className="mt-2 text-sm text-slate-600">Practical, real-world tools and insights to help farming teams scale sustainably.</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="statistics" className="py-16">
          <div className="section-shell">
            <div className="grid gap-6 sm:grid-cols-4">
              <StatCard label="Farmers" value="1000+" />
              <StatCard label="Acres Managed" value="5000+" />
              <StatCard label="Crop Records" value="100000+" />
              <StatCard label="Satisfaction" value="95%" />
            </div>
          </div>
        </section>

        {/* Icon / feature strip similar to the provided design image */}
        <div className="bg-white py-8">
          <div className="section-shell flex flex-col items-center justify-center gap-6 sm:flex-row sm:justify-between">
            <div className="text-center sm:text-left">
              <h3 className="text-2xl font-extrabold text-slate-900">Welcome to Smart Farm</h3>
              <p className="mt-2 text-sm text-slate-600">We offer a wide selection of produce, livestock and farm products for sale.</p>
            </div>

            <div className="grid w-full grid-cols-2 gap-4 sm:w-auto sm:grid-cols-4">
              <FeaturePill icon={<FiFeather />} label="Pure Produce" />
              <FeaturePill icon={<FiShield />} label="Trusted" />
              <FeaturePill icon={<FiTrendingUp />} label="Fast Delivery" />
              <FeaturePill icon={<FiUsers />} label="Community" />
            </div>
          </div>
        </div>

        {/* About moved to its own page: /about */}

        <section id="features" className="bg-white py-20">
          <div className="section-shell">
            <SectionHeading eyebrow="Features" title="Everything modern agriculture teams need" description="Premium dashboards, reporting, alerts, and operational tools wrapped in a refined responsive experience." />
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {features.map((feature, index) => {
                const Icon = featureIcons[index % featureIcons.length];
                return (
                  <Card variant="light" key={feature} title={feature}>
                    <div className="flex items-center gap-3 text-sm text-slate-600"><Icon className="text-emerald-600" /> Built for mobile-first farm operations</div>
                  </Card>
                );
              })}
            </div>
                  
          </div>
        </section>

        <section id="ai" className="section-shell py-20">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr]">
            <Card variant="light" title="AI Advisory" subtitle="Futuristic farm intelligence">
              <p className="text-sm leading-7 text-slate-600">Get weather-based recommendations, crop suggestions, disease risk alerts, and actionable smart insights from a sleek AI panel.</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <BadgeItem icon={<FiCpu />} text="AI chat assistant" />
                <BadgeItem icon={<FiTrendingUp />} text="Risk prediction" />
                <BadgeItem icon={<FiFeather />} text="Crop guidance" />
                <BadgeItem icon={<FiShield />} text="Disease detection" />
              </div>
            </Card>
            <Card variant="light" title="Marketplace preview" subtitle="Fresh produce experience">
              <div className="grid gap-3 sm:grid-cols-2">
                <MiniProduct title="Organic vegetables" price="From $3.00" />
                <MiniProduct title="Fresh dairy" price="From $2.80" />
                <MiniProduct title="Egg bundles" price="From $5.10" />
                <MiniProduct title="Organic packs" price="From $7.20" />
              </div>
            </Card>
          </div>
        </section>

        <section className="bg-emerald-50/70 py-20">
          <div className="section-shell">
            <SectionHeading eyebrow="Testimonials" title="Built to feel trustworthy and premium" />
            <div className="grid gap-6 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <Card variant="light" key={testimonial.name}>
                  <p className="text-base leading-7 text-slate-700">“{testimonial.quote}”</p>
                  <p className="mt-4 text-sm font-bold text-emerald-700">{testimonial.name}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="section-shell py-20">
          <Card variant="light" className="bg-gradient-to-br from-emerald-700 to-lime-500 text-white" title="Ready to modernize your farm operations?" subtitle="Start with a beautifully designed smart agriculture platform that feels enterprise-grade from day one.">
            <div className="flex flex-wrap gap-4">
              <a href="/register"><Button theme="light" className="bg-white text-emerald-700 hover:bg-emerald-50">Get Started</Button></a>
              <a href="/login"><Button theme="light" variant="secondary" className="border-white/20 bg-white/10 text-white hover:bg-white/20">Open Dashboard</Button></a>
            </div>
          </Card>
        </section>

        <section id="contact" className="py-20">
          <div className="section-shell grid gap-6 lg:grid-cols-2">
            <ContactForm />
            <div className="rounded-3xl p-6">
              <p className="text-lg font-bold text-slate-900">Contact Details</p>
              <p className="mt-3 text-sm text-slate-600">We’re based in your region and offer on-ground support and remote advisory.</p>
              <div className="mt-6 space-y-4 text-sm text-slate-700">
                <div className="flex items-center gap-3"><FiMapPin className="text-emerald-600" /> <span>Plot 12, Green Valley, State</span></div>
                <div className="flex items-center gap-3"><FiMail className="text-emerald-600" /> <span>support@annamfarm.example</span></div>
                <div className="flex items-center gap-3"><FiPhone className="text-emerald-600" /> <span>+1 (555) 123-4567</span></div>
              </div>
              <div className="mt-6 h-44 w-full rounded-2xl bg-gradient-to-br from-emerald-100 to-lime-50" />
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-emerald-100 bg-white py-12">
        <div className="section-shell grid gap-8 md:grid-cols-4">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Annam Integrated Farm</h4>
            <p className="mt-2 text-sm text-slate-600">Premium farm management platform — dashboards, AI advisories, and marketplace.</p>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-slate-800">Quick Links</h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li><a href="/" className="hover:text-emerald-600">Home</a></li>
              <li><a href="/about" className="hover:text-emerald-600">About</a></li>
              <li><a href="/#features" className="hover:text-emerald-600">Features</a></li>
              <li><a href="/marketplace" className="hover:text-emerald-600">Marketplace</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-slate-800">Services</h5>
            <ul className="mt-3 space-y-2 text-sm text-slate-600">
              <li>Farm Planning</li>
              <li>Crop Monitoring</li>
              <li>Analytics</li>
              <li>Equipment Tracking</li>
            </ul>
          </div>

          <div>
            <h5 className="text-sm font-semibold text-slate-800">Follow Us</h5>
            <div className="mt-3 flex items-center gap-3">
              <a className="h-10 w-10 rounded-full bg-emerald-50 grid place-items-center text-emerald-700" href="#">In</a>
              <a className="h-10 w-10 rounded-full bg-emerald-50 grid place-items-center text-emerald-700" href="#">Fb</a>
              <a className="h-10 w-10 rounded-full bg-emerald-50 grid place-items-center text-emerald-700" href="#">Tw</a>
            </div>
          </div>
        </div>

        <div className="section-shell mt-8 border-t border-emerald-100 pt-6 text-center text-sm text-slate-500">© {new Date().getFullYear()} Annam Integrated Farm. All rights reserved.</div>
      </footer>
    </div>
  );
}

function BadgeItem({ icon, text }: { icon: ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/40 bg-white/70 px-4 py-3 text-sm font-semibold text-emerald-800 shadow-[0_10px_25px_rgba(15,23,42,0.06)] backdrop-blur-xl">
      {icon}
      {text}
    </div>
  );
}

function MiniProduct({ title, price }: { title: string; price: string }) {
  return (
    <div className="rounded-3xl border border-white/35 bg-white/70 p-4 shadow-[0_14px_35px_rgba(15,23,42,0.08)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(16,185,129,0.12)]">
      <div className="h-28 rounded-2xl bg-gradient-to-br from-emerald-100/90 via-lime-100/80 to-white/90" />
      <p className="mt-3 text-sm font-bold text-slate-900">{title}</p>
      <p className="text-sm text-emerald-700">{price}</p>
    </div>
  );
}

function FeaturePill({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-white/95 px-4 py-3 text-sm font-semibold text-slate-800 shadow-[0_10px_25px_rgba(2,6,23,0.08)]">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-emerald-50 text-emerald-700">{icon}</div>
      <div className="leading-tight">
        <p className="text-sm font-bold">{label}</p>
      </div>
    </div>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-3xl bg-gradient-to-br from-white to-emerald-50 p-6 text-center shadow-[0_12px_30px_rgba(2,6,23,0.06)]">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-3 text-3xl font-black text-emerald-700">{value}</p>
    </div>
  );
}

function ContactForm() {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-[0_14px_35px_rgba(2,6,23,0.06)]">
      <p className="text-lg font-bold text-slate-900">Contact Us</p>
      <p className="mt-2 text-sm text-slate-600">Send us a message and we'll get back to you.</p>
      <form className="mt-4 grid gap-3 sm:grid-cols-2">
        <input className="farm-input w-full" placeholder="Full name" />
        <input className="farm-input w-full" placeholder="Email" />
        <input className="farm-input w-full" placeholder="Phone" />
        <input className="farm-input w-full" placeholder="Subject" />
        <textarea className="farm-input col-span-2 h-32 w-full" placeholder="Message" />
        <div className="col-span-2 text-right">
          <Button theme="light">Send Message</Button>
        </div>
      </form>
    </div>
  );
}
