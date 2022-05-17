import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';

const Button = dynamic(() => import('../components/common/Button'));
const Input = dynamic(() => import('../components/common/Input'));
const ForgotPassConfirmModal = dynamic(() => import("../components/Modal/ForgotPassConfirmModal"));
import { useAuth } from '../context/authContext';
import unAuthLayout from '../layout/unAuthLayout';
import { ForgotPasswordSchema } from '../utils/schemas';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const [errors, setErrors] = useState<any>({});
  const [alertState, openAlert] = useState<boolean>(false);

  const onSubmit = (values: any) => {
    forgotPassword(values.email)
        .then(() => {
          openAlert(true);
        })
        .catch(() => {
          setErrors({
            credential: 'The email or password you entered is incorrect.',
          });
        });
  };

  const form = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: ForgotPasswordSchema,
    onSubmit,
  });

  useEffect(() => {
    setErrors(form.errors);
  }, [form.errors]);

  return (
    <div className="h-2/4">
      <div className="h-full flex justify-center items-center bg-primary">
        <div className="absolute max-w-[500px] w-[calc(100%-30px)] sm:w-full top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
          <div className="w-full flex justify-between items-center">
            <img src="/images/comrex_logo_blue.png" alt="Comrex Logo" className="h-8 mt-2"/>
            <img src="/images/gagl.png" alt="Gagl Logo" className="h-10 sm:h-16"/>
          </div>
          <div className="py-14 px-8 sm:px-14 mt-5 bg-white shadow rounded-lg">
            <form onSubmit={form.handleSubmit}>
              <div className="mb-4">
                <Input
                  placeholder="Email"
                  error={!!errors.email}
                  helperText={errors.email}
                  {...form.getFieldProps('email')}
                />
              </div>
              <div className="flex justify-center items-center mt-8 mb-4">
                <Button
                  type="submit"
                  label="Submit"
                  className="border-transparent bg-primary hover:bg-primaryHover text-white px-10"
                />
              </div>
            </form>
          </div>
          <div className="flex justify-center mt-3">
            <Link href="/login">
              <div className="text-white cursor-pointer underline">
                Sign in
              </div>
            </Link>
          </div>
        </div>
      </div>
      <ForgotPassConfirmModal isOpen={alertState} onClose={() => openAlert(false)} />
    </div>
  );
};

export default unAuthLayout(ForgotPassword);
