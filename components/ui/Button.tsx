import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  rounded?: 'all' | 'left' | 'right'
}

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', rounded = 'all', className, children, ...props }) => {
  return (
    <button
      className={classNames(
        'px-4 py-2',
        {
          'rounded-md': rounded === 'all',
          'rounded-l-md': rounded === 'left',
          'rounded-r-md': rounded === 'right',
        },
        {
          'button-primary': variant === 'primary',
          'button-secondary': variant === 'secondary',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
