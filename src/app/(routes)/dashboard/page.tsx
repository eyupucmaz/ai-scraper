'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { SidebarInset } from '@/components/ui/sidebar';

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <SidebarInset>
      <div className="flex flex-1 flex-col gap-6 p-6">
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
              <Button variant="outline" onClick={() => router.push('/dashboard/profile')}>
                Manage Account
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
