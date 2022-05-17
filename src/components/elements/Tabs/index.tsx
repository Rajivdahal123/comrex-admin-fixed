import React from 'react';

import { ITab } from './tab';

type IMainProps = {
  tabs: ITab[];
  activeTab: string;
  onChange: (tab: ITab) => void;
};

const Tabs = ({ tabs, activeTab, onChange }: IMainProps) => (
  <div className="flex items-center">
    {
        tabs.map((tab, key) => (
          <div onKeyDown={() => null}
            role="tabpanel"
            className={`${activeTab === tab.value ? 'border-b-2 border-black text-black font-base-bold' : 'text-gray-spec border-b-2 border-white'} mr-8 flex items-center cursor-pointer`}
            key={`k_${key * key}`}
            onClick={() => onChange(tab)}
          >
            {tab.label}
          </div>
        ))
      }
  </div>
);

export { Tabs };
