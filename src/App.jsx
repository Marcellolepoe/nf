import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldAlert,
  Flame,
  Skull,
  Sword,
  Timer,
  RefreshCw,
  ChevronRight,
  ChevronLeft,
  Heart,
  Zap,
  Play,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';
import { WARFARE_STEPS, PANIC_TECHNIQUES, VERSES, RATIONALE } from './constants';

const App = () => {
  const [view, setView] = useState('home'); // home, warfare, panic, summary, relapse
  const [streak, setStreak] = useState(0); // in seconds
  const [lastRelapse, setLastRelapse] = useState(null);
  const [currentStepId, setCurrentStepId] = useState('w1');
  const [panicIndex, setPanicIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [verse, setVerse] = useState(VERSES[0]);

  const timerRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('nf_last_relapse');
    if (saved) {
      setLastRelapse(new Date(saved));
    } else {
      const now = new Date();
      setLastRelapse(now);
      localStorage.setItem('nf_last_relapse', now.toISOString());
    }

    setVerse(VERSES[Math.floor(Math.random() * VERSES.length)]);

    timerRef.current = setInterval(() => {
      if (lastRelapse) {
        const diff = Math.floor((new Date() - new Date(lastRelapse)) / 1000);
        setStreak(diff);
      }
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [lastRelapse]);

  const formatStreak = (s) => {
    const days = Math.floor(s / (24 * 3600));
    const hours = Math.floor((s % (24 * 3600)) / 3600);
    const mins = Math.floor((s % 3600) / 60);
    const secs = s % 60;
    return { days, hours, mins, secs };
  };

  const handleRelapse = () => {
    if (window.confirm("Are you sure? This will kill your current streak and all the energy you've built.")) {
      const now = new Date();
      setLastRelapse(now);
      localStorage.setItem('nf_last_relapse', now.toISOString());
      setView('home');
    }
  };

  const { days, hours, mins, secs } = formatStreak(streak);

  const currentStep = WARFARE_STEPS.find(s => s.id === currentStepId) || WARFARE_STEPS[0];

  return (
    <div style={{ maxWidth: '480px', margin: '0 auto', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column', background: '#000', color: '#fff' }}>

      {/* Header / HUD */}
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ShieldAlert size={20} color="#ff4444" />
          <span style={{ fontWeight: '800', letterSpacing: '3px' }}>NF COMMAND</span>
        </div>
        <button onClick={() => setView('panic')} style={{ background: '#ff4444', color: '#fff', padding: '6px 12px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: '900' }}>PANIC</button>
      </header>

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {/* Streak Counter */}
            <div style={{ textAlign: 'center', marginBottom: '50px' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '10px' }}>
                <div className="streak-unit">
                  <div className="num">{days}</div>
                  <div className="label">DAYS</div>
                </div>
                <div className="streak-unit">
                  <div className="num">{hours}</div>
                  <div className="label">HRS</div>
                </div>
                <div className="streak-unit">
                  <div className="num">{mins}</div>
                  <div className="label">MINS</div>
                </div>
              </div>
              <div style={{ color: '#ffcc00', fontSize: '0.8rem', letterSpacing: '2px', fontWeight: 'bold' }}>
                CURRENT POWER LEVEL
              </div>
            </div>

            {/* Rationale HUD */}
            <div style={{ background: '#111', border: '1px solid #333', borderRadius: '12px', padding: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', color: '#666' }}>
                <Timer size={16} />
                <span style={{ fontSize: '0.7rem', fontWeight: 'bold', textTransform: 'uppercase' }}>Mission Objectives</span>
              </div>
              {RATIONALE.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px', fontSize: '0.9rem' }}>
                  <div style={{ color: '#ffcc00' }}>⚔️</div>
                  <div style={{ color: '#ccc' }}>{r}</div>
                </div>
              ))}
            </div>

            {/* Main Action */}
            <button
              onClick={() => { setView('warfare'); setCurrentStepId('w1'); }}
              style={{
                width: '100%',
                padding: '24px',
                background: '#fff',
                color: '#000',
                borderRadius: '12px',
                fontWeight: '900',
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '15px',
                marginBottom: '20px'
              }}
            >
              <Sword size={24} /> ENGAGE PROTOCOL
            </button>

            <button
              onClick={handleRelapse}
              style={{ width: '100%', padding: '15px', border: '1px solid #333', color: '#666', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}
            >
              I FAILED (KILL STREAK)
            </button>
          </motion.div>
        )}

        {view === 'warfare' && (
          <motion.div key="warfare" initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }}>
            <div style={{ marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => setView('home')} style={{ color: '#666' }}><ChevronLeft size={24} /></button>
              <span style={{ fontWeight: 'bold', fontSize: '0.8rem', color: '#ffcc00' }}>{currentStep.title}</span>
            </div>

            <h2 style={{ fontSize: '1.8rem', marginBottom: '40px', lineHeight: '1.2', fontWeight: '800' }}>{currentStep.question}</h2>

            {currentStep.type === 'confrontation' || currentStep.type === 'action' || currentStep.type === 'impact' ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {currentStep.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (opt.next === 'final') setView('summary');
                      else setCurrentStepId(opt.next);
                    }}
                    style={{
                      width: '100%',
                      padding: '20px',
                      background: opt.text.includes('YES') || opt.text.includes('future') ? '#fff' : '#111',
                      color: opt.text.includes('YES') || opt.text.includes('future') ? '#000' : '#ff4444',
                      borderRadius: '8px',
                      textAlign: 'left',
                      fontWeight: 'bold',
                      border: opt.text.includes('YES') || opt.text.includes('future') ? 'none' : '1px solid #ff4444'
                    }}
                  >
                    {opt.text}
                  </button>
                ))}
              </div>
            ) : (
              <div>
                <textarea
                  placeholder={currentStep.placeholder}
                  onChange={(e) => setAnswers({ ...answers, [currentStep.id]: e.target.value })}
                  style={{ width: '100%', height: '150px', background: '#111', border: '1px solid #333', color: '#fff', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}
                />
                <button
                  disabled={!answers[currentStep.id]}
                  onClick={() => setCurrentStepId('w3')} // Simple flow for now
                  style={{ width: '100%', padding: '20px', background: '#fff', color: '#000', borderRadius: '8px', fontWeight: 'bold', opacity: answers[currentStep.id] ? 1 : 0.5 }}
                >
                  CONFRONT REALITY
                </button>
              </div>
            )}
          </motion.div>
        )}

        {view === 'panic' && (
          <motion.div key="panic" initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
            <div style={{ color: '#ff4444', marginBottom: '30px', textAlign: 'center' }}>
              <AlertTriangle size={60} style={{ margin: '0 auto 10px' }} />
              <h2 style={{ fontWeight: '900', fontSize: '2rem' }}>EMERGENCY OVERRIDE</h2>
            </div>

            <div className="glass" style={{ padding: '24px', borderRadius: '16px', background: '#111', border: '1px solid #ff4444' }}>
              <h3 style={{ color: '#ff4444', fontWeight: '800', marginBottom: '15px' }}>{PANIC_TECHNIQUES[panicIndex].name}</h3>
              {PANIC_TECHNIQUES[panicIndex].steps.map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '12px', fontSize: '0.9rem', color: '#eee' }}>
                  <div style={{ color: '#ff4444' }}>{i + 1}.</div>
                  <div>{s}</div>
                </div>
              ))}
              <div style={{ marginTop: '20px', padding: '15px', background: '#000', borderRadius: '8px', fontStyle: 'italic', fontSize: '0.8rem', color: '#ffcc00' }}>
                "{PANIC_TECHNIQUES[panicIndex].scripture}"
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
              <button
                onClick={() => setPanicIndex((panicIndex + 1) % PANIC_TECHNIQUES.length)}
                style={{ flex: 1, padding: '15px', border: '1px solid #444', color: '#fff', borderRadius: '8px', fontWeight: 'bold' }}
              >
                NEXT TECHNIQUE
              </button>
              <button
                onClick={() => setView('home')}
                style={{ flex: 1, padding: '15px', background: '#fff', color: '#000', borderRadius: '8px', fontWeight: 'bold' }}
              >
                I AM STABLE
              </button>
            </div>
          </motion.div>
        )}

        {view === 'summary' && (
          <motion.div key="summary" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ textAlign: 'center', paddingTop: '50px' }}>
            <CheckCircle2 size={80} color="#00ff00" style={{ margin: '0 auto 20px' }} />
            <h2 style={{ fontSize: '2.5rem', fontWeight: '900', marginBottom: '10px' }}>VICTORY.</h2>
            <p style={{ color: '#666', marginBottom: '40px' }}>You chose the Master. You chose Reality. You chose Her.</p>
            <button
              onClick={() => setView('home')}
              style={{ padding: '15px 40px', background: '#fff', color: '#000', borderRadius: '100px', fontWeight: 'bold' }}
            >
              RETURN TO COMMAND
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ marginTop: 'auto', padding: '40px 0 10px', textAlign: 'center', opacity: 0.3 }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '2px' }}>FOR THE MAN YOU ARE BECOMING</p>
      </footer>

      <style jsx>{`
        .streak-unit {
          text-align: center;
          min-width: 60px;
        }
        .num {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1;
        }
        .label {
          font-size: 0.6rem;
          color: #666;
          font-weight: bold;
          letter-spacing: 1px;
        }
        button:active {
          transform: scale(0.97);
        }
      `}</style>
    </div>
  );
};

export default App;
