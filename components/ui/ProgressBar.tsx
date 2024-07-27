import React from 'react';
import classNames from 'classnames';

interface ProgressBarProps {
  min: number;
  max: number;
  currentValue: number;
  additionalValue?: number;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({ min, max, currentValue, additionalValue = 0, className, ...props }) => {
  return (
    <div 
      className={classNames(
        'progress-bar-background relative overflow-hidden rounded',
        className
      )}
      {...props}
    >
      <div style={{ width: `${((currentValue + additionalValue) / max) * 100}%` }} className="progress-bar-shadow absolute top-0 left-0 h-full transition-all duration-300 rounded"></div>
      <div style={{ width: `${(currentValue / max) * 100}%` }} className="progress-bar-value absolute top-0 left-0 h-full transition-all duration-300 rounded"></div>
      <div style={{ width: `${(min / max) * 100}%` }} className="progress-bar-min absolute top-0 left-0 h-full transition-all duration-300"></div>
    </div>
  );
};
