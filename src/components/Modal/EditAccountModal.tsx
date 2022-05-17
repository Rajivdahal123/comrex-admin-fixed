import React, { useEffect, useState, useCallback } from 'react';
import { XCircleIcon } from '@heroicons/react/outline';
import { useFormik } from 'formik';
import { useModerator } from '../../context/moderatorContext';
import { Moderator } from '../../interfaces/moderator';
import { ModeratorSchema } from '../../utils/schemas';
import Button from '../common/Button';
import Input from '../common/Input';
import Toastr from "../elements/Toastr";
import Modal from './index';

interface EditAccountModalProps {
  isOpen: boolean;
  moderator?: Moderator;
  onSubmit?: any;
  onClose?: any;
}

const initModerator = {
  firstName: '',
  lastName: '',
  userName: '',
  email: '',
}

const EditAccountModal = ({
  isOpen,
  moderator,
  onSubmit,
  onClose,
}: EditAccountModalProps) => {

  const { createModerator, updateModerator } = useModerator();
  const [errors, setErrors] = useState<any>({});
  const [submitState, updateState] = useState<boolean>(false);

  const notify = React.useCallback((type, message) => {
    Toastr({ type, message });
  }, []);

  const form = useFormik({
    initialValues: initModerator,
    validationSchema: ModeratorSchema,
    onSubmit: async (values) => {
      console.log("values are",values)
      updateState(true);
      if(moderator && moderator.id) {
        console.log("inside first if if")
        await updateModerator({...values, id: moderator.id, status: moderator.status})
          .then((result: any) => {
            if(result && result.success) {
              onSubmit(result.message);
              updateState(false);
            }
          })
          .catch((error: any) => {
            console.log("error is",error)
            const { message } = error.response.data;
            if (message.includes('email')) {
              form.setErrors({email: message});
            } else if (message.includes('username')) {
              form.setErrors({userName: message});
            } else {
              onClose();
              notify('warning', message);
            }
          })
      } else {
        console.log("inside else")
        await createModerator({...values, status: 'Pending'})
          .then((result: any) => {
            console.log("inside then",result)
            if(result && result.success) {
              onSubmit(result.message);
              updateState(false);
            }
            else if(result.message==="This email is already connected with a user account!"){
              form.setErrors({email: result.message});
            }
            else{
              form.setErrors({userName: result.message});
            }
          })
          .catch((error: any) => {
            const { message } = error.response.data;
            console.log("inside catch and message is",message)
            if (message.includes('email')) {
              form.setErrors({email: message});
            } else if (message.includes('username')) {
              form.setErrors({userName: message});
            } else {
              onClose();
              notify('warning', message);
            }
          })
      }
    },
  });


  useEffect(() => {
    if(moderator && moderator.id) {
      form.setValues({
        firstName: moderator.firstName,
        lastName: moderator.lastName,
        email: moderator.email,
        userName: moderator.userName,
      })
    } else {
      form.setValues({
        firstName: '',
        lastName: '',
        email: '',
        userName: ''
      })
    }
  }, [moderator]);

  const doSubmit = (e: any) => {
    e.preventDefault();
    form.handleSubmit();
    updateState(true);
  };

  const closeModal = useCallback(() => {
    updateState(false);
    onClose();
  },[]);

  useEffect(() => {
    setErrors(form.errors)
  }, [form.errors]);

  useEffect(() => {
    setErrors({});
    updateState(false);
  }, [])

  // @ts-ignore
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
              {(moderator && moderator.id) ? "Edit Account" : "Create New Account"}
            </h3>
            <div className="mt-2">
            <form onSubmit={(e) => doSubmit(e)}>
              <div className="mt-4">
                <Input
                    placeholder="First Name"
                    type="text"
                    error={submitState ? !!errors.firstName : false}
                    helperText={submitState ? errors.firstName : ''}
                    {...form.getFieldProps('firstName')}
                  />
              </div>
              <div className="mt-4">
                  <Input
                    placeholder="Last Name"
                    type="text"
                    error={submitState ? !!errors.lastName : false}
                    helperText={submitState ? errors.lastName : ''}
                    {...form.getFieldProps('lastName')}
                  />
              </div>
              <div className="mt-4">
                  <Input
                    placeholder="User Name"
                    type="text"
                    error={submitState ? !!errors.userName : false}
                    helperText={submitState ? errors.userName : ''}
                    {...form.getFieldProps('userName')}
                  />
              </div>
              <div className="mt-4">
                  <Input
                    placeholder="Email"
                    type="email"
                    error={submitState ? !!errors.email : false}
                    helperText={submitState ? errors.email : ''}
                    {...form.getFieldProps('email')}
                  />
              </div>
              <div className="pt-6 pb-1 sm:flex sm:flex-row-reverse">
                <Button
                  // @ts-ignore
                  type="updateState"
                  label="save"
                  className="border-transparent bg-primary hover:bg-primaryHover text-white px-10"
                />
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EditAccountModal;
