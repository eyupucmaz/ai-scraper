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
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';

export default function Dashboard() {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-xl font-semibold">Dashboard</h1>
      </header>
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
