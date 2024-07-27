import React from 'react';
import classNames from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export const Button: React.FC<ButtonProps> = ({ variant = 'solid', className, children, ...props }) => {
  return (
    <button
      className={classNames(
        'px-4 py-2 rounded-md',
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
