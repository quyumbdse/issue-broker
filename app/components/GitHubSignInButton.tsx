import { FC, ReactNode } from 'react';
import { Button } from './ui/button';
import { signIn } from 'next-auth/react';

interface GitHubSignInButtonProps {
  children: ReactNode;
}
const GitHubSignInButton: FC<GitHubSignInButtonProps> = ({ children }) => {
  const loginWithGitHub = () => signIn("github", {callbackUrl:'https://issue-broker.vercel.app'});

  return (
    <Button onClick={loginWithGitHub} className='w-full'>
      {children}
    </Button>
  );
};

export default GitHubSignInButton;
