'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SignIn() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleProviderSignIn = async (provider: string) => {
    try {
      setIsLoading(true);
      await signIn(provider, { callbackUrl: '/dashboard' });
    } catch (error) {
      console.error('Authentication error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md mx-4">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Sign In</CardTitle>
          <CardDescription>Sign in to your AI Scraper account to continue</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
            onClick={() => handleProviderSignIn('github')}
            disabled={isLoading}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
              <path
                fill="currentColor"
                d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.165 6.839 9.489.5.09.682-.217.682-.48 0-.236-.008-.864-.013-1.695-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.022A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.29 2.747-1.022 2.747-1.022.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.933.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.577.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z"
              />
            </svg>
            <span>Sign in with GitHub</span>
          </Button>
          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2 py-6"
            onClick={() => handleProviderSignIn('google')}
            disabled={isLoading}
          >
            <svg viewBox="0 0 24 24" width="24" height="24" className="h-5 w-5">
              <path
                fill="currentColor"
                d="M12.545 12.151L12.542 12.07H6.643v2.287h3.404c-.17 1.462-1.715 2.318-3.404 2.318-2.099 0-3.815-1.729-3.815-3.919 0-2.187 1.716-3.924 3.815-3.924.961 0 1.954.368 2.674 1.088l1.664-1.664C9.985 7.282 8.38 6.744 6.643 6.744c-3.116 0-5.784 2.505-5.784 5.703 0 3.205 2.668 5.708 5.784 5.708 2.858 0 5.575-1.893 5.575-5.554 0-.163-.034-.333-.07-.451l-.002-.001z"
              />
              <path
                fill="currentColor"
                d="M23.8 12.118c0-.858-.069-1.467-.216-2.116h-6.034v1.857h3.442c-.074.486-.42 1.215-.946 1.708l-.002.002 1.848 1.433c1.099-1.017 1.732-2.514 1.732-4.883z"
              />
              <path
                fill="currentColor"
                d="M17.544 15.003 15.696 13.57c-.523.396-1.262.632-2.114.632a3.833 3.833 0 0 1-3.614-2.658l-.002-.005-1.897 1.459c.99 1.984 3.082 3.435 5.513 3.435.001 0 .002 0 .003 0 1.562 0 3.168-.568 4.306-1.624.01-.01.02-.02.03-.03l-.004-.001z"
              />
              <path
                fill="currentColor"
                d="M6.643 12.206c0-.642.119-1.253.327-1.81L5.068 8.93a6.55 6.55 0 0 0-.647 2.829c0 1.015.229 1.996.643 2.877l1.897-1.459-.001-.002a3.667 3.667 0 0 1-.315-1.818c-.004-.05-.002-.101-.002-.151z"
              />
            </svg>
            <span>Sign in with Google</span>
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center text-sm">
          <div className="text-center text-gray-500">
            By signing in, you agree to our Terms of Service and Privacy Policy.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
