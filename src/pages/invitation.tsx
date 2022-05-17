import dynamic from 'next/dynamic';
import React, {useCallback, useEffect, useState} from 'react'
import { Formik } from 'formik';
import { useRouter } from "next/router";
const Button = dynamic(() =>  import('../components/common/Button'));
const Input = dynamic(() => import('../components/common/Input'));
const Spinner = dynamic(() => import('../components/common/Spinner'));
import { useModerator } from '../context/moderatorContext';
import { Moderator } from '../interfaces/moderator';
import unAuthLayout from '../layout/unAuthLayout'
import { ResetPasswordSchema } from '../utils/schemas';

const Invitation = () => {

    const { acceptInvitation, setupAccountPass, loading, setLoading } = useModerator();
    const [accepted, Accept] = useState<boolean>(false);
    const [restPass, setupPass] = useState<boolean>(false);
    const [moderator, setModerator] = useState<Moderator>();
    const [rejected, setReeject] = useState<boolean>(false);
    const [expire, setExpire] = useState<boolean>(false);
    const [submitState, submit] = useState<boolean>(false);

    const { query } = useRouter();

    const onSubmitPassword = useCallback(async (values: any) => {
        const result = await setupAccountPass(moderator?.id, values.password);
        if(result && result.success) {
            setupPass(true);
        }
    }, [query, moderator]);

    const accept = useCallback(async () => {
        
    }, []);

    const reject = useCallback(async () => {
        await acceptInvitation('Rejected')
        .then((resp: any) => {
            if (resp.success) {
                setReeject(true);
            }
        })
        .catch((err: any) => {
            setExpire(true);
        })
    }, []);

    const doAction = useCallback((e, props) => {
        e.preventDefault();
        submit(true);
        props.handleSubmit();
    }, []);

    useEffect(() => {
        if(query && query.token) {
            acceptInvitation('Active')
            .then((resp: any) => {
                if (resp.success) {
                    setLoading(false);
                    Accept(true);
                    setModerator(resp.moderator);
                }
            })
            .catch((err: any) => {
                setLoading(false);
                setExpire(true);
            })
        }
    }, [query])

    return (
        <div className="h-2/4 font-regularHN">
            <div className="h-full flex justify-center items-center bg-primary">
                <div className="absolute max-w-[500px] w-full top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
                    <div className="w-full flex justify-between items-center">
                        <img src="/images/comrex_logo_blue.png" alt="Comrex Logo" className="h-8 mt-2"/>
                        <img src="/images/gagl.png" alt="Gagl Logo" className="h-16"/>
                    </div>
                    <div className="p-10 mt-5 bg-white shadow rounded-lg min-h-[300px]">
                        <h1 className="text-3xl font-semibold text-center mb-4">
                            {moderator ?
                                <>
                                    {restPass ? 
                                        'You are all set!'
                                        :
                                        `Hi, ${moderator.firstName} ${moderator.lastName}`
                                    }
                                </>
                                :
                                'Welcome to Gagl Admin'
                            }
                        </h1>
                        {accepted ?
                            <>
                                {restPass ? 
                                    <>
                                        <div className="min-h-[167px]" />
                                        <div className="flex pb-1 justify-center items-center  sm:flex-center sm:flex-row-reverse">
                                            <Button
                                                type="button"
                                                label="Go to Gagl"
                                                className="border-transparent bg-second hover:bg-secondHover text-white"
                                                onClick={() => window.open(process.env.GAGL_URL, 'blank')}
                                            />
                                        </div>
                                    </>
                                    :
                                    <>
                                        <h3 className="text-lg font-normal">Please set your password to activate your account.</h3>
                                        <Formik enableReinitialize validationSchema={ResetPasswordSchema} initialValues={{ password: '', confirm: '' }} onSubmit={(values) => {
                                            onSubmitPassword(values);
                                        }}>
                                            {props => (
                                                <form onSubmit={(e) => doAction(e, props)}>
                                                    <div className="mt-4">
                                                        <Input
                                                            type="password"
                                                            placeholder="New Password"
                                                            error={submitState ? !!props.errors.password : false}
                                                            helperText={submitState ? props.errors.password : ''}
                                                            {...props.getFieldProps('password')}
                                                        />
                                                    </div>
                                                    <div className="mt-4">
                                                        <Input
                                                            type="password"
                                                            placeholder="Confirm Password"
                                                            error={submitState ? !!props.errors.confirm : false}
                                                            helperText={submitState ? props.errors.confirm : ''}
                                                            {...props.getFieldProps('confirm')}
                                                        />
                                                    </div>
                                                    <div className="pt-6 pb-1 sm:flex sm:flex-row-reverse">
                                                        <Button
                                                            type="submit"
                                                            label="Submit"
                                                            className="border-transparent bg-primary hover:bg-primaryHover text-white"
                                                        />
                                                    </div>
                                                </form>
                                            )}
                                        </Formik>
                                    </>    
                                }
                            </>
                            :
                            <div className="text-center mt-5">
                                {expire ? 
                                    <>
                                        <h3 className="text-xl font-bold">Your invitation token was expired.</h3>
                                        <h5>Please contact to Admin to resolve account issue.</h5>   
                                        <div className="min-h-[143px]" />
                                    </>
                                    :
                                    <>
                                        {/* <h3 className="text-xl font-bold">You are invited to join to Comrex.</h3>
                                        <h5>Your account will be Active after you accept invitation.</h5> */}
                                        <div className="flex justify-center items-center min-h-[100px] w-full">
                                            {loading && (
                                                <Spinner size={10}/>
                                            )}
                                        </div>
                                        {/* <div className="bg-gray-50 pb-1 sm:flex-between sm:flex-row-reverse">
                                            <Button
                                                type="button"
                                                label="Accept Invitation"
                                                className="border-transparent bg-success hover:bg-successHover text-white mr-1"
                                                onClick={() => accept()}
                                            />
                                            <Button
                                                type="button"
                                                label="Reject Invitation"
                                                onClick={() => reject()}
                                                className="border-transparent bg-danger hover:bg-dangerHover text-white ml-1"
                                            />
                                        </div> */}
                                    </>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>

    )
}

export default unAuthLayout(Invitation);