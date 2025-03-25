'use client';

import { useState, useEffect } from 'react';
import { notFound, useRouter, useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarInset } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Copy, Send, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Project {
  id: number;
  name: string;
  apiKey: string;
  createdAt: string;
  updatedAt: string;
}

export default function ProjectDetail() {
  // Get the params using useParams hook
  const params = useParams();
  const id = params.id as string;

  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [testUrl, setTestUrl] = useState('https://example.com');
  const [testResult, setTestResult] = useState<{
    loading: boolean;
    success?: boolean;
    data?: {
      url: string;
      content: string;
      metadata: {
        title: string;
        timestamp: string;
      };
    };
    error?: string;
  }>({ loading: false });

  useEffect(() => {
    const fetchProject = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/projects/${id}`);
        if (response.status === 404) {
          return notFound();
        }
        if (!response.ok) {
          throw new Error('Failed to fetch project details');
        }
        const data = await response.json();
        setProject(data);
      } catch (error) {
        console.error('Error fetching project:', error);
        setError('Failed to load project details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  const handleTestApiKey = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!project) return;

    setTestResult({ loading: true });

    try {
      const response = await fetch('/api/scrape', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${project.apiKey}`,
        },
        body: JSON.stringify({ url: testUrl }),
      });

      const data = await response.json();

      if (!response.ok) {
        setTestResult({
          loading: false,
          success: false,
          error: data.error || 'An error occurred during the test',
        });
        return;
      }

      setTestResult({
        loading: false,
        success: true,
        data,
      });
    } catch (error) {
      console.error('Test error:', error);
      setTestResult({
        loading: false,
        success: false,
        error: 'Failed to complete the test',
      });
    }
  };

  if (isLoading) {
    return (
      <SidebarInset>
        <div className="p-6">
          <p>Loading project details...</p>
        </div>
      </SidebarInset>
    );
  }

  if (error || !project) {
    return (
      <SidebarInset>
        <div className="p-6">
          <p className="text-destructive">{error || 'Project not found'}</p>
        </div>
      </SidebarInset>
    );
  }

  const exampleCode = `curl -X POST \\
  https://your-domain.com/api/scrape \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer ${project.apiKey}" \\
  -d '{"url": "https://example.com/page-to-scrape"}'`;

  return (
    <SidebarInset>
      <div className="flex flex-1 flex-col gap-6 p-6">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-medium">{project.name}</h2>
          <Button variant="outline" onClick={() => router.push('/dashboard/projects')}>
            Back to Projects
          </Button>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>API Key</CardTitle>
            <CardDescription>
              Use this API key to authenticate your scraping requests
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <code className="bg-muted px-4 py-2 rounded text-sm font-mono flex-1 overflow-x-auto">
                {project.apiKey}
              </code>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => copyToClipboard(project.apiKey)}
                className="ml-2"
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Test Your API Key</CardTitle>
            <CardDescription>Try a test request with your API key</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleTestApiKey} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="test-url">URL to scrape</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="test-url"
                    value={testUrl}
                    onChange={e => setTestUrl(e.target.value)}
                    placeholder="https://example.com"
                    className="flex-1"
                    required
                  />
                  <Button type="submit" disabled={testResult.loading}>
                    {testResult.loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Test API
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {testResult.success === true && (
                <div className="rounded-md bg-green-50 dark:bg-green-900/20 p-4 mt-4">
                  <div className="flex">
                    <div>
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-400">
                        Success! API key is working correctly
                      </h3>
                      <div className="mt-2 text-sm text-green-700 dark:text-green-300">
                        <pre className="overflow-auto p-2 bg-black/10 rounded">
                          {JSON.stringify(testResult.data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {testResult.success === false && (
                <div className="rounded-md bg-red-50 dark:bg-red-900/20 p-4 mt-4">
                  <div className="flex">
                    <div>
                      <h3 className="text-sm font-medium text-red-800 dark:text-red-400">
                        Error testing API key
                      </h3>
                      <div className="mt-2 text-sm text-red-700 dark:text-red-300">
                        <p>{testResult.error}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API Documentation</CardTitle>
            <CardDescription>Learn how to use the scraping API</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="text-base font-medium mb-2">Endpoint</h3>
              <code className="bg-muted px-4 py-2 rounded text-sm font-mono block">
                POST /api/scrape
              </code>
            </div>

            <div>
              <h3 className="text-base font-medium mb-2">Authentication</h3>
              <p className="text-sm mb-2">Include your API key in the Authorization header:</p>
              <code className="bg-muted px-4 py-2 rounded text-sm font-mono block">
                Authorization: Bearer {project.apiKey}
              </code>
            </div>

            <div>
              <h3 className="text-base font-medium mb-2">Request Body</h3>
              <code className="bg-muted px-4 py-2 rounded text-sm font-mono block whitespace-pre">
                {`{
  "url": "https://example.com/page-to-scrape"
}`}
              </code>
            </div>

            <div>
              <h3 className="text-base font-medium mb-2">Example Request</h3>
              <div className="relative">
                <pre className="bg-muted px-4 py-2 rounded text-sm font-mono overflow-x-auto">
                  {exampleCode}
                </pre>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => copyToClipboard(exampleCode)}
                  className="absolute top-2 right-2"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SidebarInset>
  );
}
