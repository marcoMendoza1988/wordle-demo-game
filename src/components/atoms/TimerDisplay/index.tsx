import React from 'react';

interface TimerDisplayProps {
  minutes: number;
  seconds: number;
}

const TimerDisplay: React.FC<TimerDisplayProps> = ({ minutes, seconds }) => {
  return (
    <span className="font-semibold text-[24px]">
      {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
    </span>
  );
};

export default TimerDisplay;
