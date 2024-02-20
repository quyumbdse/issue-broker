import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className='bg-slate-40 p-10 mt-40 rounded-md w-max container mx-auto'>{children}</div>;
};

export default AuthLayout;
