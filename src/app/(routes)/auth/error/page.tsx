'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      switch (errorParam) {
        case 'OAuthSignin':
          setError('Error during OAuth sign-in process.');
          break;
        case 'OAuthCallback':
          setError('Error during OAuth callback process.');
          break;
        case 'OAuthCreateAccount':
          setError('Error creating user account via OAuth.');
          break;
        case 'EmailCreateAccount':
          setError('Error creating user account via email.');
          break;
        case 'Callback':
          setError('Error during callback processing.');
          break;
        case 'AccessDenied':
          setError('Access denied. You may not have permission to access this resource.');
          break;
        case 'Configuration':
          setError('There is a problem with the server configuration.');
          break;
        default:
          setError('An unknown authentication error occurred.');
          break;
      }
    } else {
      setError('An unknown authentication error occurred.');
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-red-600">Authentication Error</CardTitle>
          <CardDescription>There was a problem with your authentication</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-4">{error}</p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push('/auth/signin')}>Back to Sign In</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
