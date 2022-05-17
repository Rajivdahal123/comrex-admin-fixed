import React from 'react';

import Modal from './index';

interface NotificationModalProps {
  isOpen: boolean;
  onClose?: any;
  text?: string;
  title?: string;
}

const NotificationModal = ({
  isOpen,
  onClose,
  text,
  title,
}: NotificationModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white inline-block w-[calc(100%-30px)] sm:w-full max-w-md  overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
        <div className="flex p-6 my-4">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <h3
              className="text-lg leading-6 font-semibold text-blue-700"
              id="modal-title"
            >
              {title}
            </h3>
            <div className="mt-2">
              <h4
                className="text-md leading-6 font-semibold text-gray-900"
                id="modal-title"
              >
                {text}
              </h4>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <button
            onClick={onClose}
            type="button"
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm"
          >
            Ok
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NotificationModal;
