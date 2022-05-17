import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../../context/authContext';
import unAuthLayout from '../../layout/unAuthLayout';

const Verification = () => {
  const { verification } = useAuth();
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      verification();
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
                  <p className="text-xl">Verifying your email...</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default unAuthLayout(Verification);
