import React from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import Router from 'next/router';
import Button from "../common/Button";
import Modal from './index';

interface ComrexModalProps {
    isOpen: boolean;
    onClose?: any;
}

const ForgotPassConfirmModal = ({
                                    isOpen,
                                    onClose,
                                }: ComrexModalProps) => {
    const handleContinue = async () => {
        await Router.push('/dashboard');
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="bg-white inline-block w-[calc(100%-30px)] sm:w-full max-w-md  overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <button className="absolute right-3 top-3 font-xs" onClick={() => onClose()}>
                    <XCircleIcon className="h-8 w-8"/>
                </button>
                <div className="flex flex-col py-10 my-4">
                    <h3 className="text-2xl leading-8 font-semibold text-black text-center px-6">
                        Forgot Password
                    </h3>
                    <div className="w-8 h-1 bg-primary mx-auto mt-2" />
                    <div className="px-8 sm:px-0 sm:w-2/4 mx-auto leading-10 mt-6 text-base text-lightGray text-center">
                        You will receive an email to reset the password.
                    </div>
                    <div className="flex justify-center sm:px-4 py-3 sm:px-6 sm:flex">
                        <Button
                            onClick={handleContinue}
                            type="button"
                            label="Continue"
                            className="ml-1 border-transparent bg-success hover:bg-dangerHover text-white sm:mt-0 px-7"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default ForgotPassConfirmModal;
