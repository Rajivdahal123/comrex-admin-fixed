import dynamic from 'next/dynamic';
import React, { useEffect, useState, useCallback } from 'react';
import { useFormik } from 'formik';
const Button  = dynamic(() => import('../components/common/Button'));
const CustomInput  = dynamic(() => import('../components/common/CustomInput'));
import Toastr from '../components/elements/Toastr';
import { useAuth } from '../context/authContext';
import withLayout from '../layout/adminLayout';
import { ResetPasswordSchema } from '../utils/schemas';

const initialPasswordValues = {
    password: '',
    confirm: '',
};

const Security = () => {
    const { updateUserPass, user } = useAuth();
    const [passwordErrors, setPasswordErrors] = useState<any>({});
    const [submitState, updateState] = useState<boolean>(false);

    const notify = React.useCallback((type, message) => {
        Toastr({ type, message });
    }, []);

    const formikPassword = useFormik({
        initialValues: initialPasswordValues,
        validationSchema: ResetPasswordSchema,
        onSubmit: async (values) => {},
    });

    const doSubmit = useCallback((e) => {
        e.preventDefault();
        updateState(true);
        if(!formikPassword.errors.confirm && !formikPassword.errors.password) {
            updateUserPass(user.id, formikPassword.values.password)
            .then(() => {
              notify('success', 'The password has been updated successfully.');
              updateState(false);
              formikPassword.setValues({password: '', confirm: ''})
            })
            .catch((err: any) => {
                notify('error', 'Something went wrong, please try again later.');
            });
        }
    }, [formikPassword])

    useEffect(() => {
        setPasswordErrors(formikPassword.errors);
    }, [formikPassword.errors]);

    useEffect(() => {
        updateState(false);
    }, [])

    return (
        <div className="bg-background font-regularHN">
            <div className="dashboard-back opacity-70" />
            <div className="relative sm:w-4/5 max-w-[1024px] mx-6 sm:mx-auto mt-12">
                <h1 className="mb-4 text-2xl font-semibold text-left relative">Security</h1>
                <div className="shadow min-h-[500px] rounded-xl bg-white py-10 px-6 sm:px-10">
                    <form onSubmit={(e) => doSubmit(e)}>
                        <div className="flex justify-center items-center flex-col lg:p-12">
                            <div className="w-full lg:w-6/12 mb-4 md:px-4">
                                <CustomInput
                                    type="password"
                                    label="Password:"
                                    className="pl-24"
                                    error={submitState ? !!passwordErrors.password : false}
                                    helperText={submitState ? passwordErrors.password : ''}
                                    {...formikPassword.getFieldProps('password')}
                                />
                            </div>
                            <div className="w-full lg:w-6/12 mb-4 md:px-4">
                                <CustomInput
                                    type="password"
                                    label="Confirm Password:"
                                    className="pl-36"
                                    error={submitState ? !!passwordErrors.confirm : false}
                                    helperText={submitState ? passwordErrors.confirm : ''}
                                    {...formikPassword.getFieldProps('confirm')}
                                />
                                {passwordErrors.confirmError && (
                                    <div className="text-red-500 text-sm">
                                        The passwords do not match
                                    </div>
                                )}
                            </div>
                            <div className="md:w-6/12 flex justify-end items-center mt-4 mb-4">
                                <Button
                                    type="submit"
                                    label="Submit"
                                    className="border-transparent bg-primary hover:bg-primaryHover text-white px-8"
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default withLayout(Security);
