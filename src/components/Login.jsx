import {useState, useRef, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import LoginTheme, {DEFAULT_THEME} from './LoginTheme';

const THEME_STORAGE_KEY='sgsits-login-theme-v1';

function isValidStoredTheme(value)
{
  if (!value||typeof value!=='object') return false;
  return (
    typeof value.bgType==='string'&&
    typeof value.bgImage==='string'&&
    typeof value.bgColor==='string'&&
    typeof value.overlayOpacity==='number'&&
    typeof value.navColor==='string'&&
    typeof value.btnColor==='string'&&
    typeof value.cardAccent==='string'
  );
}

/* ── Canvas Captcha ──────────────────────────────────────── */
function generateCaptchaText()
{
  const chars='ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
  return Array.from({length: 6}, () => chars[Math.floor(Math.random()*chars.length)]).join('');
}

function CaptchaCanvas({text})
{
  const canvasRef=useRef(null);
  useEffect(() =>
  {
    const canvas=canvasRef.current;
    if (!canvas) return;
    const ctx=canvas.getContext('2d');
    const W=canvas.width, H=canvas.height;
    ctx.fillStyle='#e8f5e9';
    ctx.fillRect(0, 0, W, H);
    for (let i=0;i<6;i++)
    {
      ctx.beginPath(); ctx.moveTo(0, (H/6)*i); ctx.lineTo(W, (H/6)*i);
      ctx.strokeStyle='rgba(0,100,50,0.12)'; ctx.lineWidth=1; ctx.stroke();
    }
    for (let i=0;i<5;i++)
    {
      ctx.beginPath();
      ctx.arc(Math.random()*W, Math.random()*H, 8+Math.random()*18, 0, Math.PI*2);
      ctx.strokeStyle=`rgba(0,120,60,${0.07+Math.random()*0.09})`; ctx.lineWidth=1; ctx.stroke();
    }
    const fonts=['Georgia', 'Times New Roman', 'Arial', 'Courier New'];
    const spacing=(W-16)/text.length;
    for (let i=0;i<text.length;i++)
    {
      ctx.save();
      ctx.translate(10+i*spacing+spacing/2, H/2+5);
      ctx.rotate((Math.random()-0.5)*0.45);
      ctx.font=`bold ${16+Math.random()*7}px ${fonts[i%fonts.length]}`;
      ctx.fillStyle=`hsl(${130+Math.random()*40},60%,${18+Math.random()*10}%)`;
      ctx.fillText(text[i], -5, 5);
      ctx.restore();
    }
  }, [text]);
  return <canvas ref={canvasRef} width={140} height={46} className="rounded select-none border border-gray-300" />;
}

/* ── Login Page ──────────────────────────────────────────── */
export default function Login()
{
  const [username, setUsername]=useState('');
  const [password, setPassword]=useState('');
  const [showPwd, setShowPwd]=useState(false);
  const [captchaText, setCaptchaText]=useState(() => generateCaptchaText());
  const [captchaInput, setCaptchaInput]=useState('');
  const [error, setError]=useState('');
  const [loginType, setLoginType]=useState('student');

  // Theme state — Login.jsx owns it, passes down to LoginTheme
  const [theme, setTheme]=useState(() =>
  {
    try
    {
      const storedTheme=window.localStorage.getItem(THEME_STORAGE_KEY);
      if (!storedTheme) return {...DEFAULT_THEME};
      const parsed=JSON.parse(storedTheme);
      if (!isValidStoredTheme(parsed)) return {...DEFAULT_THEME};
      return {...DEFAULT_THEME, ...parsed};
    } catch
    {
      return {...DEFAULT_THEME};
    }
  });
  const [bgImageBroken, setBgImageBroken]=useState(false);

  const refreshCaptcha=useCallback(() =>
  {
    setCaptchaText(generateCaptchaText()); setCaptchaInput('');
  }, []);

  const handleSubmit=(e) =>
  {
    e.preventDefault(); setError('');
    if (!username.trim()) return setError('Please enter your username.');
    if (!password) return setError('Please enter your password.');
    if (captchaInput.toLowerCase()!==captchaText.toLowerCase())
    {
      setError('Captcha does not match. Please try again.'); return refreshCaptcha();
    }
    alert(`✅ Login successful as ${loginType}! (Demo)`);
  };

  const tabs=[
    {key: 'student', label: 'Student Login'},
    {key: 'faculty', label: 'Faculty Login'},
    {key: 'admin', label: 'Admin Login'},
  ];

  useEffect(() =>
  {
    window.localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(theme));
  }, [theme]);

  const resolvedBgImage=theme.bgImage.startsWith('/assets/')
    ? `${import.meta.env.BASE_URL.replace(/\/$/, '')}${theme.bgImage}`
    :theme.bgImage;

  useEffect(() =>
  {
    if (theme.bgType!=='image'||!resolvedBgImage.trim())
    {
      setBgImageBroken(false);
      return;
    }

    let canceled=false;
    const image=new Image();
    image.onload=() =>
    {
      if (!canceled) setBgImageBroken(false);
    };
    image.onerror=() =>
    {
      if (!canceled) setBgImageBroken(true);
    };
    image.src=resolvedBgImage;

    return () =>
    {
      canceled=true;
    };
  }, [theme.bgType, resolvedBgImage]);

  // Derived background style
  const bgStyle=theme.bgType==='image'&&!bgImageBroken
    ? {backgroundImage: `url('${resolvedBgImage}')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed'}
    :{backgroundColor: theme.bgColor};

  return (
    <div className="min-h-screen flex flex-col relative" style={bgStyle}>
      {/* Overlay — only for image or when color needs it */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{background: `rgba(0,0,0,${theme.bgType==='image'&&!bgImageBroken? theme.overlayOpacity:0.15})`}}
      />

      {/* ── Navy navbar ── */}
      <nav
        className="w-full flex items-center gap-3 px-4 sm:px-6 py-3 shadow-md relative z-40"
        style={{backgroundColor: theme.navColor}}
      >
        <Link to="/" className="flex items-center gap-3">
          <img src="/assets/image.png" alt="SGSITS" className="w-10 h-10 object-contain bg-white rounded-full p-0.5 shrink-0" />
          <div className="hidden sm:block">
            <p className="text-white font-bold text-sm leading-tight">Shri Govindram Seksaria Institute</p>
            <p className="text-white/50 text-[11px]">of Technology and Science, Indore</p>
          </div>
        </Link>
        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          {/* Pass theme state + updater into LoginTheme */}
          <LoginTheme theme={theme} setTheme={setTheme} bgImageBroken={bgImageBroken} />
          <Link to="/" className="text-white/70 hover:text-white text-xs font-medium flex items-center gap-1 transition-colors">
            <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              <polyline strokeLinecap="round" strokeLinejoin="round" points="9 22 9 12 15 12 15 22" />
            </svg>
            <span className="hidden sm:inline">Home</span>
          </Link>
        </div>
      </nav>

      {/* ── Centered card ── */}
      <div className="flex-1 flex items-center justify-center px-4 py-10 relative z-10">
        <div className="w-full max-w-[420px]">

          <div className="bg-white rounded-2xl shadow-[0_16px_60px_rgba(0,0,0,0.5)] border border-white/10 overflow-hidden">
            {/* Card accent bar */}
            <div className="h-1.5" style={{backgroundColor: theme.cardAccent}} />

            <div className="px-7 sm:px-9 py-8">
              <h1 className="text-xl sm:text-[22px] font-bold text-center mb-5 text-gray-800">
                {tabs.find(t => t.key===loginType)?.label}
              </h1>

              {/* Tab switcher */}
              <div className="flex rounded-lg border border-gray-200 overflow-hidden mb-6 text-[13px] font-semibold">
                {tabs.map((t) => (
                  <button
                    key={t.key}
                    onClick={() => {setLoginType(t.key); setError('');}}
                    className="flex-1 py-2.5 transition-all"
                    style={loginType===t.key
                      ? {backgroundColor: theme.btnColor, color: '#fff'}
                      :{backgroundColor: '#fff', color: '#6b7280'}}
                  >
                    {t.key.charAt(0).toUpperCase()+t.key.slice(1)}
                  </button>
                ))}
              </div>

              {error&&(
                <div className="mb-4 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-2.5 rounded-lg flex items-center gap-2">
                  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                {/* Username */}
                <div className="relative">
                  <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    autoComplete="username"
                    className="w-full border border-gray-300 rounded px-4 py-3 pr-11 text-sm focus:outline-none placeholder-gray-400 bg-white transition-all"
                    onFocus={(e) => e.target.style.borderColor=theme.btnColor}
                    onBlur={(e) => e.target.style.borderColor='#d1d5db'} />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" /><polyline points="22,6 12,13 2,6" />
                    </svg>
                  </span>
                </div>

                {/* Password */}
                <div className="relative">
                  <input type={showPwd? 'text':'password'} value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    autoComplete="current-password"
                    className="w-full border border-gray-300 rounded px-4 py-3 pr-11 text-sm focus:outline-none placeholder-gray-400 bg-white transition-all"
                    onFocus={(e) => e.target.style.borderColor=theme.btnColor}
                    onBlur={(e) => e.target.style.borderColor='#d1d5db'} />
                  <button type="button" onClick={() => setShowPwd(s => !s)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors">
                    {showPwd
                      ? <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24" /><line x1="1" y1="1" x2="23" y2="23" /></svg>
                      :<svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.6" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
                    }
                  </button>
                </div>

                {/* Captcha */}
                <div className="flex items-center gap-2">
                  <CaptchaCanvas text={captchaText} />
                  <button type="button" onClick={refreshCaptcha}
                    className="text-gray-500 hover:text-gray-700 p-1.5 rounded hover:bg-gray-100 shrink-0 transition-colors">
                    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                      <polyline points="23 4 23 10 17 10" /><polyline points="1 20 1 14 7 14" />
                      <path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" />
                    </svg>
                  </button>
                  <input type="text" value={captchaInput} maxLength={6}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    placeholder="Captcha"
                    autoComplete="off"
                    className="flex-1 min-w-0 border border-gray-300 rounded px-3 py-3 text-sm focus:outline-none placeholder-gray-400 font-mono tracking-widest bg-white transition-all"
                    onFocus={(e) => e.target.style.borderColor=theme.btnColor}
                    onBlur={(e) => e.target.style.borderColor='#d1d5db'} />
                </div>

                {/* Sign In */}
                <button type="submit"
                  className="w-full py-3 rounded text-white font-bold text-[15px] tracking-wide transition-all hover:opacity-90 active:scale-[0.98] mt-1"
                  style={{backgroundColor: theme.btnColor}}>
                  Sign In
                </button>
              </form>

              <div className="text-right mt-4">
                <a href="#" className="text-sm font-medium flex items-center gap-1 justify-end hover:opacity-70 transition-opacity"
                  style={{color: theme.btnColor}}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                  Forgot Password?
                </a>
              </div>
            </div>
          </div>

          <p className="text-center text-white/60 text-xs mt-5">
            © {new Date().getFullYear()} SGSITS Indore. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
