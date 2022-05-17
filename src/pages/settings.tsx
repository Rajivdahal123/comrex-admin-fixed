import dynamic from 'next/dynamic';
import React from 'react';
const MainLayout = dynamic(() => import('../components/layout/MainLayout'));
const Meta = dynamic(() => import('../components/layout/Meta'));

const SettingsComponent = () => (
  <MainLayout meta={<Meta title="Resources" description="Resources page" />}>
    <div className="bg-bottom-back bg-cover w-full xs:mb-0 py-16 xs:py-28">
      <div className="px-4 md:px-12 mb-20">
      </div>
    </div>
  </MainLayout>
);

export default SettingsComponent;
