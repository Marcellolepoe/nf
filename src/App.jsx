import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Flame,
  Sword,
  Timer,
  ChevronLeft,
  CheckCircle2,
  AlertTriangle,
  Book,
  Trophy,
  Users,
  PenTool,
  Clock,
  Zap,
  Star,
  Quote
} from 'lucide-react';
import { WARFARE_STEPS, PANIC_TECHNIQUES, VERSES, IDENTITY_PROMISE, DAILY_QUOTES } from './constants';

const App = () => {
  const [view, setView] = useState('home'); // home, warfare, panic, summary, journal, stats, manifesto
  const [streak, setStreak] = useState(0);
  const [lastRelapse, setLastRelapse] = useState(null);
  const [currentStepId, setCurrentStepId] = useState('w1');
  const [panicIndex, setPanicIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [journalEntries, setJournalEntries] = useState([]);
  const [dailyQuote, setDailyQuote] = useState("");

  const timerRef = useRef(null);

  useEffect(() => {
    const savedRelapse = localStorage.getItem('nf_last_relapse');
    if (savedRelapse) {
      setLastRelapse(new Date(savedRelapse));
    } else {
      const now = new Date();
      setLastRelapse(now);
      localStorage.setItem('nf_last_relapse', now.toISOString());
    }

    const savedJournal = localStorage.getItem('nf_journal');
    if (savedJournal) setJournalEntries(JSON.parse(savedJournal));

    // Simple daily quote based on date
    const day = new Date().getDate();
    setDailyQuote(DAILY_QUOTES[day % DAILY_QUOTES.length]);

    timerRef.current = setInterval(() => {
      const saved = localStorage.getItem('nf_last_relapse');
      if (saved) {
        const diff = Math.floor((new Date() - new Date(saved)) / 1000);
        setStreak(diff);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  const formatStreak = (s) => {
    const days = Math.floor(s / (24 * 3600));
    const hours = Math.floor((s % (24 * 3600)) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return { days, hours, mins, secs };
  };

  const handleRelapse = () => {
    if (window.confirm("WARNING: This action destroys your current progress and the person you are becoming. Are you sure?")) {
      const now = new Date();
      setLastRelapse(now);
      localStorage.setItem('nf_last_relapse', now.toISOString());

      // Log failure in journal
      const newEntry = {
        date: new Date().toISOString(),
        type: 'relapse',
        content: "Relapse occurred. Streak was " + formatStreak(streak).days + " days."
      };
      const updated = [newEntry, ...journalEntries];
      setJournalEntries(updated);
      localStorage.setItem('nf_journal', JSON.stringify(updated.slice(0, 50)));

      setView('home');
    }
  };

  const saveJournal = (text) => {
    const newEntry = {
      date: new Date().toISOString(),
      type: 'note',
      content: text
    };
    const updated = [newEntry, ...journalEntries];
    setJournalEntries(updated);
    localStorage.setItem('nf_journal', JSON.stringify(updated.slice(0, 50)));
    setView('home');
  };

  const { days, hours, mins, secs } = formatStreak(streak);
  const currentStep = WARFARE_STEPS.find(s => s.id === currentStepId) || WARFARE_STEPS[0];

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#050505', color: '#fff', fontFamily: "'Outfit', sans-serif" }}>

      {/* HUD Header */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ background: '#ff4444', padding: '4px', borderRadius: '4px' }}><ShieldAlert size={16} color="#fff" /></div>
          <span style={{ fontWeight: '900', letterSpacing: '2px', fontSize: '0.9rem' }}>NF COMMAND</span>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button onClick={() => setView('manifesto')} style={{ color: '#ffcc00' }}><Star size={20} /></button>
          <button onClick={() => setView('panic')} style={{ background: '#ff4444', color: '#fff', padding: '4px 10px', borderRadius: '4px', fontSize: '0.6rem', fontWeight: '900' }}>PANIC</button>
        </div>
      </header>

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Quote of the Day */}
            <div style={{ textAlign: 'center', marginBottom: '40px', padding: '0 10px' }}>
              <Quote size={16} color="#444" style={{ marginBottom: '10px' }} />
              <p style={{ fontStyle: 'italic', color: '#888', fontSize: '0.95rem', lineHeight: '1.4' }}>"{dailyQuote}"</p>
            </div>

            {/* Streak Counter */}
            <div style={{ textAlign: 'center', marginBottom: '40px', background: 'linear-gradient(180deg, #111 0%, #050505 100%)', padding: '30px 20px', borderRadius: '24px', border: '1px solid #1a1a1a' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '15px' }}>
                <div className="streak-unit"><div className="num">{days}</div><div className="label">DAYS</div></div>
                <div className="streak-unit"><div className="num">{hours}</div><div className="label">HRS</div></div>
                <div className="streak-unit"><div className="num">{mins}</div><div className="label">MINS</div></div>
              </div>
              <div style={{ color: '#ffcc00', fontSize: '0.7rem', letterSpacing: '3px', fontWeight: '900', opacity: 0.8 }}>INTERNAL POWER LEVEL</div>
            </div>

            {/* Tactical Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
              <button onClick={() => setView('warfare')} className="action-card" style={{ background: '#fff', color: '#000' }}>
                <Sword size={20} />
                <span>Warfare</span>
              </button>
              <button onClick={() => setView('journal')} className="action-card">
                <PenTool size={20} color="#ffcc00" />
                <span>Journal</span>
              </button>
              <button onClick={() => setView('stats')} className="action-card">
                <Trophy size={20} color="#00ff00" />
                <span>Battle</span>
              </button>
              <button onClick={() => setView('manifesto')} className="action-card">
                <Zap size={20} color="#3b82f6" />
                <span>Manifesto</span>
              </button>
            </div>

            <button
              onClick={handleRelapse}
              style={{ width: '100%', padding: '16px', border: '1px solid #222', color: '#444', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              I Failed (Reset Everything)
            </button>
          </motion.div>
        )}

        {view === 'manifesto' && (
          <motion.div key="manifesto" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setView('home')} style={{ color: '#666' }}><ChevronLeft size={24} /></button>
              <h2 style={{ fontSize: '1rem', fontWeight: '900', color: '#ffcc00' }}>IDENTITY PROMISE</h2>
            </div>

            <div style={{ padding: '30px', background: '#111', borderRadius: '24px', border: '1px solid #222' }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '900', marginBottom: '25px', textAlign: 'center' }}>{IDENTITY_PROMISE.title}</h3>
              {IDENTITY_PROMISE.manifesto.map((line, i) => (
                <div key={i} style={{ display: 'flex', gap: '15px', marginBottom: '20px', lineHeight: '1.5' }}>
                  <div style={{ color: '#ffcc00', fontWeight: '900' }}>{i + 1}.</div>
                  <div style={{ fontSize: '1rem', color: '#eee' }}>{line}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setView('home')}
              style={{ width: '100%', padding: '20px', background: '#fff', color: '#000', borderRadius: '12px', fontWeight: '900', marginTop: '30px' }}
            >
              I ACCEPT THIS IDENTITY
            </button>
          </motion.div>
        )}

        {view === 'warfare' && (
          <motion.div key="warfare" initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setView('home')} style={{ color: '#666' }}><ChevronLeft size={24} /></button>
              <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#ffcc00' }}>{currentStep.title}</span>
            </div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '40px', fontWeight: '900' }}>{currentStep.question}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {currentStep.options ? currentStep.options.map((opt, i) => (
                <button key={i} onClick={() => opt.next === 'final' ? setView('summary') : setCurrentStepId(opt.next)} className="choice-btn" style={{ background: opt.text.includes('YES') || opt.text.includes('future') ? '#fff' : '#0a0a0a', color: opt.text.includes('YES') || opt.text.includes('future') ? '#000' : '#ff4444', border: opt.text.includes('YES') || opt.text.includes('future') ? 'none' : '1px solid #222' }}>
                  {opt.text}
                </button>
              )) : (
                <>
                  <textarea placeholder={currentStep.placeholder} onChange={(e) => setAnswers({ ...answers, [currentStep.id]: e.target.value })} style={{ width: '100%', height: '180px', background: '#111', border: '1px solid #333', color: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '15px', resize: 'none' }} />
                  <button onClick={() => setCurrentStepId('w3')} disabled={!answers[currentStep.id]} style={{ width: '100%', padding: '20px', background: '#fff', color: '#000', borderRadius: '12px', fontWeight: '900' }}>CONFRONT REALITY</button>
                </>
              )}
            </div>
          </motion.div>
        )}

        {view === 'journal' && (
          <motion.div key="journal" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setView('home')} style={{ color: '#666' }}><ChevronLeft size={24} /></button>
              <h2 style={{ fontSize: '1rem', fontWeight: '900' }}>BATTLE LOG</h2>
            </div>
            <textarea id="journal-input" placeholder="What are you manifesting today? What time did you win back?" style={{ width: '100%', height: '200px', background: '#111', border: '1px solid #333', color: '#fff', padding: '20px', borderRadius: '12px', marginBottom: '15px' }} />
            <button onClick={() => saveJournal(document.getElementById('journal-input').value)} style={{ width: '100%', padding: '20px', background: '#fff', color: '#000', borderRadius: '12px', fontWeight: '900', marginBottom: '30px' }}>LOG MISSION</button>
            <div>
              {journalEntries.map((e, i) => (
                <div key={i} style={{ padding: '15px', borderBottom: '1px solid #1a1a1a' }}>
                  <div style={{ fontSize: '0.6rem', color: '#444', marginBottom: '5px' }}>{new Date(e.date).toLocaleString()}</div>
                  <div style={{ color: e.type === 'relapse' ? '#ff4444' : '#ccc', fontSize: '0.9rem' }}>{e.content}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'stats' && (
          <motion.div key="stats" initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center' }}>
            <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setView('home')} style={{ color: '#666' }}><ChevronLeft size={24} /></button>
              <h2 style={{ fontSize: '1rem', fontWeight: '900' }}>COMPETITIVE ARENA</h2>
            </div>
            <div style={{ background: '#111', padding: '40px 20px', borderRadius: '24px', border: '1px solid #222' }}>
              <Users size={48} color="#ffcc00" style={{ margin: '0 auto 20px' }} />
              <h3 style={{ fontWeight: '900', marginBottom: '10px' }}>Global Leaderboard</h3>
              <p style={{ color: '#666', fontSize: '0.8rem', marginBottom: '30px' }}>Connect with other warriors to compare streaks and win battles.</p>
              <div style={{ opacity: 0.5 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #222' }}><span>1. WarriorX</span><span>142 Days</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #222' }}><span>2. DisciplineKing</span><span>89 Days</span></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: '#1a1a1a', borderRadius: '8px', marginTop: '10px', color: '#ffcc00' }}><span>YOU</span><span>{days} Days</span></div>
              </div>
            </div>
            <p style={{ marginTop: '20px', fontSize: '0.7rem', color: '#444' }}>Social features coming soon in v2.0</p>
          </motion.div>
        )}

        {view === 'panic' && (
          <motion.div key="panic" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div style={{ color: '#ff4444', marginBottom: '30px', textAlign: 'center' }}>
              <AlertTriangle size={60} style={{ margin: '0 auto 10px' }} />
              <h2 style={{ fontWeight: '900', fontSize: '1.5rem', letterSpacing: '4px' }}>EMERGENCY OVERRIDE</h2>
            </div>
            <div style={{ padding: '24px', borderRadius: '24px', background: '#111', border: '1px solid #ff4444' }}>
              <h3 style={{ color: '#ff4444', fontWeight: '900', marginBottom: '15px' }}>{PANIC_TECHNIQUES[panicIndex].name}</h3>
              {PANIC_TECHNIQUES[panicIndex].steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px', fontSize: '0.9rem', lineHeight: '1.4' }}>
                  <div style={{ color: '#ff4444', fontWeight: 'bold' }}>{i + 1}.</div>
                  <div>{s}</div>
                </div>
              ))}
              <div style={{ marginTop: '20px', padding: '15px', background: '#000', borderRadius: '12px', fontStyle: 'italic', fontSize: '0.8rem', color: '#ffcc00', border: '1px solid #222' }}>
                "{PANIC_TECHNIQUES[panicIndex].scripture}"
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button onClick={() => setPanicIndex((panicIndex + 1) % PANIC_TECHNIQUES.length)} style={{ flex: 1, padding: '18px', border: '1px solid #333', color: '#fff', borderRadius: '12px', fontWeight: '900', fontSize: '0.8rem' }}>NEXT TECHNIQUE</button>
              <button onClick={() => setView('home')} style={{ flex: 1, padding: '18px', background: '#fff', color: '#000', borderRadius: '12px', fontWeight: '900', fontSize: '0.8rem' }}>I AM STABLE</button>
            </div>
          </motion.div>
        )}

        {view === 'summary' && (
          <motion.div key="summary" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', paddingTop: '50px' }}>
            <CheckCircle2 size={100} color="#00ff00" style={{ margin: '0 auto 20px', filter: 'drop-shadow(0 0 20px rgba(0,255,0,0.3))' }} />
            <h2 style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '10px' }}>VICTORY.</h2>
            <p style={{ color: '#888', marginBottom: '40px', fontSize: '1.1rem' }}>You rejected the shadow. You won back more than just time.</p>
            <button onClick={() => setView('home')} style={{ padding: '18px 50px', background: '#fff', color: '#000', borderRadius: '100px', fontWeight: '900', fontSize: '1rem' }}>RETURN TO COMMAND</button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ marginTop: 'auto', padding: '40px 0 10px', textAlign: 'center', opacity: 0.2 }}>
        <p style={{ fontSize: '0.5rem', letterSpacing: '4px', textTransform: 'uppercase' }}>Legacy / Built for the Unbroken</p>
      </footer>

      <style jsx>{`
        .num { font-size: 2.8rem; font-weight: 900; line-height: 1; margin-bottom: 5px; }
        .label { font-size: 0.6rem; color: #555; font-weight: 900; letter-spacing: 1px; }
        .action-card { 
            background: #111; border: 1px solid #1a1a1a; padding: 24px; border-radius: 20px;
            display: flex; flex-direction: column; align-items: center; gap: 12px;
            font-weight: 900; font-size: 0.8rem; transition: all 0.2s;
        }
        .action-card:active { transform: scale(0.95); background: #1a1a1a; }
        .choice-btn { 
            width: 100%; padding: 22px; border-radius: 12px; text-align: left; 
            font-weight: 900; font-size: 1rem; transition: all 0.2s;
        }
        .choice-btn:active { transform: scale(0.98); }
      `}</style>
    </div>
  );
};

export default App;
