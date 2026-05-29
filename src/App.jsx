import { useState, useEffect, useCallback } from 'react';
import {
  CheckCircle2,
  Circle,
  Code,
  Headphones,
  Trash2,
  RotateCcw,
  Briefcase,
  FileText,
  ChevronDown,
  ChevronUp,
  Languages,
  Flame,
  Copy,
  Check,
  X,
  Compass,
  Terminal
} from 'lucide-react';
import confetti from 'canvas-confetti';

import { T } from './data/translations';
import { HABITS, PJ_MANUAL, PHASES } from './data/phases';
import { QUIZ_BANK } from './data/quizBank';

const getLocalDateMidnight = (timestamp) => {
  const date = new Date(timestamp);
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
};

const hasMissedWeekday = (start, end) => {
  if (!start) return false;
  const dStart = getLocalDateMidnight(start);
  const dEnd = getLocalDateMidnight(end);
  if (dEnd.getTime() <= dStart.getTime()) return false;

  let current = new Date(dStart);
  current.setDate(current.getDate() + 1);
  while (current.getTime() < dEnd.getTime()) {
    const dayOfWeek = current.getDay(); // 0 = Sunday, 6 = Saturday
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      return true;
    }
    current.setDate(current.getDate() + 1);
  }
  return false;
};

