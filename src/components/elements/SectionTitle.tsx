import React, { ReactNode } from 'react';

type IMainProps = {
  className?: string;
  children: ReactNode;
  color?: string;
};

const SectionTitle = (props: IMainProps) => (
  <div className={`flex justify-center ${props.className}`}>
    <h1 className={`uppercase text-3xl sm:text-4xl font-base-bold relative text-${props.color}`}>
      <span className="bg-black h-px w-4 sm:w-8 absolute top-2/4 -left-10 sm:-left-20" />
      {props.children}
      <span className="bg-black h-px w-4 sm:w-8 absolute top-2/4 -right-10 sm:-right-20" />
    </h1>
  </div>
);

export { SectionTitle };
