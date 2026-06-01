import React, { useState, useEffect, useCallback, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiPlay, FiPause, FiRotateCcw, FiBellOff } from 'react-icons/fi';
import { useTheme } from '../context/ThemeContext';
import './Timer.css';

const DEFAULT_MODES = {
  SPRINT: { label: 'Focus Sprint', minutes: 25, color: '#81C784' },
  SHORT: { label: 'Short Break', minutes: 5, color: '#64B5F6' },
  LONG: { label: 'Long Break', minutes: 15, color: '#9575CD' },
  CUSTOM: { label: 'Custom', hours: 0, minutes: 10, color: '#FFB74D' }
};

const Timer = ({ onComplete }) => {
  const [modes, setModes] = useState(DEFAULT_MODES);
  const [mode, setMode] = useState('SPRINT');
  const [timeLeft, setTimeLeft] = useState(DEFAULT_MODES.SPRINT.minutes * 60);
  const [isActive, setIsActive] = useState(false);
  const [isAlarmRinging, setIsAlarmRinging] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg');
    audioRef.current.loop = true;
  }, []);

  const stopAlarm = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsAlarmRinging(false);
  }, []);

  const getTotalSeconds = useCallback((m) => {
    if (m === 'CUSTOM') {
      const totalMins = (modes.CUSTOM.hours * 60) + modes.CUSTOM.minutes;
      return Math.max(60, totalMins * 60); // At least 1 minute if both are 0
    }
    return modes[m].minutes * 60;
  }, [modes]);

  const resetTimer = useCallback(() => {
    setIsActive(false);
    setTimeLeft(getTotalSeconds(mode));
    stopAlarm();
  }, [mode, getTotalSeconds, stopAlarm]);

  useEffect(() => {
    resetTimer();
  }, [mode, resetTimer]);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      setIsActive(false);
      onComplete(getTotalSeconds(mode) / 60);
      setIsAlarmRinging(true);
      if (audioRef.current) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, mode, getTotalSeconds, onComplete]);

  const toggleTimer = () => {
    if (isAlarmRinging) {
      stopAlarm();
    } else {
      setIsActive(!isActive);
    }
  };

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hrs > 0) {
      return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const percentage = (timeLeft / getTotalSeconds(mode)) * 100;
  const isLast10 = timeLeft <= 10 && timeLeft > 0;
  const { theme } = useTheme();

  const getPathColor = () => {
    if (theme === 'dark') return '#FFFFFF';
    return '#81C784';
  };

  const handleCustomHoursChange = (e) => {
    const val = Math.max(0, parseInt(e.target.value) || 0);
    setModes(prev => {
      const newModes = { ...prev, CUSTOM: { ...prev.CUSTOM, hours: val } };
      if (!isActive && mode === 'CUSTOM') {
        const totalMins = (val * 60) + newModes.CUSTOM.minutes;
        setTimeLeft(Math.max(60, totalMins * 60));
      }
      return newModes;
    });
  };

  const handleCustomMinutesChange = (e) => {
    const val = Math.max(0, parseInt(e.target.value) || 0);
    setModes(prev => {
      const newModes = { ...prev, CUSTOM: { ...prev.CUSTOM, minutes: val } };
      if (!isActive && mode === 'CUSTOM') {
        const totalMins = (newModes.CUSTOM.hours * 60) + val;
        setTimeLeft(Math.max(60, totalMins * 60));
      }
      return newModes;
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="timer-container glass"
    >
      <div className="timer-modes-wrapper">
        <div className="timer-modes">
          {Object.keys(modes).map((m) => (
            <button 
              key={m}
              className={mode === m ? 'active' : ''}
              onClick={() => { setMode(m); stopAlarm(); }}
            >
              {modes[m].label}
            </button>
          ))}
        </div>
        {mode === 'CUSTOM' && (
          <div className="custom-input-container">
            <input 
              type="number" 
              value={modes.CUSTOM.hours} 
              onChange={handleCustomHoursChange} 
              className="custom-time-input"
              min="0"
            />
            <span>h</span>
            <input 
              type="number" 
              value={modes.CUSTOM.minutes} 
              onChange={handleCustomMinutesChange} 
              className="custom-time-input"
              min="0"
            />
            <span>m</span>
          </div>
        )}
      </div>

      <div className={`timer-display ${isLast10 ? 'shake-pulse' : ''} ${isActive ? 'active-pulse' : ''}`}>
        <CircularProgressbar
          value={percentage}
          text={formatTime(timeLeft)}
          strokeWidth={6}
          styles={buildStyles({
            pathColor: getPathColor(),
            textColor: 'var(--text-main)',
            trailColor: 'rgba(0,0,0,0.05)',
            pathTransitionDuration: 1,
          })}
        />
      </div>

      <div className="timer-controls">
        <button onClick={resetTimer} className="control-btn"><FiRotateCcw /></button>
        <button onClick={toggleTimer} className={`control-btn main-btn ${isAlarmRinging ? 'ringing' : ''}`}>
          {isAlarmRinging ? <FiBellOff /> : (isActive ? <FiPause /> : <FiPlay />)}
        </button>
      </div>

      <p className="session-label">{modes[mode].label}</p>
    </motion.div>
  );
};

export default Timer;
