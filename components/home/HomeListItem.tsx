import React from 'react';
import Image from "next/image";
import classNames from 'classnames';

interface HomeListItemProps {
  title: string;
  subtitle: string;
  progress: number;
  image: string;
  className?: string;
};

export const HomeListItem: React.FC<HomeListItemProps> = ({ title = 'Title', subtitle = 'lorem ipsum dolor sit amet', progress = '0', image, className, ...props }) => {
  return (
    <div 
      className={classNames('p-4', className)}
      {...props}
    >
      <div className="flex items-start">
        <img
          src={image}
          alt="Image"
          className='w-28 h-28'
          style={{ objectFit: 'cover' }}
        />
        <div className="flex-1 ml-3">
          <h1 className="font-bold text-xl">{title}</h1>
          <p className="mb-2 text-m">{subtitle}</p>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 grid place-items-center bg-blue-200 text-blue-600 rounded-full">
                  {progress}%
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-200">
              <div style={{ width: `${progress}%` }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
