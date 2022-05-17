import React, { ReactNode } from 'react';

type IMainProps = {
  meta: ReactNode;
  children: ReactNode;
};

const MainLayout = (props: IMainProps) => (
  <div className="antialiased w-full max-w-[100vw] overflow-x-hidden">
    {props.meta}

    <div className="content">{props.children}</div>
  </div>
);

export default MainLayout;
