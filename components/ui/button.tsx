import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'outline' | 'solid';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'solid', className, children, ...props }) => {
  return (
    <button
      className={classNames(
        'px-4 py-2 rounded-md',
        {
          'border border-gray-300': variant === 'outline',
          'bg-blue-500 text-white': variant === 'solid',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
