// useHeal.ts
import { useState, useEffect, useRef } from 'react';

export function useHealth(hpMax, sendNewHp) {
  const [currentHp, setCurrentHp] = useState(hpMax);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef(null);

  const updateHeal = (delta) => {
    const newHp = Math.max(0, Math.min(hpMax, currentHp + delta));
    setCurrentHp(newHp);
    sendNewHp(newHp);
  };

  const closeTooltip = () => {
    setShowTooltip(false);
  };

  const handleClickOutside = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      closeTooltip();
    }
  };

  useEffect(() => {
    if (showTooltip) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showTooltip]);

  return {
    currentHp,
    showTooltip,
    tooltipRef,
    setShowTooltip,
    updateHeal,
    closeTooltip,
  };
}
