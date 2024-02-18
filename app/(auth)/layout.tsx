import { FC, ReactNode } from 'react';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return <div className='bg-slate-100 p-10 rounded-md w-max container mx-auto'>{children}</div>;
};

export default AuthLayout;
