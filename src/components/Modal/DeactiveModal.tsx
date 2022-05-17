import React from 'react';

import { Moderator } from '../../interfaces/moderator';
import Button from '../common/Button';
import Modal from './index';

interface ComrexModalProps {
  isOpen: boolean;
  moderator?: Moderator;
  onSubmit?: any;
  onClose?: any;
}

const DeactiveModal = ({
  isOpen,
  moderator,
  onSubmit,
  onClose,
}: ComrexModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={ onClose}>
      <div className="inline-block w-[calc(100%-30px)] sm:w-full max-w-md  overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div className="flex p-6 my-4">
          <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <svg
              className="h-6 w-6 text-red-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <h3
              className="text-lg leading-6 font-semibold text-gray-900"
              id="modal-title"
            >
              Deactivate account
            </h3>
            <div className="mt-2">
              <div className="text-sm text-gray-700">
                Are you sure you want to deactivate &quot;
                <span className="font-semibold text-gray-900">
                  {moderator?.userName}
                </span>
                &quot; account? All of moderator data will be permanently removed.
                This action cannot be undone.
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <Button
            onClick={() => onSubmit(moderator?.id)}
            type="button"
            label="Deactivate"
            className="border-transparent bg-red-600 hover:bg-red-700 text-white"
          />
          <Button
            onClick={onClose}
            type="button"
            label="Cancel"
            className="border-gray-300 bg-white hover:bg-gray-50 text-gray-700 sm:mt-0"
          />
        </div>
      </div>
    </Modal>
  );
};

export default DeactiveModal;
