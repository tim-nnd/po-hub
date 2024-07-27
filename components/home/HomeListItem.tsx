import React from 'react';
import classNames from 'classnames';
import Link from 'next/link';
import { ProgressBar } from "@/components/ui/ProgressBar";

interface HomeListItemProps {
  id: string;
  title: string;
  subtitle: string;
  min: number;
  max: number;
  currentValue: number;
  image: string;
  className?: string;
};

export const HomeListItem: React.FC<HomeListItemProps> = ({ id = '', title = 'Title', subtitle = 'lorem ipsum dolor sit amet', min = 0, max = 1, currentValue = 0, image, className, ...props }) => {
  return (
    <Link href="/product/[id]" as={`/product/${id}`}>
      <div
        className={classNames('my-4', className)}
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
                    {currentValue}/{min} targeted
                  </span>
                </div>
              </div>
              <ProgressBar 
                className="h-2"
                min={min}
                max={max}
                currentValue={currentValue}
              />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
