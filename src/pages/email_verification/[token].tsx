import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import unAuthLayout from '../../layout/unAuthLayout';
import Button from '../../components/common/Button';

const EmailVerification = () => {
  const { moderatorEmailVerify } = useAuth();
  const router = useRouter();
  const { token } = router.query;
  const [fail, setFail] = useState(false);
  const [verified, setVerify] = useState(false);

  const verify = useCallback(async () => {
    const result = await moderatorEmailVerify();
    if(!result.success) {
        setFail(true);
    } else {
        setVerify(true);
    }
  }, []);

  useEffect(() => {
    if (token) {
        verify();
    }
  }, [token]);

  return (
    <div className="h-2/4">
      <div className="h-full flex justify-center items-center bg-primary font-reqularHN">
        <div className="absolute max-w-[500px] w-full top-2/4 left-2/4 transform -translate-x-2/4 -translate-y-2/4">
          <div className="w-full flex justify-between items-center">
            <img src="/images/comrex_logo_blue.png" alt="Comrex Logo" className="h-8 mt-2"/>
            <img src="/images/gagl.png" alt="Gagl Logo" className="h-16"/>
          </div>
          <div className="shadow rounded-lg max-w-[500px] w-full bg-white">
            <div className="p-20 mt-5 bg-white shadow rounded-lg">
              <form>
                <div className="mb-4 text-center">
                  <p className="text-xl">
                      {!fail ? 
                        `${verified ? 'Successfully verified.' : 'Verifying your email...'}`
                        :
                        'Token has been expired.'
                     }
                      </p>
                </div>
                {verified && (
                    <div className="flex mt-4 pb-1 justify-center items-center  sm:flex-center sm:flex-row-reverse">
                        <Button
                            type="button"
                            label="Go to Gagl"
                            className="border-transparent bg-second hover:bg-secondHover text-white"
                            onClick={() => window.open(process.env.GAGL_URL, 'blank')}
                        />
                    </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default unAuthLayout(EmailVerification);
