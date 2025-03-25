import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { projects, usageLogs } from '@/lib/db/schema';
import { decrypt } from '@/lib/encryption';
import { eq } from 'drizzle-orm';

export async function POST(req: NextRequest) {
  try {
    // Get API key from Authorization header
    const apiKey = req.headers.get('Authorization')?.replace('Bearer ', '');

    if (!apiKey) {
      return NextResponse.json({ error: 'API key is required' }, { status: 401 });
    }

    // Find project by API key
    const project = await db.query.projects.findFirst({
      where: eq(projects.apiKey, apiKey),
    });

    if (!project) {
      return NextResponse.json({ error: 'Invalid API key' }, { status: 401 });
    }

    // Get the URL to scrape from the request body
    const { url } = await req.json();

    if (!url) {
      return NextResponse.json({ error: 'URL is required' }, { status: 400 });
    }

    // Start tracking usage
    const startTime = Date.now();
    let success = false;
    let responseData = null;

    try {
      // Decrypt the Gemini API key
      const geminiApiKey = decrypt(project.geminiApiKey);

      // Log that we got the API key (masked for security)
      console.log(`Using Gemini API key: ${geminiApiKey.substring(0, 4)}****`);

      // In a real application, you would implement actual scraping logic here
      // using r.jina.ai and Gemini API with the decrypted key: geminiApiKey

      // Mock response for now
      responseData = {
        url,
        content: "Sample scraped content",
        metadata: {
          title: "Sample page title",
          timestamp: new Date().toISOString()
        }
      };

      success = true;
    } catch (error) {
      console.error('Scraping error:', error);
      return NextResponse.json({ error: 'Failed to scrape URL' }, { status: 500 });
    } finally {
      // Record usage
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      await db.insert(usageLogs).values({
        projectId: project.id,
        url,
        success,
        responseTime,
      });
    }

    return NextResponse.json(responseData);

  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}