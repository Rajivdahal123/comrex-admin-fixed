import React, { ReactNode } from 'react';

import { AccountSetting } from '../../modules/Settings/AccountSetting';

export interface ITab {
  label: string;
  value: string;
  render: () => ReactNode;
}

export const tabs: ITab[] = [
  { label: 'Account', value: 'account', render: () => <AccountSetting /> },
  { label: 'Manage', value: 'manage', render: () => <div className="h-96" /> },
  { label: 'Option', value: 'option', render: () => <div className="h-96" /> },
];
