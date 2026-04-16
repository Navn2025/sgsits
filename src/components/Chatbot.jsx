import { useState, useEffect, useRef } from 'react';

const BOT_NAME = 'SGSITS Assistant';
const BOT_AVATAR = '/assets/image.png';

const RESPONSES = [
  {
    keywords: ['admission', 'apply', 'application', 'eligibility', 'jee', 'entrance'],
    reply: `🎓 **Admissions at SGSITS** are conducted through JEE Main (for B.Tech) and state-level counseling (MPDTE). Key points:\n• B.Tech: JEE Main + MPDTE counseling\n• M.Tech / MBA / MCA: MAT / GATE / MP PET\n• Ph.D: Departmental entrance test\n\nVisit sgsits.ac.in/admissions for the latest schedule!`,
  },
  {
    keywords: ['fee', 'fees', 'tuition', 'cost', 'scholarship'],
    reply: `💰 **Fee Structure (approx.)**:\n• B.Tech (General): ₹45,000–₹55,000/year\n• M.Tech: ₹30,000–₹40,000/year\n\nScholarships available:\n• Government post-matric scholarships\n• Institute merit scholarships\n• SC/ST fee waivers`,
  },
  {
    keywords: ['department', 'branch', 'courses', 'program', 'cse', 'it', 'civil', 'mechanical', 'electrical'],
    reply: `🏛️ **Departments at SGSITS**:\n• Computer Engineering\n• Information Technology\n• Civil Engineering\n• Mechanical Engineering\n• Electrical Engineering\n• Electronics & Instrumentation\n• Electronics & Telecommunication\n• Industrial & Production Engineering\n\nWhich department would you like to know more about?`,
  },
  {
    keywords: ['placement', 'job', 'recruit', 'package', 'company', 'campus'],
    reply: `💼 **Placements at SGSITS**:\n• Highest Package: **50 LPA**\n• Average Package: **12+ LPA**\n• 350+ Recruiters visit annually\n• 95%+ placement rate\n\nTop Recruiters: TCS, Infosys, Wipro, L&T, Amazon, Microsoft & more!`,
  },
  {
    keywords: ['hostel', 'accommodation', 'stay', 'pg', 'room'],
    reply: `🏠 **Hostel Facilities**:\n• Separate hostels for boys and girls\n• 24/7 security and Wi-Fi connectivity\n• Mess with nutritious meals\n• Recreation rooms and sports facilities`,
  },
  {
    keywords: ['contact', 'phone', 'email', 'address', 'location'],
    reply: `📍 **Contact SGSITS**:\n• Address: Park Road, Indore, MP 452003\n• Phone: 0731-2563980\n• Email: director@sgsits.ac.in\n• Website: www.sgsits.ac.in`,
  },
  {
    keywords: ['naac', 'rank', 'rating', 'accreditation', 'nirf'],
    reply: `🏆 **Rankings & Accreditation**:\n• NAAC Accredited: Grade **A**\n• NBA Accredited programs\n• Recognized as an Institute of National Standing\n• Consistent presence in NIRF rankings`,
  },
  {
    keywords: ['hello', 'hi', 'hey', 'namaste'],
    reply: `👋 Hello! I'm the **SGSITS Virtual Assistant**.\n\nI can help you with:\n• Admissions & Eligibility\n• Courses & Departments\n• Fee Structure & Scholarships\n• Placements & Recruiters\n• Hostel & Campus Life\n• Contact & Location\n\nWhat would you like to know?`,
  },
  {
    keywords: ['thank', 'thanks', 'bye', 'goodbye'],
    reply: `😊 You're welcome! Feel free to ask anything else about SGSITS. Have a great day! 🎓`,
  },
];

const FALLBACK = `🤔 I'm not sure about that. I can help with:\n• Admissions & Eligibility\n• Fee Structure\n• Departments & Courses\n• Placements\n• Hostel & Campus Life\n• Contact Information\n\nTry asking about any of these topics!`;

function getBotReply(message) {
  const lowerMsg = message.toLowerCase();
  for (const item of RESPONSES) {
    if (item.keywords.some((kw) => lowerMsg.includes(kw))) return item.reply;
  }
  return FALLBACK;
}

