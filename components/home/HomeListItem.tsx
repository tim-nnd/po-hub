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

export const HomeListItem: React.FC<HomeListItemProps> = ({ id = '', title = 'Title', subtitle = 'lorem ipsum dolor sit amet', min, max, currentValue, image, className, ...props }) => {
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
            className='w-1/3 object-cover bg-center bg-no-repeat bg-fill h-48'
          />
          <div className="flex-1 pl-3 w-2/3">
            <h1 className="font-bold text-xl mb-4">{title}</h1>
            <p className="mb-2 text-xs whitespace-pre-line truncate h-24">{subtitle}</p>
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
