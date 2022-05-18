import React, { useEffect, useState } from 'react';

import { useFormik } from 'formik';
import Link from 'next/link';
import router from 'next/router';

import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import { useAuth } from '../../context/authContext';
import unAuthLayout from '../../layout/unAuthLayout';
import { ResetPasswordSchema } from '../../utils/schemas';
import { fromPairs } from 'lodash';

const ResetPassword = () => {
  const { resetPassword,login } = useAuth();
  const [errors, setErrors] = useState<any>({});

  const onSubmit = (values: any) => {
    console.log("inside onsubmit",values)
    resetPassword(values.password)
    .then(resp => {
      login(resp.email,values.password)
    }).catch(() => {
      setErrors({
        credential: 'The email or password you entered is incorrect.',
      });
    });
  };

  const form = useFormik({
    initialValues: {
      password: '',
      confirm: '',
    },
    validationSchema: ResetPasswordSchema,
    onSubmit,
  });

  useEffect(() => {
    if (
      form.getFieldProps('password').value !==
      form.getFieldProps('confirm').value
    )
      form.setErrors({
        ...form.errors,
        confirm: 'The passwords do not match',
      });
  }, [form.getFieldProps('confirm')]);

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
            <div className="p-14 mt-5 bg-white shadow rounded-lg">
              <form onSubmit={form.handleSubmit}>
                <div className="mb-4">
                  <Input
                    label="New Password:"
                    type="password"
                    // error={!!errors.password}
                    //helperText={errors.password}
                    {...form.getFieldProps('password')}
                  />
                  {
                    console.log("errors is",errors,form.values)
                  }
                  {
                     errors.password ||form.values.password.split("").length<3
                    ?
                    <p style={{fontSize:"15px",color:"#1A4361"}}>Passwords must include at least six numbers, letters, and special characters (like ! and &)</p>
                    :null
                  }
                </div>
                <div className="mb-4">
                  <Input
                    label="Confirm Password:"
                    type="password"
                    error={!!errors.confirm}
                    helperText={errors.confirm}
                    {...form.getFieldProps('confirm')}
                  />
                </div>
                <div className="flex justify-between items-center mt-8 mb-4">
                  <Button type="submit" label="Save" className="px-8 bg-primary text-white" />
                  <Link href="/login">
                    <div className="text-blue-600 mr-4 cursor-pointer">Sign in</div>
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default unAuthLayout(ResetPassword);
