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
  closed_at: string;
  className?: string;
};

export const HomeListItem: React.FC<HomeListItemProps> = ({ id = '', title = 'Title', subtitle = 'lorem ipsum dolor sit amet', min, max, currentValue, image, closed_at = '', className, ...props }) => {
  const calculateRemainingDays = () => {
    const currentDate = new Date();
    const closedDate = new Date(closed_at);
    const diffTime = closedDate.getTime() - currentDate.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  }

  return (
    <Link href="/product/[id]" as={`/product/${id}`}>
      <div
        className={classNames('my-4', className)}
        {...props}
      >
        <div className="flex items-start">
          <div className='w-1/3 object-cover bg-center bg-no-repeat bg-fill h-48 rounded relative'>
            <img
              src={image}
              alt="Image"
              className="w-full h-full object-cover rounded"
            />
            {calculateRemainingDays() <= 7 && <div className='absolute top-0 left-0 bg-red-600 text-xs py-1 px-2 rounded-br-xl'>Ends in {calculateRemainingDays()} days!</div>}
          </div>
          <div className="flex-1 pl-3 w-2/3">
            <h1 className="font-bold text-xl mb-4">{title}</h1>
            <p className="mb-2 text-xs whitespace-pre-line truncate h-24">{subtitle}</p>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="tag text-xs font-semibold inline-block py-1 px-2 grid place-items-center rounded-full">
                    {currentValue}/{min} reached
                  </span>
                </div>
              </div>
              <ProgressBar
                className="h-2"
                min={min}
                max={max}
                currentValue={currentValue}
              />
              <div className="flex justify-end">
                <span className="text-xs">{max}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
