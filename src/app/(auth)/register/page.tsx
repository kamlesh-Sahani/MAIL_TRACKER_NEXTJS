import React from 'react';
import RegisterForm from '@/components/client/RegisterForm';
const RegisterPage = () => {
  return (
    <div className="flex  justify-center h-full ">
      <div className="w-[610px] max-sm:w-full max-sm:p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-blue-500 mb-6">Sign up</h2>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
