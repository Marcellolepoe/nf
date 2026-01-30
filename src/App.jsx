import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Briefcase, ChevronRight, ChevronLeft, CheckCircle, Home, BarChart2, BookOpen, Quote } from 'lucide-react';
import { MORNING_PROMPTS, WORK_PROMPTS, VERSES, RATIONALE } from './constants';

const App = () => {
  const [view, setView] = useState('home'); // home, morning, work, summary, stats
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [verse, setVerse] = useState({ text: '', source: '' });

  useEffect(() => {
    // Pick a random verse on load
    const randomVerse = VERSES[Math.floor(Math.random() * VERSES.length)];
    setVerse(randomVerse);
  }, [view]);

  const activePrompts = view === 'morning' ? MORNING_PROMPTS : WORK_PROMPTS;

  const handleNext = () => {
    if (currentStep < activePrompts.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save data locally
      const entry = {
        date: new Date().toISOString(),
        type: view,
        answers: answers
      };
      const history = JSON.parse(localStorage.getItem('nf_history') || '[]');
      history.push(entry);
      localStorage.setItem('nf_history', JSON.stringify(history));
      setView('summary');
    }
  };

  const updateAnswer = (id, val) => {
    setAnswers({ ...answers, [id]: val });
  };

  const reset = () => {
    setView('home');
    setCurrentStep(0);
    setAnswers({});
  };

  return (
    <div className="app-container" style={{ maxWidth: '480px', margin: '0 auto', padding: '20px', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>

      {/* Header */}
      <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '1.2rem', fontWeight: '300', letterSpacing: '2px', textTransform: 'uppercase', color: 'var(--accent-gold)' }}>Antigravity</h1>
        <button onClick={() => setView('stats')} style={{ color: 'var(--text-secondary)' }}><BarChart2 size={20} /></button>
      </header>

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="view"
          >
            <div className="glass" style={{ padding: '24px', borderRadius: '20px', marginBottom: '24px' }}>
              <Quote size={20} style={{ color: 'var(--accent-gold)', marginBottom: '12px' }} />
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.1rem', fontStyle: 'italic', marginBottom: '12px', color: '#e2e8f0' }}>"{verse.text}"</p>
              <p style={{ color: 'var(--accent-gold)', fontSize: '0.8rem', textAlign: 'right', letterSpacing: '1px' }}>— {verse.source}</p>
            </div>

            <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', fontWeight: '500' }}>Choose Your Path</h2>

            <button
              onClick={() => setView('morning')}
              className="glass"
              style={{ width: '100%', padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '20px', textAlign: 'left' }}
            >
              <div style={{ background: 'var(--accent-gold-soft)', padding: '12px', borderRadius: '12px', color: 'var(--accent-gold)' }}><Sun size={24} /></div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>Morning Watch</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Break the scrolling habit. Get out of bed.</div>
              </div>
              <ChevronRight size={20} style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }} />
            </button>

            <button
              onClick={() => setView('work')}
              className="glass"
              style={{ width: '100%', padding: '24px', borderRadius: '16px', display: 'flex', alignItems: 'center', marginBottom: '16px', gap: '20px', textAlign: 'left' }}
            >
              <div style={{ background: 'var(--accent-blue-soft)', padding: '12px', borderRadius: '12px', color: 'var(--accent-blue)' }}><Briefcase size={24} /></div>
              <div>
                <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>Work Anchor</div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Push through the rut. Choose reality.</div>
              </div>
              <ChevronRight size={20} style={{ marginLeft: 'auto', color: 'var(--text-tertiary)' }} />
            </button>

            <div style={{ marginTop: '20px' }}>
              <p style={{ color: 'var(--text-tertiary)', fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Your Rationale</p>
              {RATIONALE.map((r, i) => (
                <div key={i} style={{ display: 'flex', gap: '10px', marginBottom: '8px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
                  <div style={{ color: 'var(--accent-gold)', marginTop: '4px' }}>•</div>
                  <div>{r}</div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {(view === 'morning' || view === 'work') && (
          <motion.div
            key="prompts"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="view"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
              <button onClick={() => setView('home')} style={{ color: 'var(--text-secondary)' }}><ChevronLeft size={24} /></button>
              <div style={{ height: '4px', flex: 1, background: 'var(--bg-tertiary)', borderRadius: '2px' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentStep + 1) / activePrompts.length) * 100}%` }}
                  style={{ height: '100%', background: view === 'morning' ? 'var(--accent-gold)' : 'var(--accent-blue)', borderRadius: '2px' }}
                />
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>{currentStep + 1}/{activePrompts.length}</span>
            </div>

            <div style={{ marginBottom: '40px' }}>
              <span style={{ color: view === 'morning' ? 'var(--accent-gold)' : 'var(--accent-blue)', fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1.5px' }}>{activePrompts[currentStep].theory}</span>
              <h2 style={{ fontSize: '1.6rem', marginTop: '12px', lineHeight: '1.4', fontWeight: '400' }}>{activePrompts[currentStep].question}</h2>
            </div>

            <textarea
              value={answers[activePrompts[currentStep].id] || ''}
              onChange={(e) => updateAnswer(activePrompts[currentStep].id, e.target.value)}
              placeholder={activePrompts[currentStep].placeholder}
              style={{
                width: '100%',
                height: '200px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '20px',
                color: 'var(--text-primary)',
                fontSize: '1rem',
                outline: 'none',
                resize: 'none',
                marginBottom: '24px'
              }}
            />

            <button
              onClick={handleNext}
              disabled={!answers[activePrompts[currentStep].id]}
              style={{
                width: '100%',
                padding: '18px',
                borderRadius: '16px',
                background: view === 'morning' ? 'var(--accent-gold)' : 'var(--accent-blue)',
                color: '#000',
                fontWeight: '600',
                fontSize: '1.05rem',
                opacity: !answers[activePrompts[currentStep].id] ? 0.5 : 1
              }}
            >
              {currentStep === activePrompts.length - 1 ? 'Finish Protocol' : 'Continue'}
            </button>
          </motion.div>
        )}

        {view === 'summary' && (
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="view"
            style={{ textAlign: 'center', padding: '40px 0' }}
          >
            <div style={{ color: 'var(--accent-gold)', marginBottom: '24px' }}><CheckCircle size={80} strokeWidth={1} style={{ margin: '0 auto' }} /></div>
            <h2 style={{ fontSize: '2rem', marginBottom: '16px' }}>Grounded.</h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '40px', lineHeight: '1.6' }}>
              You have confronted the reality of your choice. {view === 'morning' ? "Now, leave the bed. The day belongs to you." : "Return to your work with a sound mind."}
            </p>
            <button
              onClick={reset}
              style={{ padding: '14px 28px', borderRadius: '100px', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}
            >
              Return Home
            </button>
          </motion.div>
        )}

        {view === 'stats' && (
          <motion.div
            key="stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="view"
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '30px' }}>
              <button onClick={() => setView('home')} style={{ color: 'var(--text-secondary)' }}><ChevronLeft size={24} /></button>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '500' }}>Pattern Analysis</h2>
            </div>

            <div className="glass" style={{ padding: '24px', borderRadius: '20px', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '0.9rem', color: 'var(--accent-gold)', marginBottom: '12px', textTransform: 'uppercase' }}>Current Insights</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: '1.5' }}>
                You are currently in the <strong>"Observation Phase"</strong>. Every time you complete a protocol, Antigravity logs the internal trigger (e.g., "Escapism", "Lack of Motivation").
              </p>
            </div>

            <div style={{ padding: '0 10px' }}>
              <h3 style={{ fontSize: '0.75rem', color: 'var(--text-tertiary)', marginBottom: '16px', textTransform: 'uppercase', letterSpacing: '1px' }}>Your Core Theories</h3>
              {[
                { name: "Morning Habit", status: "Active" },
                { name: "Work Rut Escape", status: "Active" },
                { name: "Fantasy Avoidance", status: "Active" }
              ].map((t, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
                  <span style={{ fontSize: '0.9rem' }}>{t.name}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--accent-gold)' }}>{t.status}</span>
                </div>
              ))}
            </div>

            <p style={{ color: 'var(--text-tertiary)', fontSize: '0.7rem', marginTop: '20px', fontStyle: 'italic' }}>
              "He who is faithful in a very little is faithful also in much." — Luke 16:10
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <footer style={{ marginTop: 'auto', padding: '40px 0 20px', textAlign: 'center' }}>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)', letterSpacing: '1px', textTransform: 'uppercase' }}>Built for Self-Control & Reality</p>
      </footer>

      <style jsx>{`
        .glass:active {
          transform: scale(0.98);
        }
        button:disabled {
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
};

export default App;
