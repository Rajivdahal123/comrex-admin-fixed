import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
const Button = dynamic(() => import('../components/common/Button'));
const Input = dynamic(() => import('../components/common/Input'));
const AlertModal = dynamic(() => import('../components/Modal/AlertModal'));
import { useAuth } from '../context/authContext';
import unAuthLayout from '../layout/unAuthLayout';
import { ResetPasswordSchema } from '../utils/schemas';

const ResetPassword = () => {
  const [errors, setErrors] = useState<any>({});
  const [alertState, openAlert] = useState<boolean>(false);
  const { resetModeratorPass } = useAuth();

  const form = useFormik({
    initialValues: {
      password: '',
      confirm: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async(values) => {
      const result = await resetModeratorPass(values.password);
      if(result.success) {
        openAlert(true);
        window.open(process.env.GAGL_URL, '_blank');
      }
    }
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
          <div className="shadow rounded-lg max-w-[500px] w-full bg-white">
            <div className="py-14 px-8 sm:px-14 mt-5 bg-white shadow rounded-lg">
              <form onSubmit={form.handleSubmit}>
                <div className="mb-8">
                  <Input
                    placeholder="New Password"
                    type="password"
                    error={!!errors.password}
                    helperText={errors.password}
                    {...form.getFieldProps('password')}
                  />
                </div>
                <div className="mb-4">
                  <Input
                    placeholder="Confirm Password"
                    type="password"
                    error={!!errors.confirm}
                    helperText={errors.confirm}
                    {...form.getFieldProps('confirm')}
                  />
                </div>
                <div className="flex justify-center items-center mt-8 mb-4">
                  <Button
                    type="submit"
                    label="Save"
                    className="border-transparent bg-primary hover:bg-primaryHover text-white px-8"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <AlertModal
          title="Password reset successfully"
          message="Your password successfully has been reseted."
          isOpen={alertState}
          onClose={() => openAlert(false)}
        />
    </div>
  );
};

export default unAuthLayout(ResetPassword);
