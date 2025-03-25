'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { SidebarInset, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@/components/ui/separator';
import { Spinner } from '@/components/ui/spinner';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function ProfilePage() {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
      });
    }
  }, [session]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Here you would typically call your API to update the user profile
    // For now, we'll just simulate a delay and update the session
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update the session with the new data
      await update({
        ...session,
        user: {
          ...session?.user,
          name: formData.name,
        },
      });

      // Show success message or notification here
    } catch (error) {
      console.error('Failed to update profile', error);
      // Show error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b bg-background px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-xl font-semibold">Profile</h1>
      </header>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Your Photo</CardTitle>
              <CardDescription>This is your public profile photo</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative h-40 w-40 rounded-full overflow-hidden border mb-4">
                {session?.user?.image ? (
                  <Image
                    src={session.user.image}
                    alt={session.user.name || 'User'}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600 text-4xl font-semibold">
                    {session?.user?.name?.[0] || session?.user?.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              <Button variant="outline" disabled>
                Change Photo
              </Button>
              <p className="text-xs text-muted-foreground mt-2">
                Photo from your authentication provider
              </p>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    value={formData.email}
                    disabled
                    placeholder="Your email address"
                  />
                  <p className="text-xs text-muted-foreground">
                    Email address cannot be changed (managed by your authentication provider)
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Spinner size="sm" className="mr-2" /> Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>

          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
              <CardDescription>Manage your account preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Your account is managed through your authentication provider. You can adjust account
                settings like password and security through your provider.
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="outline" onClick={() => router.push('/auth/signout')}>
                Sign Out
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </SidebarInset>
  );
}
