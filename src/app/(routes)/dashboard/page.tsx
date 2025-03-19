'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Projects</CardTitle>
              <CardDescription>Manage your scraping projects</CardDescription>
            </CardHeader>
            <CardContent>
              <p>You don&apos;t have any projects yet.</p>
            </CardContent>
            <CardFooter>
              <Button>Create New Project</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Usage</CardTitle>
              <CardDescription>Monitor your API usage</CardDescription>
            </CardHeader>
            <CardContent>
              <p>No usage data available yet.</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline">View Details</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Account</CardTitle>
              <CardDescription>Manage your account settings</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Signed in as: {session?.user?.email}</p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => router.push('/auth/signout')}>
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
