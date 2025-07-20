import { SessionProvider } from 'next-auth/react';
import LoginForm from './ui/LoginForm';

export default function Page() {
  return (
    <SessionProvider>
      <div className='flex h-screen w-screen items-center justify-center bg-gray-50'>
        <LoginForm />
      </div>
    </SessionProvider>
  );
}
