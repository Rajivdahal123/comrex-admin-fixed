import React, { ChangeEvent, useState } from 'react';

import * as _ from 'lodash';

import { Button } from '../../../elements/Button';
import { Input } from '../../../elements/Input';
import { accountData } from './accountData';

const userId = 0;

interface IFormType {
  value: string;
  error: string;
  label: string;
}

interface IAccountInfo {
  firstName: IFormType;
  lastName: IFormType;
  email: IFormType;
  curPwd: IFormType;
  newPwd: IFormType;
  retypedPwd: IFormType;
}

type IAccountKeys = 'firstName' | 'lastName' |'email' |'curPwd' |'newPwd' | 'retypedPwd';

const AccountSetting = () => {
  const [accountInfo, setAccountInfo] = useState<IAccountInfo>({
    firstName: { value: '', error: '', label: 'First Name' },
    lastName: { value: '', error: '', label: 'Last Name' },
    email: { value: '', error: '', label: 'Email' },
    curPwd: { value: '', error: '', label: 'Current Password' },
    newPwd: { value: '', error: '', label: 'New Password' },
    retypedPwd: { value: '', error: '', label: 'Retype Password' },
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>,
      formType: IAccountKeys
  ) => {
    setIsSaved(false);
    setAccountInfo({
      ...accountInfo,
      [formType]: { ...accountInfo[formType], value: e.target.value, error: '' },
    });
  };

  const handleSave = () => {
    const userData = accountData.find((account) => account.id === userId);
    const info = _.cloneDeep(accountInfo);

    if (info.firstName.value === '') {
      info.firstName.error = 'Required field';
      // eslint-disable-next-line no-useless-escape
    } else if (/[~#%\&{}+\|!@\$&*~\d]|\\.\\.|^\\.|\\.$/.test(info.firstName.value)) {
      info.firstName.error = 'No numbers or special characters are allowed';
    } else if (accountInfo.firstName.value.length > 30) {
      info.firstName.error = 'Maximum length is 30 characters';
    }

    if (info.lastName.value === '') {
      info.lastName.error = 'Required field';
      // eslint-disable-next-line no-useless-escape
    } else if (/[~#%\&{}+\|!@\$&*~\d]|\\.\\.|^\\.|\\.$/.test(info.lastName.value)) {
      info.lastName.error = 'No numbers or special characters are allowed';
    }

    if (info.email.value === '') {
      info.email.error = 'Required field';
    } else if (!/^((\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*?)\s*;?\s*)+/.test(info.email.value)) {
      info.email.error = 'Check the format of the email you entered';
    } else if (info.email.value.length > 80) {
      info.email.error = 'Maximum length is 80 characters';
    }

    // eslint-disable-next-line no-useless-escape
    if (!/^(?=.*?[A-Z|a-z])(?=.*?[0-9])(?=.*?[!@#\$&*~]).{6,}$/.test(info.newPwd.value)) {
      info.newPwd.error = 'Passwords must include at least six numbers, letters, and special characters (like ! and &).';
    } else if (info.newPwd.value !== info.retypedPwd.value) {
      info.retypedPwd.error = 'The passwords do not match';
    }

    if (userData && userData.password !== info.curPwd.value) {
      info.curPwd.error = 'Wrong password';
    }

    if (!Object.entries(info).find((account) => account[1].error !== '')) {
      if (accountData.find((account) => account.email === info.email.value)) {
        info.email.error = 'This email is already connected with a user account';
      } else {
        setIsSaved(true);
      }
    }

    setAccountInfo(info);
  };

  const accountForm = (formType: IAccountKeys, key: number) => (
    <div className="flex flex-col xs:flex-row xs:items-center my-8" key={`k_${key * key}`}>
      <p className="mr-8 min-w-[150px] mb-4 xs:mb-0 xs:text-right whitespace-nowrap">
        {accountInfo[formType].label}
      </p>
      <div className="relative w-full">
        <Input
          placeholder={accountInfo[formType].label}
          onChange={(e: ChangeEvent<HTMLInputElement>) => handleChange(e, formType)}
          type={`${formType.includes('Pwd') && 'password'}`}
        />
        <p className="absolute -bottom-6 text-xs text-primary w-full overflow-ellipsis overflow-hidden whitespace-nowrap">
          {
            accountInfo[formType].error && accountInfo[formType].error
          }
        </p>
      </div>
    </div>
  );

  return (
    <div>
      {
        Object.entries(accountInfo).map((info: IAccountKeys[], key) => info[0] && accountForm(info[0], key))
      }
      <div className={`flex items-center ${isSaved ? 'justify-between' : 'justify-end'}`}>
        {
          isSaved && (
            <p className="text-black text-sm text-gray-spec">
              The changes have been saved successfully!
            </p>
          )
        }
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
};

export { AccountSetting };
