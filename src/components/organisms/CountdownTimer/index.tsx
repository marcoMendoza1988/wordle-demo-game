import React, { useState, useEffect } from 'react';
import TimerDisplay from '../../atoms/TimerDisplay';

type CountdownTimerProps = {
    setTotalSecondsProps: any;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({setTotalSecondsProps}) => {
  const [totalSeconds, setTotalSeconds] = useState(5 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any | null = null;
    if (isActive) {
      interval = setInterval(() => {
        setTotalSeconds(prev => {
          if (prev <= 1) {
            setIsActive(false);
            if (interval) clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (!isActive && totalSeconds !== 0) {
      if (interval) clearInterval(interval);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, totalSeconds]);

  useEffect(() => {
    setTotalSecondsProps(totalSeconds);
  }, [totalSeconds]);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  useEffect(() => {
    handleStart();

    return () => {
        handleStop()
    }
  }, []);

  return (
    <div className="flex flex-col items-center">
      <TimerDisplay minutes={minutes} seconds={seconds} />
    </div>
  );
};

export default CountdownTimer;
