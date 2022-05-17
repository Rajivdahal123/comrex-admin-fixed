import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import Link from 'next/link';
const Button = dynamic(() => import('../components/common/Button'));
const Input = dynamic(() => import('../components/common/Input'));
const AlertModal = dynamic(() => import('../components/Modal/AlertModal'));
import { useAuth } from '../context/authContext';
import unAuthLayout from '../layout/unAuthLayout';
import { LoginSchema } from '../utils/schemas';

const LoginPage = () => {
  console.log("inside login page,page reloaded")
  const { login } = useAuth();
  const [errors, setErrors] = useState<any>({});
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onSubmit = async (values: any) => {
    console.log("value is",values)
    login(values.email, values.password)
    .then((resp:any)=>{
        console.log("inside then",resp)
    })
    .catch((err: any) => {
      if (err.response?.data?.message === 'Invalid License') {
        setIsOpen(true);
        return;
      }
      setErrors({
        credential: 'The email or password you entered is incorrect.',
      });
    });
  };

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit,
  });

  useEffect(() => {
    setErrors(form.errors);
  }, [form.errors]);

  return (
    <div className="h-2/4">
      <div className="h-full flex justify-center items-center bg-primary" />
      <div className="absolute max-w-[500px] w-[calc(100%-30px)] sm:w-full top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
        <div className="w-full flex justify-between items-center">
          <img src="/images/comrex_logo_blue.png" alt="Comrex Logo" className="h-8 mt-2"/>
          <img src="/images/gagl.png" alt="Gagl Logo" className="h-10 sm:h-16"/>
        </div>
        <div className="py-14 px-8 sm:px-14 mt-5 bg-white shadow rounded-lg">
          <form onSubmit={form.handleSubmit}>
            <div className="mb-8">
              <Input
                placeholder="Email"
                error={!!errors.email}
                helperText={errors.email}
                {...form.getFieldProps('email')}
              />
            </div>
            <div className="mb-4">
              <Input
                type="password"
                placeholder="Password"
                error={!!errors.password}
                helperText={errors.password}
                {...form.getFieldProps('password')}
              />
            </div>
            {errors.credential && (
              <div className="text-red-500">{errors.credential}</div>
            )}
            <div className="flex justify-center mt-8 mb-4">
              <Button
                // type="submit"
                onClick={form.handleSubmit}
                label="Sign in"
                className="border-transparent bg-primary hover:bg-primaryHover text-white px-10 font-regularHN font-medium"
              />
            </div>
          </form>
        </div>
        <div className="flex justify-center mt-3">
          <Link href="/forgot-password">
            <div className="text-white cursor-pointer underline">
              Forgot password?
            </div>
          </Link>
        </div>
      </div>
      <AlertModal
        title="Contact your administrator"
        message="Your account is not active. Please contact your admin."
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>

  );
};

export default unAuthLayout(LoginPage);
