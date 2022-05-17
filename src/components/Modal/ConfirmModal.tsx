import React from 'react';

import { XCircleIcon } from '@heroicons/react/outline';
import Button from '../common/Button';
import Modal from './index';

interface ComrexModalProps {
  isOpen: boolean;
  type: string;
  onSubmit?: any;
  onClose?: any;
}

const ConfirmModal = ({
  isOpen,
  type,
  onSubmit,
  onClose,
}: ComrexModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={ onClose}>
      <div className="bg-white inline-block w-[calc(100%-30px)] sm:w-full max-w-md  overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl px-6 py-12 font-regularHN">
          <button className="absolute right-3 top-3 font-xs" onClick={() => onClose()}>
              <XCircleIcon className="h-8 w-8"/>
          </button>
        <div className="flex flex-col py-4 my-4">
          <h3 className="sm:px-10 text-2xl leading-8 font-semibold text-black text-center">
            {`Are you sure you want to ${(type === 'edit'|| type === 'codec') ? 'update' : 'remove'} ${type === 'codec' ? 'the Codec?' : 'the moderator?'}`}
          </h3>
        </div>
        <div className="flex justify-center sm:px-4 py-3 sm:px-6 sm:flex">
          <Button
            onClick={() => onSubmit()}
            type="button"
            label="Confirm"
            className="mr-1 border-transparent bg-success hover:bg-successHover text-white px-6"
          />
          <Button
            onClick={onClose}
            type="button"
            label="Cancel"
            className="ml-1 border-transparent bg-danger hover:bg-dangerHover text-white sm:mt-0 px-7"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
