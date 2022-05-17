import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
const Button = dynamic(() => import('../components/common/Button'));
const CustomInput = dynamic(() => import('../components/common/CustomInput'));
const ProfileImage = dynamic(() => import('../components/elements/ProfileImage'));
import Toastr from '../components/elements/Toastr';
import { useAuth } from '../context/authContext';
import withLayout from '../layout/adminLayout';
import { ProfileSchema } from '../utils/schemas';

const initialProfileValues = {
  username: '',
  firstName: '',
  lastName: '',
  email: '',
  avatar: '',
};



const ProfilePage = () => {
  const { updateUser, user } = useAuth();
  const [errors, setErrors] = useState<any>({});


  const notify = React.useCallback((type, message) => {
    Toastr({ type, message });
  }, []);

  const form = useFormik({
    initialValues: initialProfileValues,
    validationSchema: ProfileSchema,
    onSubmit: async (values) => {
      if (!errors.confirmError) {
        updateUser(values)
          .then(() => {
            notify('success', 'The changes have been saved successfully!');
          })
          .catch((err: any) => {
            if (err.response?.status !== 200) {
              if (err.response?.data?.message === 'EMAIL_ALREADY_EXISTS') {
                form.setErrors({
                  email: 'This email is already connected with a user account.',
                });
                notify('error', 'This email is already connected with a user account.');
              } else {
                form.setErrors({
                  email: 'Something went wrong, Please try again later...',
                });
                notify('error', 'Something went wrong, Please try again later...');
              }
            }
          });
      }
    },
  });

  useEffect(() => {
    if (user) {
      form.setValues({
        username: user.username,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        avatar: user.avatar,
      });
    }
  }, [user]);

  useEffect(() => {
    setErrors(form.errors);
  }, [form.errors]);

  useEffect(() => {
    setErrors({ ...errors, emailExists: null });
  }, [form.getFieldProps('email').value]);

  const onChangeProfileImage = (avatar: any) => {
    form.setValues({ ...form.values, avatar });
  };

  return (
    <div className="bg-background font-regularHN">
      <div className="dashboard-back opacity-70" />
      <div className="relative sm:w-4/5 max-w-[1024px] mx-6 sm:mx-auto mt-12">
        <h1 className="mb-4 text-2xl font-semibold text-left relative">Profile</h1>
        <div className="shadow rounded-xl bg-white py-10 px-6 sm:px-10">
          <form onSubmit={form.handleSubmit}>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-4/12 py-4 mr-0 md:mr-32 lg:mr-8">
                <ProfileImage
                  value={form.getFieldProps('avatar').value}
                  onChange={onChangeProfileImage}
                />
              </div>
              <div className="md:w-8/12 pt-3">
                <div className="mb-4 w-full">
                  <CustomInput
                    label="User Name:"
                    className="pl-0 sm:pl-24"
                    error={!!errors.username}
                    helperText={errors.username}
                    {...form.getFieldProps('username')}
                  />
                </div>
                <div className="mb-4 w-full">
                    <CustomInput
                      label="First Name:"
                      className="pl-0 sm:pl-24"
                      error={!!errors.firstName}
                      helperText={errors.firstName}
                      {...form.getFieldProps('firstName')}
                    />
                </div>
                <div className="mb-4 w-full">
                  <CustomInput
                      label="Last Name:"
                      className="pl-0 sm:pl-24"
                      error={!!errors.lastName}
                      helperText={errors.lastName}
                      {...form.getFieldProps('lastName')}
                    />
                </div>
                <div className="mb-4">
                  <CustomInput
                    label="Email:"
                    className="pl-0 sm:pl-24"
                    error={!!errors.email}
                    helperText={errors.email}
                    {...form.getFieldProps('email')}
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end items-center mt-4 mb-4">
              <Button
                type="submit"
                label="Save"
                className="border-transparent bg-primary hover:bg-primaryHover text-md font-medium text-white px-10"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default withLayout(ProfilePage);
