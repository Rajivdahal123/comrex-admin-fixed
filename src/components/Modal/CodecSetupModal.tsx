import React, { useCallback, useEffect, useState } from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import { useFormik } from 'formik';
import Modal from './index';
import Input from '../common/Input';
import Button from '../common/Button';
import { CodeSchema } from '../../utils/schemas';
import { useAuth } from '../../context/authContext';
import Toastr from "../elements/Toastr";

interface CodecSetupModalProps {
    isOpen: boolean;
    onSubmit?: any;
    onClose?: any;
}

const initCodec = {
    codec_name: '',
    codec_ip: ''
}

const CodecSetupModal = ({isOpen, onClose, onSubmit }: CodecSetupModalProps) => {

    const { updateCodec, user } = useAuth();
    const [errors, setErrors] = useState<any>({});
    const [submitState, updateState] = useState<boolean>(false);


    const notify = React.useCallback((type: any, message: string) => {
        Toastr({ type, message });
    }, []);
    
    const form = useFormik({
        initialValues: initCodec,
        validationSchema: CodeSchema,
        onSubmit: async (values: any) => {
            
          updateState(true);
          if(user && user.id) {
              await updateCodec(values)
                .then((res: any) => {
                    if(res && res.success) {
                        onSubmit(res.message);
                        updateState(false);
                    }
                })
                .catch((err: any) => {
                    const { message } = err.response.data;
                    if (message.includes('name')) {
                        form.setErrors({codec_name: message});
                    } else if (message.includes('username')) {
                        form.setErrors({codec_ip: message});
                    } else {
                        onClose();
                        notify('warning', message);
                    } 
                })
          }
        },
    });

    const doSubmit = (e: any) => {
        e.preventDefault();
        form.handleSubmit();
        updateState(true);
    }

    const closeModal = useCallback(() => {
        updateState(false)
        onClose();
    }, []);

    useEffect(() => {
        if(user && user.id) {
            form.setValues({
                codec_name: user.codec_name || '',
                codec_ip: user.codec_ip || '',
              })
        }
    }, [user]);

    useEffect(() => {
        setErrors(form.errors)
    }, [form.errors]);
    
    useEffect(() => {
        setErrors({});
        updateState(false);
    }, [])

    return (
        <Modal isOpen={isOpen} onClose={() => {}}>
        <div className="bg-white inline-block w-[calc(100%-30px)] sm:w-full max-w-md  overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl p-6">
          <button className="absolute right-3 top-3 font-xs" onClick={() => closeModal()}>
                <XCircleIcon className="h-8 w-8"/>
            </button>
          <div className="flex pt-6 sm:px-7 my-4">
            <div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
              <h3
                className="text-lg leading-6 font-semibold text-gray-900"
                id="modal-title"
              >
                Setup Codec
              </h3>
              <div className="mt-2">
              <form onSubmit={(e) => doSubmit(e)}>
                <div className="mt-4">
                  <Input
                      placeholder="Codec Name"
                      type="text"
                      error={submitState ? !!errors.codec_name : false}
                      helperText={submitState ? errors.codec_name : ''}
                      {...form.getFieldProps('codec_name')}
                    />
                </div>
                <div className="mt-4">
                    <Input
                      placeholder="Codec IP Address"
                      type="text"
                      error={submitState ? !!errors.codec_ip : false}
                      helperText={submitState ? errors.codec_ip : ''}
                      {...form.getFieldProps('codec_ip')}
                    />
                </div>
                <div className="pt-6 pb-1 sm:flex sm:flex-row-reverse">
                  <Button
                    // @ts-ignore
                    type="updateState"
                    label="Save"
                    className="border-transparent bg-primary hover:bg-primaryHover text-white px-10"
                  />
                </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    )
}

export default CodecSetupModal;