function MessageBubble({ msg }) {
  const isBot = msg.sender === 'bot';
  return (
    <div className={`flex items-end gap-2 mb-3 ${isBot ? 'justify-start' : 'justify-end'}`}>
      {isBot && (
        <img src={BOT_AVATAR} alt="Bot" className="w-7 h-7 rounded-full object-contain bg-white border border-gray-200 shrink-0 mb-0.5" />
      )}
      <div
        className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line shadow-sm ${
          isBot ? 'bg-white text-gray-800 rounded-tl-sm border border-gray-100' : 'rounded-tr-sm text-white'
        }`}
        style={!isBot ? { backgroundColor: 'var(--color-primary)' } : {}}
      >
        {msg.text}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-end gap-2 mb-3 justify-start">
      <img src={BOT_AVATAR} alt="Bot" className="w-7 h-7 rounded-full object-contain bg-white border border-gray-200 shrink-0" />
      <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
        <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'bot', text: `👋 Hello! I'm your SGSITS Virtual Assistant.\n\nAsk me anything about admissions, departments, placements, fees, hostel, or campus life!` },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Detect footer proximity
  useEffect(() => {
    const footer = document.querySelector('footer');
    if (!footer) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNearFooter(entry.isIntersecting),
      { threshold: 0.05 }
    );
    observer.observe(footer);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  const sendMessage = (text) => {
    const trimmed = (text ?? inputValue).trim();
    if (!trimmed) return;
    setMessages((prev) => [...prev, { id: Date.now(), sender: 'user', text: trimmed }]);
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [...prev, { id: Date.now() + 1, sender: 'bot', text: getBotReply(trimmed) }]);
    }, 900 + Math.random() * 700);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  const QUICK_QUESTIONS = ['Admissions', 'Placements', 'Fee Structure', 'Departments'];

  // Button colors: change when near footer so it's visible against the dark footer
  const btnBg = nearFooter ? '#D4AF37' : 'var(--color-primary)';
  const btnShadow = nearFooter
    ? '0 8px 30px rgba(212,175,55,0.5)'
    : '0 8px 30px rgba(0,0,0,0.2)';

  return (
    <>
      {/* Chat Window */}
      <div
        className={`fixed bottom-24 right-5 z-[200] w-[360px] max-h-[560px] flex flex-col bg-[#f3f4f8] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.18)] border border-gray-200 transition-all duration-300 origin-bottom-right ${
          isOpen ? 'opacity-100 scale-100 pointer-events-auto' : 'opacity-0 scale-90 pointer-events-none'
        }`}
        style={{ maxWidth: 'calc(100vw - 20px)' }}
      >
        {/* Header */}
        <div className="flex items-center gap-3 px-4 py-3.5 rounded-t-2xl shrink-0" style={{ background: 'var(--color-primary)' }}>
          <div className="relative shrink-0">
            <img src={BOT_AVATAR} alt="Bot" className="w-10 h-10 rounded-full object-contain bg-white p-0.5 border-2 border-white/30" />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1">
            <p className="text-white font-bold text-sm leading-tight">{BOT_NAME}</p>
            <p className="text-white/70 text-[11px]">Online · SGSITS Institute Portal</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white transition-colors p-1 rounded-lg hover:bg-white/10">
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 py-3 min-h-0" style={{ maxHeight: '340px' }}>
          {messages.map((msg) => <MessageBubble key={msg.id} msg={msg} />)}
          {isTyping && <TypingIndicator />}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick chips */}
        <div className="px-4 py-2 flex gap-2 flex-wrap shrink-0 border-t border-gray-200 bg-white/60">
          {QUICK_QUESTIONS.map((q) => (
            <button key={q} onClick={() => sendMessage(q)}
              className="text-[11px] font-semibold px-3 py-1 rounded-full border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 transition-colors shadow-sm">
              {q}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-3 py-3 flex items-center gap-2 bg-white rounded-b-2xl border-t border-gray-100 shrink-0">
          <input ref={inputRef} type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} onKeyDown={handleKeyDown}
            placeholder="Ask about SGSITS..."
            className="flex-1 text-sm px-3 py-2.5 rounded-xl border border-gray-200 focus:outline-none bg-gray-50 transition-all"
            onFocus={(e) => e.target.style.borderColor = 'var(--color-primary)'}
            onBlur={(e) => e.target.style.borderColor = ''}
          />
          <button onClick={() => sendMessage()} disabled={!inputValue.trim()}
            className="w-10 h-10 rounded-xl flex items-center justify-center transition-all disabled:opacity-40 hover:opacity-90 active:scale-95 shrink-0"
            style={{ background: 'var(--color-primary)' }}>
            <svg width="18" height="18" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Floating Toggle Button — changes color near footer */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        className="fixed bottom-5 right-5 z-[200] w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 active:scale-95"
        style={{ background: btnBg, boxShadow: btnShadow }}
        aria-label="Toggle chatbot"
      >
        {isOpen ? (
          <svg width="22" height="22" fill="none" stroke="white" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full animate-ping opacity-25" style={{ background: btnBg }} />
        )}
      </button>
    </>
  );
}
