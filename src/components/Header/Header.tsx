import React, { Fragment, useCallback } from 'react';

import { Menu, Transition } from '@headlessui/react';

import { ChevronDownIcon } from '@heroicons/react/solid';
import router from 'next/router';
import { useAuth } from '../../context/authContext';
import { useModerator } from '../../context/moderatorContext';
import { fullName } from '../../utils';
import Avatar from '../common/Avatar';


function classNames(...classes: any) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const { logout, user } = useAuth();
  const { isLoading } = useModerator();

  const dashboardLink = useCallback(() => {
    router.push('/dashboard');
  }, []);

  const profileLink = useCallback(() => {
    router.push('/profile');
  }, []);

  const securityLink = useCallback(() => {
    router.push('/security');
  }, []);

  return (
    <div className="w-screen h-[75px] bg-primary font-regularHN">
      <div className="w-full h-full flex justify-left items-center p-4">
        <img src="/images/comrex_logo_white.png" alt="Comrex Logo" className="h-6 sm:h-8" />
        <img src="/images/gagl_white.png" alt="Gagl Logo" className="max-h-8 sm:max-h-14 -mt-1 ml-4" />
        <div className="flex-1" />
        <span className="hidden sm:block text-white mr-2 font-normal">
          {fullName(user) || 'Hi, User Name'}
        </span>
        <Menu as="div" className="relative inline-block text-left z-10">
          <div>
            <Menu.Button className="inline-flex justify-center w-full rounded-md shadow-sm px-4 py-2 text-sm font-medium text-gray-700">
              <Avatar
                src={user && user.avatar ? user.avatar : 'NO_IMAGE'}
                alt="Profile Avatar"
                user={user && user}
              />
              <ChevronDownIcon className="hidden sm:block text-white mt-3 -mr-1 ml-2 h-5 w-5" aria-hidden="true" />
            </Menu.Button>
          </div>

          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="origin-top-right absolute right-0 mt-7 w-56 rounded-sm shadow-lg bg-second focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <button type="button" onClick={dashboardLink} className={classNames(
                        active ? 'text-primary' : 'text-white',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}>
                        Dashboard
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                  <button type="button" onClick={profileLink} className={classNames(
                    active ? 'text-primary' : 'text-white',
                    'block w-full text-left px-4 py-2 text-sm '
                      )}>
                        Profile
                  </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                  <button type="button" onClick={securityLink} className={classNames(
                    active ? 'text-primary' : 'text-white',
                    'block w-full text-left px-4 py-2 text-sm '
                      )}>
                        Security
                  </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button
                      type="button"
                      onClick={logout}
                      className={classNames(
                        active ? 'text-primary' : 'text-white',
                        'block w-full text-left px-4 py-2 text-sm'
                      )}
                    >
                      Log out
                    </button>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
      <div className="relative w-full bg-second">
        <div className={isLoading ? 'w-full h-1.5 shim' : 'vw-full h-1.5'} />
      </div>
    </div>
  );
};


export default Header;