function App() {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('mainframeRoadmapLang') || 'pt';
  });

  const t = T[lang];
  const [activePhase, setActivePhase] = useState(() => {
    return localStorage.getItem('mainframeRoadmapActivePhase') || 'phase1';
  });

  // Expanded days state: stores expanded dayId (string) or null
  const [expandedDay, setExpandedDay] = useState(null);

  const [isPjManualOpen, setIsPjManualOpen] = useState(true);

  // Gamification states
  const [xp, setXp] = useState(() => {
    return parseInt(localStorage.getItem('mainframeRoadmapXP') || '0', 10);
  });
  const [level, setLevel] = useState(() => {
    return parseInt(localStorage.getItem('mainframeRoadmapLevel') || '1', 10);
  });
  const [streak, setStreak] = useState(() => {
    const saved = localStorage.getItem('mainframeRoadmapStreak') || '0';
    const lastCheck = localStorage.getItem('mainframeRoadmapLastCheck');
    if (lastCheck) {
      const lastCheckTime = parseInt(lastCheck, 10);
      const now = Date.now();
      if (hasMissedWeekday(lastCheckTime, now)) {
        return 0;
      }
    }
    return parseInt(saved, 10);
  });
  const [lastCheckTimestamp, setLastCheckTimestamp] = useState(() => {
    const saved = localStorage.getItem('mainframeRoadmapLastCheck');
    return saved ? parseInt(saved, 10) : null;
  });

  // Quiz Lockouts state
  const [quizLockouts, setQuizLockouts] = useState(() => {
    const saved = localStorage.getItem('mainframeRoadmapQuizLockouts');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        console.error('Error parsing quiz lockouts');
        return {};
      }
    }
    return {};
  });

  // Active quiz state
  const [activeQuiz, setActiveQuiz] = useState(null);

  // LinkedIn modal state
  const [linkedinModal, setLinkedinModal] = useState({ isOpen: false, content: '' });
  const [copiedFeedback, setCopiedFeedback] = useState(false);

  const [progress, setProgress] = useState(() => {
    const saved = localStorage.getItem('mainframeRoadmapDualEngine');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        console.error('Error parsing local storage data');
        return {};
      }
    }
    return {};
  });

  // Local storage synchronization
  useEffect(() => {
    localStorage.setItem('mainframeRoadmapLang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapActivePhase', activePhase);
  }, [activePhase]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapDualEngine', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapXP', xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapLevel', level.toString());
  }, [level]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapStreak', streak.toString());
  }, [streak]);

  useEffect(() => {
    if (lastCheckTimestamp !== null) {
      localStorage.setItem('mainframeRoadmapLastCheck', lastCheckTimestamp.toString());
    } else {
      localStorage.removeItem('mainframeRoadmapLastCheck');
    }
  }, [lastCheckTimestamp]);

  useEffect(() => {
    localStorage.setItem('mainframeRoadmapQuizLockouts', JSON.stringify(quizLockouts));
  }, [quizLockouts]);

  const toggleLanguage = () => {
    setLang(prev => prev === 'pt' ? 'en' : 'pt');
  };

  const handleDailyCheckin = useCallback(() => {
    const now = Date.now();
    const todayStr = new Date(now).toDateString();

    // Check if already checked in today
    if (lastCheckTimestamp) {
      const lastCheckDate = new Date(lastCheckTimestamp).toDateString();
      if (lastCheckDate === todayStr) {
        return; // Already checked in today
      }
    }

    setLastCheckTimestamp(now);
    setStreak(prevStreak => {
      if (!lastCheckTimestamp || prevStreak === 0) {
        return 1;
      }
      if (hasMissedWeekday(lastCheckTimestamp, now)) {
        return 1; // Reset streak due to inactivity (missed a weekday)
      }
      return prevStreak + 1;
    });

    // Confetti celebration
    confetti({
      particleCount: 80,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#f59e0b', '#d97706', '#fbbf24']
    });
  }, [lastCheckTimestamp]);

  const getLevelTitle = (lvl) => {
    if (lvl >= 1 && lvl <= 5) return t.lvl_title_1;
    if (lvl >= 6 && lvl <= 15) return t.lvl_title_2;
    if (lvl >= 16 && lvl <= 30) return t.lvl_title_3;
    if (lvl >= 31 && lvl <= 45) return t.lvl_title_4;
    return t.lvl_title_5;
  };

  const handleToggleTask = useCallback((taskId, isHabit = false) => {
    const wasCompleted = !!progress[taskId];

    if (wasCompleted) {
      // 1. Uncheck immediately (deduct XP)
      setProgress(prev => {
        const next = { ...prev };
        delete next[taskId];
        return next;
      });

      const xpGain = isHabit ? 15 : 10;
      setXp(prevXp => {
        let nextXp = prevXp - xpGain;
        let nextLvl = level;
        while (nextXp < 0 && nextLvl > 1) {
          nextLvl -= 1;
          nextXp += nextLvl * 100;
        }
        if (nextLvl === 1 && nextXp < 0) nextXp = 0;
        setLevel(nextLvl);
        return nextXp;
      });
      return;
    }

    if (isHabit) {
      // 2. Check habit immediately (no quiz)
      setProgress(prev => ({ ...prev, [taskId]: true }));

      setXp(prevXp => {
        let nextXp = prevXp + 15;
        let nextLvl = level;
        let leveledUp = false;
        while (nextXp >= nextLvl * 100) {
          nextXp -= nextLvl * 100;
          nextLvl += 1;
          leveledUp = true;
        }
        if (nextLvl !== level) {
          setLevel(nextLvl);
          if (leveledUp) {
            confetti({
              particleCount: 150,
              spread: 85,
              origin: { y: 0.6 },
              colors: ['#8b5cf6', '#3b82f6', '#10b981', '#f472b6']
            });
          }
        }
        return nextXp;
      });

      return;
    }

    // 3. Technical Task: Intercept with Quiz
    const todayStr = new Date().toLocaleDateString();
    if (quizLockouts[taskId] === todayStr) {
      alert(lang === 'pt'
        ? 'Você errou a prova desta tarefa hoje. Só poderá refazer amanhã!'
        : 'You failed the test for this task today. You can only retake it tomorrow!');
      return;
    }

    // Launch Quiz Modal
    const questions = QUIZ_BANK[taskId];
    if (!questions) return;
    setActiveQuiz({
      taskId,
      currentQuestionIndex: 0,
      answers: [],
      questions
    });
  }, [progress, quizLockouts, lang, level]);

  const handleAnswerQuestion = (selectedOptionIndex) => {
    setActiveQuiz(prev => {
      if (!prev) return null;
      const nextAnswers = [...prev.answers, selectedOptionIndex];
      const nextIndex = prev.currentQuestionIndex + 1;
      return {
        ...prev,
        currentQuestionIndex: nextIndex,
        answers: nextAnswers
      };
    });
  };

  const handleCloseQuiz = (isPassed) => {
    if (!activeQuiz) return;

    const taskId = activeQuiz.taskId;

    if (isPassed) {
      // 1. Mark task as completed
      setProgress(prev => ({
        ...prev,
        [taskId]: true
      }));

      // 2. Add +10 XP
      setXp(prevXp => {
        let nextXp = prevXp + 10;
        let nextLvl = level;
        let leveledUp = false;

        while (nextXp >= nextLvl * 100) {
          nextXp -= nextLvl * 100;
          nextLvl += 1;
          leveledUp = true;
        }

        if (nextLvl !== level) {
          setLevel(nextLvl);
          if (leveledUp) {
            confetti({
              particleCount: 150,
              spread: 85,
              origin: { y: 0.6 },
              colors: ['#8b5cf6', '#3b82f6', '#10b981', '#f472b6']
            });
          }
        }

        return nextXp;
      });

      // 4. Trigger confetti for day completion if needed
      const activePhaseData = PHASES.find(p => p.id === activePhase);
      const day = activePhaseData.schedule.find(d => d.tasks.includes(taskId));
      if (day) {
        const dayCompletedTasks = day.tasks.filter(id => id === taskId ? true : !!progress[id]).length;
        if (dayCompletedTasks === day.tasks.length) {
          confetti({
            particleCount: 100,
            spread: 60,
            origin: { y: 0.8 },
            colors: ['#10b981', '#3b82f6', '#f59e0b']
          });
        }
      }

      // 5. Remove lockout if present
      setQuizLockouts(prev => {
        const next = { ...prev };
        delete next[taskId];
        return next;
      });

    } else {
      // 1. Record lockout for today
      const todayStr = new Date().toLocaleDateString();
      setQuizLockouts(prev => ({
        ...prev,
        [taskId]: todayStr
      }));
    }

    // Close Modal
    setActiveQuiz(null);
  };

  const handlePhaseChange = (phaseId) => {
    setActivePhase(phaseId);
    setExpandedDay(null);
  };

  const toggleDayAccordion = (dayId) => {
    setExpandedDay(prev => prev === dayId ? null : dayId);
  };

  const resetCurrentPhase = () => {
    if (window.confirm(t.resetBlockConfirm)) {
      const phaseData = PHASES.find(p => p.id === activePhase);
      const phaseTaskIds = phaseData.schedule.flatMap(day => day.tasks);

      // Calculate XP reduction to adjust for cleared tasks
      const completedInPhase = phaseTaskIds.filter(id => progress[id]).length;
      const xpReduction = completedInPhase * 10;

      setProgress(prev => {
        const next = { ...prev };
        phaseTaskIds.forEach(id => delete next[id]);
        return next;
      });

      setXp(prevXp => {
        let nextXp = prevXp - xpReduction;
        let nextLvl = level;
        while (nextXp < 0 && nextLvl > 1) {
          nextLvl -= 1;
          nextXp += nextLvl * 100;
        }
        if (nextLvl === 1 && nextXp < 0) nextXp = 0;
        setLevel(nextLvl);
        return nextXp;
      });
    }
  };

  const clearAllData = () => {
    if (window.confirm(t.clearAll)) {
      setProgress({});
      setXp(0);
      setLevel(1);
      setStreak(0);
      setLastCheckTimestamp(null);
      setQuizLockouts({});
      localStorage.removeItem('mainframeRoadmapDualEngine');
      localStorage.removeItem('mainframeRoadmapXP');
      localStorage.removeItem('mainframeRoadmapLevel');
      localStorage.removeItem('mainframeRoadmapStreak');
      localStorage.removeItem('mainframeRoadmapLastCheck');
      localStorage.removeItem('mainframeRoadmapQuizLockouts');
    }
  };

  const handleTriggerLinkedInModal = (day) => {
    const dayTitle = t[day.topicKey];
    const checkedInDay = day.tasks.filter(taskId => progress[taskId]);
    const checkedTaskTexts = checkedInDay.map(taskId => t[taskId]);

    const draftText = lang === 'pt'
      ? `Hoje avancei na minha jornada de transição e modernização de sistemas legados! 💻🚀\n\nFoquei no desenvolvimento de "${dayTitle}" e me aprofundei nos seguintes temas:\n${checkedTaskTexts.length > 0
        ? "\n- " + checkedTaskTexts.map(text => text.replace(/\[\s*\]\s*/, "")).join("\n- ")
        : "\n- " + day.tasks.map(taskId => t[taskId].replace(/\[\s*\]\s*/, "")).slice(0, 2).join("\n- ") + "\n- E muito mais!"
      }\n\nMais um passo importante rumo a arquiteturas híbridas modernas, escalabilidade e mercado internacional! 🌍\n\n#Mainframe #Java #SoftwareEngineering #CloudModernization #LegacyMigration`
      : `Today I advanced on my legacy systems modernization and cloud transition journey! 💻🚀\n\nI focused on "${dayTitle}" and deep-dived into these topics:\n${checkedTaskTexts.length > 0
        ? "\n- " + checkedTaskTexts.map(text => text.replace(/\[\s*\]\s*/, "")).join("\n- ")
        : "\n- " + day.tasks.map(taskId => t[taskId].replace(/\[\s*\]\s*/, "")).slice(0, 2).join("\n- ") + "\n- And more!"
      }\n\nAnother solid step towards high-performance, scalable hybrid architectures and the international market! 🌍\n\n#Mainframe #Java #SoftwareEngineering #CloudModernization #LegacyMigration`;

    setLinkedinModal({ isOpen: true, content: draftText });
    setCopiedFeedback(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(linkedinModal.content);
    setCopiedFeedback(true);
    setTimeout(() => setCopiedFeedback(false), 2000);
  };

  // Calculations
  const isCheckedInToday = (() => {
    if (!lastCheckTimestamp) return false;
    const lastCheckDate = new Date(lastCheckTimestamp).toDateString();
    const todayDate = new Date().toDateString();
    return lastCheckDate === todayDate;
  })();

  const allTasksGlobal = PHASES.flatMap(p => p.schedule.flatMap(d => d.tasks));
  const totalGlobal = allTasksGlobal.length + HABITS.length;
  const completedGlobal = allTasksGlobal.filter(id => progress[id]).length + HABITS.filter(id => progress[id]).length;
  const globalPercentage = totalGlobal === 0 ? 0 : Math.round((completedGlobal / totalGlobal) * 100);

  const activePhaseData = PHASES.find(p => p.id === activePhase);
  const activePhaseTasks = activePhaseData.schedule.flatMap(d => d.tasks);
  const completedActivePhase = activePhaseTasks.filter(id => progress[id]).length;
  const activePhasePercentage = activePhaseTasks.length === 0 ? 0 : Math.round((completedActivePhase / activePhaseTasks.length) * 100);

  const xpNeeded = level * 100;
  const xpPercentage = Math.min(100, Math.round((xp / xpNeeded) * 100));

  // Determine current fixed bottom block
  const getActiveBlockGoal = () => {
    if (activePhase === 'phase1' || activePhase === 'phase2') {
      return { title: t.macroGoal_block1_title, desc: t.macroGoal_block1_desc };
    }
    if (activePhase === 'phase3') {
      return { title: t.macroGoal_block2_title, desc: t.macroGoal_block2_desc };
    }
    if (activePhase === 'phase4') {
      return { title: t.macroGoal_block3_title, desc: t.macroGoal_block3_desc };
    }
    return { title: t.macroGoal_block4_title, desc: t.macroGoal_block4_desc };
  };

  const activeBlockGoal = getActiveBlockGoal();

  const DESIGN_SYSTEM = {
    phase1: {
      font: 'font-mono uppercase',
      fontTitle: 'font-mono uppercase tracking-wider',
      rounded: 'rounded-none',
      border: 'border-green-500/80',
      borderSoft: 'border-green-500/30',
      bgCard: 'bg-black border border-green-500/80',
      bgCardActive: 'bg-black border border-green-500 shadow-[0_0_10px_rgba(74,222,128,0.4)]',
      bgInput: 'bg-black border border-green-500/60 text-green-400',
      btn: 'bg-black text-green-400 border border-green-500/60 hover:bg-green-950/50 rounded-none font-mono uppercase',
      btnPrimary: 'bg-green-500 text-black border border-green-500 hover:bg-green-400 rounded-none font-mono uppercase font-bold shadow-[0_0_8px_rgba(74,222,128,0.5)]',
      textPrimary: 'text-green-400',
      textSecondary: 'text-amber-400',
      textDim: 'text-green-500/70',
      accentGlow: 'shadow-[inset_0_0_8px_rgba(74,222,128,0.2)]',
      isRetro: true,
      cardHeader: 'bg-green-950/20 border-b border-green-500/40 p-4 font-mono',
      progressBg: 'bg-black border border-green-500/50 p-0.5',
      progressBar: 'bg-green-500 shadow-[0_0_8px_rgba(74,222,128,0.6)]'
    },
    phase2: {
      font: 'font-mono uppercase',
      fontTitle: 'font-mono uppercase tracking-wider',
      rounded: 'rounded-none',
      border: 'border-amber-500/80',
      borderSoft: 'border-amber-500/30',
      bgCard: 'bg-black border border-amber-500/80',
      bgCardActive: 'bg-black border border-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]',
      bgInput: 'bg-black border border-amber-500/60 text-amber-400',
      btn: 'bg-black text-amber-400 border border-amber-500/60 hover:bg-amber-950/50 rounded-none font-mono uppercase',
      btnPrimary: 'bg-amber-500 text-black border border-amber-500 hover:bg-amber-400 rounded-none font-mono uppercase font-bold shadow-[0_0_8px_rgba(245,158,11,0.5)]',
      textPrimary: 'text-amber-400',
      textSecondary: 'text-green-300',
      textDim: 'text-amber-500/70',
      accentGlow: 'shadow-[inset_0_0_8px_rgba(245,158,11,0.2)]',
      isRetro: true,
      cardHeader: 'bg-amber-950/20 border-b border-amber-500/40 p-4 font-mono',
      progressBg: 'bg-black border border-amber-500/50 p-0.5',
      progressBar: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.6)]'
    },
    phase3: {
      font: 'font-sans',
      fontTitle: 'font-sans font-extrabold uppercase tracking-wide',
      rounded: 'rounded-lg',
      border: 'border-violet-500/50',
      borderSoft: 'border-violet-500/20',
      bgCard: 'bg-zinc-900/60 border border-violet-500/30 backdrop-blur-sm',
      bgCardActive: 'bg-zinc-900/80 border border-violet-500/60 shadow-[0_0_12px_rgba(139,92,246,0.15)]',
      bgInput: 'bg-zinc-950 border border-violet-500/40 text-violet-300',
      btn: 'bg-zinc-950 text-violet-400 border border-violet-500/40 hover:bg-violet-950/30 rounded-lg',
      btnPrimary: 'bg-violet-600 text-white border border-violet-500 hover:bg-violet-500 rounded-lg shadow-md shadow-violet-500/10 font-bold',
      textPrimary: 'text-violet-400',
      textSecondary: 'text-cyan-300',
      textDim: 'text-violet-400/60',
      accentGlow: '',
      isRetro: false,
      cardHeader: 'bg-zinc-900/40 border-b border-zinc-800/80 p-4 font-sans',
      progressBg: 'bg-zinc-950 border border-zinc-800 p-0.5 rounded-full',
      progressBar: 'bg-violet-500 rounded-full shadow-[0_0_8px_rgba(139,92,246,0.4)]'
    },
    phase4: {
      font: 'font-sans',
      fontTitle: 'font-sans font-extrabold tracking-tight',
      rounded: 'rounded-xl',
      border: 'border-sky-500/50',
      borderSoft: 'border-sky-500/20',
      bgCard: 'bg-zinc-900/50 border border-sky-500/20 backdrop-blur-md shadow-xl',
      bgCardActive: 'bg-zinc-900/70 border border-sky-500/50 shadow-[0_0_15px_rgba(56,189,248,0.25)]',
      bgInput: 'bg-zinc-950 border border-sky-500/30 text-sky-300',
      btn: 'bg-zinc-950 text-sky-400 border border-sky-500/30 hover:bg-sky-950/20 rounded-xl',
      btnPrimary: 'bg-sky-500 hover:bg-sky-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-sky-500/20',
      textPrimary: 'text-sky-400',
      textSecondary: 'text-orange-400',
      textDim: 'text-slate-400',
      accentGlow: '',
      isRetro: false,
      cardHeader: 'bg-zinc-900/60 border-b border-zinc-800/60 p-5 font-sans',
      progressBg: 'bg-zinc-950 border border-zinc-800/50 p-0.5 rounded-full',
      progressBar: 'bg-sky-500 rounded-full shadow-[0_0_10px_rgba(56,189,248,0.5)]'
    },
    phase5: {
      font: 'font-sans',
      fontTitle: 'font-sans font-black tracking-tight',
      rounded: 'rounded-2xl',
      border: 'border-blue-500/40',
      borderSoft: 'border-blue-500/20',
      bgCard: 'bg-zinc-900/40 border border-blue-500/20 backdrop-blur-lg shadow-2xl',
      bgCardActive: 'bg-zinc-900/60 border border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.3)]',
      bgInput: 'bg-zinc-950 border border-blue-500/30 text-blue-300',
      btn: 'bg-zinc-950 text-blue-400 border border-blue-500/30 hover:bg-blue-950/20 rounded-2xl',
      btnPrimary: 'bg-blue-600 hover:bg-blue-500 text-white font-extrabold rounded-2xl shadow-xl shadow-blue-500/25',
      textPrimary: 'text-blue-400',
      textSecondary: 'text-white',
      textDim: 'text-slate-400',
      accentGlow: '',
      isRetro: false,
      cardHeader: 'bg-zinc-900/60 border-b border-zinc-800/50 p-6 font-sans',
      progressBg: 'bg-zinc-950 border border-zinc-800 p-0.5 rounded-full',
      progressBar: 'bg-blue-500 rounded-full shadow-[0_0_12px_rgba(59,130,246,0.6)]'
    }
  };
  const theme = DESIGN_SYSTEM[activePhase] || DESIGN_SYSTEM.phase1;

  const TOP_BANNER_STYLE = {
    phase1: {
      text: 'text-green-400',
      border: 'border-green-500/20',
      icon: 'text-amber-400'
    },
    phase2: {
      text: 'text-amber-400',
      border: 'border-amber-500/20',
      icon: 'text-green-300'
    },
    phase3: {
      text: 'text-violet-400',
      border: 'border-violet-500/20',
      icon: 'text-cyan-300'
    },
    phase4: {
      text: 'text-sky-400',
      border: 'border-sky-500/20',
      icon: 'text-orange-400'
    },
    phase5: {
      text: 'text-blue-400',
      border: 'border-blue-500/20',
      icon: 'text-white'
    }
  };
  const tbStyle = TOP_BANNER_STYLE[activePhase] || TOP_BANNER_STYLE.phase1;

  const BG_STYLE = {
    phase1: {
      bg: 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-green-950/20 via-zinc-950 to-zinc-950',
      selection: 'selection:bg-green-500/30'
    },
    phase2: {
      bg: 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-zinc-950 to-zinc-950',
      selection: 'selection:bg-amber-500/30'
    },
    phase3: {
      bg: 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-violet-950/20 via-zinc-950 to-zinc-950',
      selection: 'selection:bg-violet-500/30'
    },
    phase4: {
      bg: 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-sky-950/20 via-zinc-950 to-zinc-950',
      selection: 'selection:bg-sky-500/30'
    },
    phase5: {
      bg: 'bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-blue-950/20 via-zinc-950 to-zinc-950',
      selection: 'selection:bg-blue-500/30'
    }
  };
  const bgStyle = BG_STYLE[activePhase] || BG_STYLE.phase1;

  const WIDGET_STYLE = {
    phase1: {
      border: 'border-green-500/30',
      glow: 'shadow-[0_0_15px_rgba(74,222,128,0.05)]',
      badgeBg: 'bg-zinc-950 border border-green-500 text-green-400 shadow-[0_0_10px_rgba(74,222,128,0.15)]',
      levelTitle: 'text-green-400',
      subTitle: 'text-amber-400',
      progressBar: 'bg-green-500 shadow-[0_0_12px_rgba(74,222,128,0.6)]',
      radialGlow: 'bg-green-600/10',
      label: 'text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.3)]',
      xpText: 'text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.3)]'
    },
    phase2: {
      border: 'border-amber-500/30',
      glow: 'shadow-[0_0_15px_rgba(251,191,36,0.05)]',
      badgeBg: 'bg-zinc-950 border border-amber-500 text-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.15)]',
      levelTitle: 'text-amber-400',
      subTitle: 'text-green-300',
      progressBar: 'bg-amber-500 shadow-[0_0_12px_rgba(251,191,36,0.6)]',
      radialGlow: 'bg-amber-600/10',
      label: 'text-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.3)]',
      xpText: 'text-green-300 drop-shadow-[0_0_6px_rgba(110,231,183,0.3)]'
    },
    phase3: {
      border: 'border-violet-500/30',
      glow: 'shadow-[0_0_15px_rgba(167,139,250,0.05)]',
      badgeBg: 'bg-zinc-950 border border-violet-500 text-violet-400 shadow-[0_0_10px_rgba(167,139,250,0.15)]',
      levelTitle: 'text-violet-400',
      subTitle: 'text-cyan-300',
      progressBar: 'bg-violet-500 shadow-[0_0_12px_rgba(167,139,250,0.6)]',
      radialGlow: 'bg-violet-600/10',
      label: 'text-violet-400 drop-shadow-[0_0_6px_rgba(167,139,250,0.3)]',
      xpText: 'text-cyan-300 drop-shadow-[0_0_6px_rgba(103,232,249,0.3)]'
    },
    phase4: {
      border: 'border-sky-500/30',
      glow: 'shadow-[0_0_15px_rgba(56,189,248,0.05)]',
      badgeBg: 'bg-zinc-950 border border-sky-500 text-sky-400 shadow-[0_0_10px_rgba(56,189,248,0.15)]',
      levelTitle: 'text-sky-400',
      subTitle: 'text-orange-400',
      progressBar: 'bg-sky-500 shadow-[0_0_12px_rgba(56,189,248,0.6)]',
      radialGlow: 'bg-sky-600/10',
      label: 'text-sky-400 drop-shadow-[0_0_6px_rgba(56,189,248,0.3)]',
      xpText: 'text-orange-400 drop-shadow-[0_0_6px_rgba(251,146,60,0.3)]'
    },
    phase5: {
      border: 'border-blue-500/30',
      glow: 'shadow-[0_0_20px_rgba(96,165,250,0.15)]',
      badgeBg: 'bg-zinc-950 border border-blue-500 text-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.15)]',
      levelTitle: 'text-blue-400',
      subTitle: 'text-white',
      progressBar: 'bg-blue-500 shadow-[0_0_12px_rgba(96,165,250,0.6)]',
      radialGlow: 'bg-blue-600/10',
      label: 'text-blue-400 drop-shadow-[0_0_6px_rgba(96,165,250,0.3)]',
      xpText: 'text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.3)]'
    }
  };
  const wStyle = WIDGET_STYLE[activePhase] || WIDGET_STYLE.phase1;

  return (
    <div className={`min-h-screen text-slate-200 transition-all duration-500 ${theme.font} ${bgStyle.bg} ${bgStyle.selection}`}>

      {/* Top Banner Fixo (Dinâmico) */}
      <div className={`bg-zinc-950 py-2 px-4 text-center text-xs sm:text-sm font-semibold tracking-wide border-b backdrop-blur-md sticky top-0 z-50 transition-all duration-500 ${tbStyle.text} ${tbStyle.border}`}>
        <Terminal className={`inline-block w-4 h-4 mr-2 animate-pulse ${tbStyle.icon}`} />
        {t[`banner_${activePhase}`]}
        <Terminal className={`inline-block w-4 h-4 ml-2 animate-pulse ${tbStyle.icon}`} />
      </div>

      {/* Header Premium */}
      <header className={`bg-zinc-950/80 backdrop-blur-xl border-b transition-all duration-500 ${theme.borderSoft} shadow-2xl relative`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6">
            <div className="flex items-center gap-4 w-full xl:w-auto xl:flex-1 justify-center">
              <Compass className={`w-10 h-10 shrink-0 transition-all duration-500 ${theme.textSecondary}`} />
              <div className="flex flex-col items-center text-center justify-center">
                <h1 className={`text-base sm:text-lg text-center max-w-3xl w-full transition-all duration-500 ${theme.fontTitle} ${theme.textPrimary}`}>
                  {t.title}
                </h1>
                <p className={`text-[10px] sm:text-xs mt-1.5 uppercase font-bold tracking-wider text-center w-full transition-all duration-500 ${theme.textSecondary}`}>{t.subtitle}</p>
              </div>
            </div>

            {/* Header Control Panel */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-6">
              <div className="flex flex-col items-end w-full sm:w-auto">
                <span className="text-[11px] sm:text-xs font-extrabold mb-1 flex justify-between w-full uppercase tracking-wider">
                  <span className={`transition-all duration-500 ${theme.textSecondary}`}>{t.progressMacro}</span>
                  <span className={`font-mono font-extrabold transition-all duration-500 ${theme.textPrimary}`}>{globalPercentage}%</span>
                </span>
                <div className={`w-full sm:w-48 h-3 transition-all duration-500 ${theme.progressBg}`}>
                  <div
                    className={`h-full transition-all duration-700 ease-out ${theme.progressBar}`}
                    style={{ width: `${globalPercentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="flex flex-col items-end w-full sm:w-auto">
                <span className="text-[11px] sm:text-xs font-extrabold mb-1 flex justify-between w-full uppercase tracking-wider">
                  <span className={`transition-all duration-500 ${theme.textPrimary}`}>{t.progressBlock}</span>
                  <span className={`font-mono font-extrabold transition-all duration-500 ${theme.textSecondary}`}>{activePhasePercentage}%</span>
                </span>
                <div className={`w-full sm:w-48 h-3 transition-all duration-500 ${theme.progressBg}`}>
                  <div
                    className={`h-full transition-all duration-700 ease-out ${theme.progressBar}`}
                    style={{ width: `${activePhasePercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 border-t sm:border-t-0 sm:border-l border-zinc-800 pt-4 sm:pt-0 sm:pl-6 shrink-0 justify-end">
                <button
                  onClick={handleDailyCheckin}
                  disabled={isCheckedInToday}
                  className={`px-3 py-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider transition-all border active:scale-95 ${theme.rounded} ${isCheckedInToday
                    ? 'bg-zinc-900/40 text-zinc-500 border-zinc-800/40 cursor-not-allowed'
                    : theme.btnPrimary + ' animate-pulse'
                    }`}
                  title={isCheckedInToday ? t.checkinClaimed : t.checkinActive}
                >
                  <Flame className={`w-4 h-4 ${isCheckedInToday ? 'text-zinc-500 fill-zinc-500' : 'text-current animate-bounce'}`} />
                  <span>{isCheckedInToday ? t.checkinClaimed : t.checkinActive}</span>
                </button>
                <button
                  onClick={toggleLanguage}
                  className={`px-3 py-2 flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider transition-all border active:scale-95 ${theme.rounded} ${theme.btn}`}
                  title="Alterar Idioma / Change Language"
                >
                  <Languages className="w-4 h-4 text-current" />
                  <span>{lang.toUpperCase()}</span>
                </button>
                <button
                  onClick={resetCurrentPhase}
                  className={`p-2 flex items-center justify-center transition-all border active:scale-95 ${theme.rounded} ${theme.btn}`}
                  title={t.resetBlock}
                >
                  <RotateCcw className="w-4 h-4 text-current" />
                </button>
                <button
                  onClick={clearAllData}
                  className={`p-2 flex items-center justify-center transition-all border active:scale-95 ${theme.rounded} ${theme.btn} border-red-500/40 hover:border-red-400 hover:bg-red-950/20 text-red-500`}
                  title="Limpar Tudo / Clear All History"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Navigation Tabs (Horizontal Scrollable) */}
          <div className="mt-6 flex overflow-x-auto gap-2 pb-2 scrollbar-hide">
            {PHASES.map(p => {
              const isActive = activePhase === p.id;
              const PHASE_STYLE = {
                phase1: {
                  active: 'bg-green-950/20 text-green-400 border-green-500/80 shadow-[0_0_10px_rgba(74,222,128,0.25)] font-bold uppercase rounded-none font-mono',
                  inactive: 'bg-black text-zinc-500 hover:text-green-300 hover:border-green-500/40 border-zinc-900 rounded-none font-mono',
                  activeTitle: 'text-green-300',
                  activeSubtitle: 'text-green-400/80'
                },
                phase2: {
                  active: 'bg-amber-950/20 text-amber-400 border-amber-500/80 shadow-[0_0_10px_rgba(251,191,36,0.25)] font-bold uppercase rounded-none font-mono',
                  inactive: 'bg-black text-zinc-500 hover:text-amber-300 hover:border-amber-500/40 border-zinc-900 rounded-none font-mono',
                  activeTitle: 'text-amber-300',
                  activeSubtitle: 'text-amber-400/80'
                },
                phase3: {
                  active: 'bg-violet-950/20 text-violet-400 border-violet-500/50 shadow-[0_0_12px_rgba(167,139,250,0.2)] rounded-lg font-sans font-bold',
                  inactive: 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900/80 hover:text-violet-300 hover:border-violet-500/30 border-zinc-900 rounded-lg font-sans',
                  activeTitle: 'text-violet-300',
                  activeSubtitle: 'text-violet-400/80'
                },
                phase4: {
                  active: 'bg-sky-950/20 text-sky-400 border-sky-500/50 shadow-[0_0_15px_rgba(56,189,248,0.25)] rounded-xl font-sans font-bold',
                  inactive: 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900/80 hover:text-sky-300 hover:border-sky-500/30 border-zinc-900 rounded-xl font-sans',
                  activeTitle: 'text-sky-300',
                  activeSubtitle: 'text-sky-400/80'
                },
                phase5: {
                  active: 'bg-blue-950/20 text-blue-400 border-blue-500/50 shadow-[0_0_20px_rgba(96,165,250,0.35)] rounded-2xl font-sans font-extrabold',
                  inactive: 'bg-zinc-900/50 text-zinc-400 hover:bg-zinc-900/80 hover:text-blue-300 hover:border-blue-500/30 border-zinc-900 rounded-2xl font-sans',
                  activeTitle: 'text-blue-300',
                  activeSubtitle: 'text-blue-400/80'
                }
              };
              const pStyle = PHASE_STYLE[p.id] || PHASE_STYLE.phase1;
              return (
                <button
                  key={p.id}
                  onClick={() => handlePhaseChange(p.id)}
                  className={`px-4 py-2.5 transition-all whitespace-nowrap flex flex-col items-start min-w-[140px] border group ${isActive ? pStyle.active : pStyle.inactive}`}
                >
                  <span className={`font-bold text-sm transition-colors ${isActive ? pStyle.activeTitle : 'text-zinc-300 group-hover:text-zinc-100'}`}>
                    {t[`${p.id}_title`]}
                  </span>
                  <span className={`text-xs mt-0.5 transition-colors ${isActive ? pStyle.activeSubtitle : 'text-zinc-500'}`}>
                    {t[`${p.id}_subtitle`]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 pb-32">

        {/* Left Column: Weekday Accordions (70%) */}
        <section className="flex-1 min-w-0 space-y-6">
          <div className="mb-6">
            {(() => {
              const HEADER_STYLE = {
                phase1: {
                  title: 'text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.4)]',
                  desc: 'text-purple-300 border-purple-500'
                },
                phase2: {
                  title: 'text-pink-500 drop-shadow-[0_0_8px_rgba(236,72,153,0.4)]',
                  desc: 'text-pink-300 border-pink-500'
                },
                phase3: {
                  title: 'text-yellow-300 drop-shadow-[0_0_8px_rgba(234,179,8,0.4)]',
                  desc: 'text-yellow-200 border-yellow-500'
                },
                phase4: {
                  title: 'text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.4)]',
                  desc: 'text-cyan-300 border-cyan-500'
                },
                phase5: {
                  title: 'text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]',
                  desc: 'text-blue-300 border-blue-500'
                }
              };
              const hStyle = HEADER_STYLE[activePhaseData.id] || HEADER_STYLE.phase1;
              return (
                <>
                  <h2 className="text-2xl font-extrabold flex items-center gap-2">
                    <span className={`${hStyle.title}`}>{t[`${activePhaseData.id}_title`]}:</span>
                    <span className="text-zinc-100 drop-shadow-[0_0_8px_rgba(255,255,255,0.15)]">{t[`${activePhaseData.id}_subtitle`]}</span>
                  </h2>
                  <p className={`${hStyle.desc} text-sm leading-relaxed border-l-2 pl-4 mt-3`}>
                    {t[`${activePhaseData.id}_desc`]}
                  </p>
                </>
              );
            })()}
          </div>

          <div className="space-y-4">
            {activePhaseData.schedule.map((day) => {
              const dayCompletedTasks = day.tasks.filter(id => progress[id]).length;
              const isDayComplete = dayCompletedTasks === day.tasks.length;
              const isExpanded = expandedDay === day.id;

              const colorMatch = day.icon.props.className.match(/text-(\w+)-\d+/);
              const colorName = colorMatch ? colorMatch[1] : 'purple';

              const COLOR_MAP = {
                purple: {
                  text: 'text-purple-400',
                  textDim: 'text-purple-400/80',
                  border: 'border-purple-500/20',
                  borderHover: 'group-hover:border-purple-500/40',
                  borderRetro: 'border-purple-500/60',
                  borderRetroHover: 'group-hover:border-purple-400',
                  bgHover: 'hover:bg-purple-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-purple-500/40 shadow-purple-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-purple-500/30 hover:shadow-purple-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-purple-300',
                  taskText: 'text-purple-300/90',
                  taskTextHover: 'group-hover:text-purple-200',
                  taskBorderHover: 'hover:border-purple-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(168,85,247,0.08)]',
                  taskCheckHover: 'group-hover:text-purple-400'
                },
                orange: {
                  text: 'text-orange-400',
                  textDim: 'text-orange-400/80',
                  border: 'border-orange-500/20',
                  borderHover: 'group-hover:border-orange-500/40',
                  borderRetro: 'border-orange-500/60',
                  borderRetroHover: 'group-hover:border-orange-400',
                  bgHover: 'hover:bg-orange-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-orange-500/40 shadow-orange-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-orange-500/30 hover:shadow-orange-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-orange-300',
                  taskText: 'text-orange-300/90',
                  taskTextHover: 'group-hover:text-orange-200',
                  taskBorderHover: 'hover:border-orange-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(249,115,22,0.08)]',
                  taskCheckHover: 'group-hover:text-orange-400'
                },
                emerald: {
                  text: 'text-emerald-400',
                  textDim: 'text-emerald-400/80',
                  border: 'border-emerald-500/20',
                  borderHover: 'group-hover:border-emerald-500/40',
                  borderRetro: 'border-emerald-500/60',
                  borderRetroHover: 'group-hover:border-emerald-400',
                  bgHover: 'hover:bg-emerald-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-emerald-500/40 shadow-emerald-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-emerald-500/30 hover:shadow-emerald-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-emerald-300',
                  taskText: 'text-emerald-300/90',
                  taskTextHover: 'group-hover:text-emerald-200',
                  taskBorderHover: 'hover:border-emerald-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(16,185,129,0.08)]',
                  taskCheckHover: 'group-hover:text-emerald-400'
                },
                cyan: {
                  text: 'text-cyan-400',
                  textDim: 'text-cyan-400/80',
                  border: 'border-cyan-500/20',
                  borderHover: 'group-hover:border-cyan-500/40',
                  borderRetro: 'border-cyan-500/60',
                  borderRetroHover: 'group-hover:border-cyan-400',
                  bgHover: 'hover:bg-cyan-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-cyan-500/40 shadow-cyan-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-cyan-500/30 hover:shadow-cyan-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-cyan-300',
                  taskText: 'text-cyan-300/90',
                  taskTextHover: 'group-hover:text-cyan-200',
                  taskBorderHover: 'hover:border-cyan-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(6,182,212,0.08)]',
                  taskCheckHover: 'group-hover:text-cyan-400'
                },
                pink: {
                  text: 'text-pink-400',
                  textDim: 'text-pink-400/80',
                  border: 'border-pink-500/20',
                  borderHover: 'group-hover:border-pink-500/40',
                  borderRetro: 'border-pink-500/60',
                  borderRetroHover: 'group-hover:border-pink-400',
                  bgHover: 'hover:bg-pink-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-pink-500/40 shadow-pink-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-pink-500/30 hover:shadow-pink-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-pink-300',
                  taskText: 'text-pink-300/90',
                  taskTextHover: 'group-hover:text-pink-200',
                  taskBorderHover: 'hover:border-pink-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(236,72,153,0.08)]',
                  taskCheckHover: 'group-hover:text-pink-400'
                },
                blue: {
                  text: 'text-blue-400',
                  textDim: 'text-blue-400/80',
                  border: 'border-blue-500/20',
                  borderHover: 'group-hover:border-blue-500/40',
                  borderRetro: 'border-blue-500/60',
                  borderRetroHover: 'group-hover:border-blue-400',
                  bgHover: 'hover:bg-blue-950/30',
                  bgCardActive: 'bg-zinc-900/60 border-blue-500/40 shadow-blue-500/10',
                  bgCardInactive: 'bg-zinc-900/40 border-zinc-900 hover:border-blue-500/30 hover:shadow-blue-500/5 hover:bg-zinc-900/60',
                  textHover: 'group-hover:text-blue-300',
                  taskText: 'text-blue-300/90',
                  taskTextHover: 'group-hover:text-blue-200',
                  taskBorderHover: 'hover:border-blue-500/25',
                  taskShadowHover: 'hover:shadow-[0_0_10px_rgba(59,130,246,0.08)]',
                  taskCheckHover: 'group-hover:text-blue-400'
                }
              };

              const style = COLOR_MAP[colorName] || COLOR_MAP.purple;

              const cardClass = isDayComplete
                ? (theme.isRetro ? `bg-black border ${theme.border} shadow-none` : 'bg-emerald-950/10 border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.05)]')
                : isExpanded
                  ? theme.bgCardActive
                  : theme.bgCardInactive;

              const dayBorderClass = theme.isRetro ? style.borderRetro : style.border;
              const dayBorderHoverClass = theme.isRetro ? style.borderRetroHover : style.borderHover;
              const dayBgClass = theme.isRetro ? 'bg-black' : 'bg-zinc-950';

              return (
                <div
                  key={day.id}
                  className={`transition-all duration-300 border group ${theme.rounded} ${cardClass}`}
                >
                  {/* Accordion Trigger */}
                  <div
                    className="p-5 cursor-pointer flex items-center justify-between gap-4"
                    onClick={() => toggleDayAccordion(day.id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`p-2.5 transition-all ${theme.rounded} ${isDayComplete ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : `${dayBgClass} border ${dayBorderClass} ${style.text} ${dayBorderHoverClass}`}`}>
                        {day.icon}
                      </div>
                      <div>
                        <h3 className={`font-extrabold text-sm sm:text-base transition-colors uppercase tracking-wider ${style.text}`}>
                          {t[day.dayKey]}
                        </h3>
                        <p className={`text-xs sm:text-sm mt-0.5 transition-colors ${style.textDim} group-hover:text-zinc-200`}>
                          {t[day.topicKey]}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <span className={`text-[10px] font-mono font-bold px-2 py-1 border transition-all ${theme.rounded} ${dayBgClass} ${dayBorderClass} ${style.text} ${dayBorderHoverClass} group-hover:text-zinc-200`}>
                        {dayCompletedTasks} / {day.tasks.length}
                      </span>
                      <button
                        onClick={() => toggleDayAccordion(day.id)}
                        className={`p-1.5 transition-colors ${theme.rounded} ${style.bgHover} text-zinc-400`}
                      >
                        {isExpanded ? <ChevronUp className={`w-4 h-4 ${style.text}`} /> : <ChevronDown className={`w-4 h-4 ${style.text}`} />}
                      </button>
                    </div>
                  </div>

                  {/* Accordion Content */}
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isExpanded ? 'max-h-[1000px] opacity-100 border-t border-zinc-900/50' : 'max-h-0 opacity-0 pointer-events-none'
                    }`}>
                    <div className={`p-5 space-y-3 bg-zinc-950/20 ${theme.rounded}`}>
                      {day.tasks.map(taskId => {
                        const isCompleted = !!progress[taskId];
                        return (
                          <label
                            key={taskId}
                            className={`flex items-start gap-3.5 p-3 cursor-pointer transition-all group border border-transparent ${theme.rounded} ${style.taskBorderHover} ${style.taskShadowHover}`}
                          >
                            <div className="pt-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                              <input
                                type="checkbox"
                                className="hidden"
                                checked={isCompleted}
                                onChange={() => handleToggleTask(taskId)}
                              />
                              {theme.isRetro ? (
                                isCompleted ? (
                                  <span className={`font-mono font-bold text-sm mr-1.5 ${theme.textPrimary} drop-shadow-[0_0_5px_rgba(74,222,128,0.5)]`}>[X]</span>
                                ) : (
                                  <span className={`font-mono text-sm mr-1.5 text-zinc-600`}>[ ]</span>
                                )
                              ) : isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)] active:scale-90 transition-transform" />
                              ) : (
                                <Circle className={`w-5 h-5 text-zinc-700 ${style.taskCheckHover} transition-all active:scale-90`} />
                              )}
                            </div>
                            <span className={`text-xs sm:text-sm leading-relaxed transition-colors ${isCompleted ? 'text-zinc-600 line-through' : `${style.taskText} ${style.taskTextHover}`}`}>
                              {t[taskId]}
                            </span>
                          </label>
                        );
                      })}

                      {/* LinkedIn Action Button */}
                      {isDayComplete && (
                        <div className="pt-3 border-t border-zinc-900 flex justify-end">
                          <button
                            onClick={() => handleTriggerLinkedInModal(day)}
                            className={`px-3 py-1.5 flex items-center gap-2 text-[10px] sm:text-xs font-bold transition-all active:scale-95 uppercase tracking-wider ${theme.rounded} ${theme.btn}`}
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>{t.linkedinBtn}</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right Column: Sidebar Widgets (30%) */}
        <aside className="lg:w-80 space-y-6 shrink-0">

          {/* Gamification Widget */}
          <div className={`bg-zinc-900/40 border p-6 relative overflow-hidden backdrop-blur-md transition-all duration-500 ${theme.bgCard} ${theme.rounded} ${theme.accentGlow}`}>
            <div className={`absolute top-0 right-0 w-24 h-24 ${wStyle.radialGlow} rounded-full blur-2xl -mr-10 -mt-10 transition-all duration-500`}></div>

            {/* Header: Level & Streak */}
            <div className="flex justify-center items-center gap-3 mb-5">
              <div className={`font-extrabold text-xs uppercase tracking-wider py-1.5 px-3 rounded-lg transition-all duration-500 ${wStyle.badgeBg}`}>
                {t.levelLabel} {level}
              </div>

              {/* Streak Counter */}
              <div
                className={`flex items-center gap-1.5 px-3 py-1.5 border transition-all ${theme.rounded} ${streak > 0
                  ? 'bg-zinc-950 border-cyan-400 text-cyan-400 shadow-[0_0_12px_rgba(6,182,212,0.15)] animate-pulse'
                  : 'bg-zinc-950 border-zinc-800 text-zinc-500'
                  }`}
                title={streak > 0 ? `${streak} ${t.streakActive}` : t.streakInactive}
              >
                <Flame className={`w-4 h-4 ${streak > 0 ? 'text-cyan-400 fill-cyan-400 animate-pulse' : 'text-zinc-600'}`} />
                <span className="text-xs font-bold font-mono">{streak}</span>
              </div>
            </div>

            {/* Level Title */}
            <div className="mb-5 text-center flex flex-col items-center">
              <h4 className={`text-base font-extrabold uppercase tracking-wide transition-all duration-500 ${wStyle.levelTitle}`}>{getLevelTitle(level)}</h4>
              <p className={`text-xs font-bold mt-2 uppercase tracking-wide max-w-xs transition-all duration-500 ${wStyle.subTitle}`}>{t.title}</p>
            </div>

            {/* XP Progress Bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs sm:text-sm font-extrabold text-zinc-300">
                <span className={`transition-all duration-500 ${wStyle.label}`}>{t.nextLevelLabel}</span>
                <span className={`font-mono transition-all duration-500 ${wStyle.xpText}`}>{xp} / {xpNeeded} XP</span>
              </div>
              <div className={`w-full h-4 overflow-hidden p-0.5 transition-all duration-500 ${theme.progressBg}`}>
                <div
                  className={`h-full rounded-full transition-all duration-500 ${wStyle.progressBar}`}
                  style={{ width: `${xpPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Daily English Habits Widget */}
          <div className={`bg-zinc-900/40 border p-6 relative overflow-hidden backdrop-blur-md transition-all duration-500 ${theme.bgCard} ${theme.rounded} ${theme.accentGlow}`}>
            <div className={`absolute top-0 right-0 w-24 h-24 ${wStyle.radialGlow} rounded-full blur-2xl -mr-10 -mt-10 transition-all duration-500`}></div>
            <h2 className={`text-xs font-extrabold mb-4 flex items-center justify-center gap-2 uppercase tracking-wider text-center transition-all duration-500 ${theme.textPrimary}`}>
              <Headphones className="w-4 h-4" />
              {t.dailyHabits}
            </h2>
            <div className="space-y-3.5">
              {HABITS.map(habitId => {
                const isCompleted = !!progress[habitId];
                return (
                  <label
                    key={habitId}
                    className={`flex items-start gap-3.5 p-2.5 -mx-2 cursor-pointer transition-colors group border border-transparent hover:border-zinc-800/20 ${theme.rounded}`}
                  >
                    <div className="pt-0.5 shrink-0" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isCompleted}
                        onChange={() => handleToggleTask(habitId, true)}
                      />
                      {theme.isRetro ? (
                        isCompleted ? (
                          <span className={`font-mono font-bold text-sm mr-1.5 ${theme.textPrimary}`}>[X]</span>
                        ) : (
                          <span className={`font-mono text-sm mr-1.5 text-zinc-600`}>[ ]</span>
                        )
                      ) : isCompleted ? (
                        <CheckCircle2 className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)] active:scale-90 transition-transform" />
                      ) : (
                        <Circle className="w-5 h-5 text-zinc-700 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-all active:scale-90" />
                      )}
                    </div>
                    <span className={`text-xs sm:text-sm leading-relaxed transition-colors ${isCompleted ? 'text-zinc-600 line-through' : theme.textPrimary
                      }`}>
                      {t[habitId]}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Manual PJ Brasil (Accordion) */}
          <div className={`bg-zinc-900/40 border overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500 ${theme.bgCard} ${theme.rounded} ${theme.accentGlow}`}>
            <div
              className={`p-5 cursor-pointer flex items-center justify-between bg-zinc-900/80 border-b hover:bg-zinc-900 transition-colors ${theme.borderSoft}`}
              onClick={() => setIsPjManualOpen(!isPjManualOpen)}
            >
              <h2 className={`text-xs font-extrabold flex items-center gap-2.5 uppercase tracking-wider transition-all duration-500 ${theme.textPrimary}`}>
                <FileText className="w-4.5 h-4.5" />
                {t.pjManual}
              </h2>
              {isPjManualOpen ? <ChevronUp className={`w-4.5 h-4.5 transition-all duration-500 ${theme.textPrimary}`} /> : <ChevronDown className={`w-4.5 h-4.5 transition-all duration-500 ${theme.textPrimary}`} />}
            </div>

            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isPjManualOpen ? 'max-h-[850px] opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
              }`}>
              <div className="p-5 space-y-5 bg-zinc-950/20">
                <p className="text-[13px] sm:text-sm text-yellow-300 italic text-center w-full font-semibold drop-shadow-[0_0_6px_rgba(253,224,71,0.3)]">
                  {t.pjManualSubtitle}
                </p>

                {PJ_MANUAL.map((item, index) => (
                  <div key={index} className="space-y-1.5 flex flex-col items-center text-center">
                    <h3 className={`text-sm font-extrabold flex items-center justify-center gap-2 text-center w-full ${item.titleColor}`}>
                      {item.icon}
                      <span>{t[item.titleKey]}</span>
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed text-center w-full ${item.descColor}`}>
                      {t[item.textKey]}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </aside>
      </main>

      {/* Bottom Sticky Careers Goal Section */}
      {(() => {
        const FOOTER_STYLE = {
          phase1: {
            border: 'border-green-500/30',
            iconBg: 'bg-green-950/20',
            iconBorder: 'border-green-500/40',
            iconText: 'text-green-400',
            metaText: 'text-green-400',
            titleText: 'text-green-300 drop-shadow-[0_0_8px_rgba(74,222,128,0.3)]',
            descText: 'text-green-200/90'
          },
          phase2: {
            border: 'border-amber-500/30',
            iconBg: 'bg-amber-950/20',
            iconBorder: 'border-amber-500/40',
            iconText: 'text-amber-400',
            metaText: 'text-amber-400',
            titleText: 'text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]',
            descText: 'text-amber-200/90'
          },
          phase3: {
            border: 'border-violet-500/20',
            iconBg: 'bg-violet-950/50',
            iconBorder: 'border-violet-500/30',
            iconText: 'text-violet-400',
            metaText: 'text-violet-400',
            titleText: 'text-violet-300 drop-shadow-[0_0_8px_rgba(167,139,250,0.3)]',
            descText: 'text-violet-200/90'
          },
          phase4: {
            border: 'border-sky-500/20',
            iconBg: 'bg-sky-950/50',
            iconBorder: 'border-sky-500/30',
            iconText: 'text-sky-400',
            metaText: 'text-sky-400',
            titleText: 'text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]',
            descText: 'text-sky-200/90'
          },
          phase5: {
            border: 'border-blue-500/20',
            iconBg: 'bg-blue-950/50',
            iconBorder: 'border-blue-500/30',
            iconText: 'text-blue-400',
            metaText: 'text-blue-400',
            titleText: 'text-blue-300 drop-shadow-[0_0_8px_rgba(96,165,250,0.3)]',
            descText: 'text-blue-200/90'
          }
        };
        const fStyle = FOOTER_STYLE[activePhase] || FOOTER_STYLE.phase1;
        return (
          <footer className={`fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/90 backdrop-blur-md border-t ${fStyle.border} p-5 shadow-[0_-10px_20px_rgba(0,0,0,0.4)]`}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className={`p-2.5 border transition-all duration-500 ${theme.rounded} ${fStyle.iconBg} ${fStyle.iconBorder} ${fStyle.iconText}`}>
                  <Briefcase className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest transition-colors ${fStyle.metaText}`}>{t.macroGoalsTitle}</span>
                  <h4 className={`text-xs sm:text-sm font-extrabold mt-0.5 uppercase tracking-wide transition-colors ${fStyle.titleText}`}>{activeBlockGoal.title}</h4>
                </div>
              </div>
              <div className={`text-[11px] sm:text-xs md:max-w-xl text-center pl-3 pr-3 w-full md:w-auto transition-colors ${fStyle.descText}`}>
                {activeBlockGoal.desc}
              </div>
            </div>
          </footer>
        );
      })()}

      {/* LinkedIn Draft Modal */}
      {linkedinModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm transition-opacity">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">

            {/* Modal Header */}
            <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-blue-400 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                {t.linkedinModalTitle}
              </h3>
              <button
                onClick={() => setLinkedinModal({ isOpen: false, content: '' })}
                className="text-zinc-400 hover:text-zinc-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              <textarea
                className="w-full h-44 p-3 bg-zinc-950 border border-zinc-800 rounded-xl text-zinc-300 font-sans text-xs leading-relaxed focus:outline-none focus:border-blue-500/50 resize-none"
                readOnly
                value={linkedinModal.content}
              ></textarea>

              <div className="mt-4 flex justify-end gap-2">
                <button
                  onClick={() => setLinkedinModal({ isOpen: false, content: '' })}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 bg-zinc-950 hover:bg-zinc-800 hover:text-zinc-300 rounded-lg border border-zinc-800 transition-all"
                >
                  {t.linkedinCloseBtn}
                </button>
                <button
                  onClick={copyToClipboard}
                  className="px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg flex items-center gap-2 transition-all active:scale-95 shadow-md shadow-blue-500/20"
                >
                  {copiedFeedback ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedFeedback ? t.linkedinCopied : t.linkedinCopyBtn}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Quiz Modal Overlay */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md transition-all">
          <div className={`bg-zinc-900 border w-full max-w-xl overflow-hidden shadow-2xl relative transition-all duration-500 ${theme.bgCard} ${theme.rounded} ${theme.accentGlow}`}>

            {/* Progress Bar */}
            <div className="w-full h-1 bg-zinc-950">
              <div
                className={`h-full transition-all duration-300 ${theme.progressBar}`}
                style={{ width: `${(Math.min(10, activeQuiz.currentQuestionIndex) / 10) * 100}%` }}
              ></div>
            </div>

            {/* Modal Header */}
            <div className="px-6 py-4 bg-zinc-950 flex items-center justify-between border-b border-zinc-800">
              <div>
                <h3 className={`text-xs sm:text-sm font-bold uppercase tracking-widest flex items-center gap-2 transition-colors ${theme.textPrimary}`}>
                  <Code className={`w-4 h-4 ${theme.textSecondary}`} />
                  <span>{lang === 'pt' ? 'PROVA DE CONHECIMENTO' : 'KNOWLEDGE TEST'}</span>
                </h3>
                <span className="text-[10px] text-zinc-500">
                  {t[activeQuiz.taskId]}
                </span>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-xs font-mono font-bold text-zinc-400">
                  {Math.min(10, activeQuiz.currentQuestionIndex + 1)} / 10
                </span>
                {activeQuiz.currentQuestionIndex < 10 && (
                  <button
                    onClick={() => setActiveQuiz(null)}
                    className={`text-zinc-400 hover:text-zinc-200 transition-colors p-1.5 hover:bg-zinc-800 ${theme.rounded}`}
                    title={lang === 'pt' ? 'Cancelar prova' : 'Cancel test'}
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {activeQuiz.currentQuestionIndex < 10 ? (
                <div>
                  {/* Question Text */}
                  <h4 className="text-xs sm:text-sm font-bold text-zinc-100 mb-6 leading-relaxed">
                    {activeQuiz.questions[activeQuiz.currentQuestionIndex][lang].question}
                  </h4>

                  {/* Options */}
                  <div className="space-y-3">
                    {activeQuiz.questions[activeQuiz.currentQuestionIndex][lang].options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleAnswerQuestion(idx)}
                        className={`w-full p-4 text-left text-xs sm:text-sm bg-zinc-950 hover:bg-zinc-800/40 text-zinc-300 hover:text-white border transition-all active:scale-[0.99] flex gap-3 ${theme.rounded} ${theme.borderSoft} hover:${theme.border}`}
                      >
                        <span className={`font-bold ${theme.textSecondary}`}>{String.fromCharCode(65 + idx)}.</span>
                        <span>{option}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Results Screen */
                <div className="text-center py-6 space-y-6">
                  {(() => {
                    const correctCount = activeQuiz.answers.reduce((acc, ans, idx) => {
                      const correctAns = activeQuiz.questions[idx].pt.correct;
                      return acc + (ans === correctAns ? 1 : 0);
                    }, 0);
                    const isPassed = correctCount >= 9;

                    return (
                      <div>
                        <div className={`inline-flex items-center justify-center p-4 bg-zinc-950 border border-zinc-800 mb-4 ${theme.rounded}`}>
                          {isPassed ? (
                            <CheckCircle2 className="w-16 h-16 text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.4)]" />
                          ) : (
                            <X className="w-16 h-16 text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]" />
                          )}
                        </div>

                        <h3 className={`text-xl font-black uppercase tracking-wider ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
                          {isPassed
                            ? (lang === 'pt' ? 'APROVADO!' : 'PASSED!')
                            : (lang === 'pt' ? 'REPROVADO' : 'FAILED')}
                        </h3>

                        <p className="text-zinc-400 text-xs sm:text-sm mt-2">
                          {lang === 'pt'
                            ? `Você acertou ${correctCount} de 10 questões (${correctCount * 10}%).`
                            : `You got ${correctCount} out of 10 questions correct (${correctCount * 10}%).`}
                        </p>

                        <p className="text-zinc-500 text-[10px] sm:text-xs mt-3 max-w-md mx-auto leading-relaxed">
                          {isPassed
                            ? (lang === 'pt'
                              ? 'Excelente! Seu progresso foi gravado e você ganhou +10 XP.'
                              : 'Excellent! Your progress was saved and you earned +10 XP.')
                            : (lang === 'pt'
                              ? 'Você não atingiu a pontuação mínima de 90% (9/10). Esta prova foi bloqueada e você só poderá refazê-la amanhã!'
                              : 'You did not reach the minimum score of 90% (9/10). This test has been locked and you can only retake it tomorrow!')}
                        </p>

                        <div className="mt-8 flex justify-center">
                          <button
                            onClick={() => handleCloseQuiz(isPassed)}
                            className={`px-6 py-2.5 font-bold text-xs sm:text-sm transition-all active:scale-95 shadow-lg ${theme.rounded} ${isPassed
                              ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-500/20'
                              : `${theme.btn} text-zinc-300`
                              }`}
                          >
                            {isPassed
                              ? (lang === 'pt' ? 'Concluir' : 'Finish')
                              : (lang === 'pt' ? 'Fechar' : 'Close')}
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}

export default App;
