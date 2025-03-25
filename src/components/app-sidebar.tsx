'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
} from '@/components/ui/sidebar';
import { Home, Settings, BarChart, Database, FileText, LogOut } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { ThemeToggle } from '@/components/theme-toggle';

export function AppSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader className="px-6 py-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">AI Scraper</h1>
          <ThemeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={pathname === '/dashboard'} asChild>
                <Link href="/dashboard" className="flex items-center gap-3">
                  <Home className="w-5 h-5" />
                  Dashboard
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={pathname === '/dashboard/projects'} asChild>
                <Link href="/dashboard/projects" className="flex items-center gap-3">
                  <FileText className="w-5 h-5" />
                  Projects
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={pathname === '/dashboard/data'} asChild>
                <Link href="/dashboard/data" className="flex items-center gap-3">
                  <Database className="w-5 h-5" />
                  Data
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={pathname === '/dashboard/analytics'} asChild>
                <Link href="/dashboard/analytics" className="flex items-center gap-3">
                  <BarChart className="w-5 h-5" />
                  Analytics
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        <Separator className="my-4" />

        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton isActive={pathname === '/dashboard/settings'} asChild>
                <Link href="/dashboard/settings" className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  Settings
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4 border-t">
        <Link
          href="/dashboard/profile"
          className={`flex items-center ${pathname === '/dashboard/profile' ? '' : ''}`}
        >
          <Avatar className="h-9 w-9">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                width={36}
                height={36}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gray-200 text-gray-600">
                {session?.user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
            )}
          </Avatar>
          <div className="ml-3 flex-1">
            <p className="text-sm font-medium">{session?.user?.name || session?.user?.email}</p>
          </div>
        </Link>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 w-full flex items-center justify-center"
          onClick={() => router.push('/auth/signout')}
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sign Out
        </Button>
      </SidebarFooter>
    </Sidebar>
  );
}
