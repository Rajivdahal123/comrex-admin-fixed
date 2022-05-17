import React from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import { Formik } from 'formik';
import { ResetPasswordSchema } from '../../utils/schemas';
import Button from '../common/Button';

import Input from '../common/Input';
import Modal from './index';

interface RestPassModalProps {
  isOpen: boolean;
  onSubmit?: any;
  onClose?: any;
}

const ResetPassModal = ({
  isOpen,
  onSubmit,
  onClose,
}: RestPassModalProps) => {

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-white inline-block w-[calc(100%-30px)] sm:w-full max-w-md  overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl p-6">
        <button className="absolute right-3 top-3 font-xs" onClick={() => onClose()}>
            <XCircleIcon className="h-8 w-8"/>
        </button>
        <div className="flex pt-6 px-7 my-4">
          <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
            <h3
              className="text-lg leading-6 font-semibold text-gray-900"
              id="modal-title"
            >
              Change Password
            </h3>
            <div className="mt-2">
              <Formik enableReinitialize validationSchema={ResetPasswordSchema} initialValues={{password: '', confPass: ''}} onSubmit={(values) => {
                onSubmit(values);
              }}>
               {props => (
                 <form onSubmit={props.handleSubmit}>
                   <div className="mt-4">
                    <Input
                      placeholder="New Password"
                      type="password"
                      error={!!props.errors.password}
                      helperText={props.errors.password}
                      {...props.getFieldProps('password')}
                    />
                  </div>
                  <div className="mt-4">
                    <Input
                      placeholder="Confirm Password"
                      type="password"
                      error={!!props.errors.confPass}
                      helperText={props.errors.confPass}
                      {...props.getFieldProps('confPass')}
                    />
                  </div>
                    <div className="pt-6 pb-1 sm:flex justify-end">
                      <Button
                        type="submit"
                        label="Save"
                        className="border-transparent bg-primary hover:bg-primaryHover text-white p-8"
                      />
                    </div>
                 </form>
               )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ResetPassModal;
