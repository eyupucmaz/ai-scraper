import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { encrypt, generateApiKey } from '@/lib/encryption';

// POST /api/projects - Create a new project
export async function POST(req: NextRequest) {
  try {
    // Get current authenticated user
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { name, geminiApiKey } = await req.json();

    if (!name || !geminiApiKey) {
      return NextResponse.json(
        { error: 'Project name and Gemini API key are required' },
        { status: 400 }
      );
    }

    // Generate unique API key for this project
    const apiKey = generateApiKey();

    // Encrypt the Gemini API key before storing it
    const encryptedGeminiApiKey = encrypt(geminiApiKey);

    // Get user ID from email - assumes user exists
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, session.user!.email!),
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Create new project
    const newProject = await db.insert(projects).values({
      name,
      userId: user.id,
      apiKey,
      geminiApiKey: encryptedGeminiApiKey,
    }).returning();

    return NextResponse.json({
      id: newProject[0].id,
      name: newProject[0].name,
      apiKey: newProject[0].apiKey,
    }, { status: 201 });

  } catch (error) {
    console.error('Error creating project:', error);
    return NextResponse.json(
      { error: 'Failed to create project' },
      { status: 500 }
    );
  }
}

// GET /api/projects - Get all projects for the current user
export async function GET() {
  try {
    // Get current authenticated user
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user ID from email
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, session.user!.email!),
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Get all projects for this user
    const userProjects = await db.query.projects.findMany({
      where: (projects, { eq }) => eq(projects.userId, user.id),
      orderBy: (projects, { desc }) => [desc(projects.createdAt)],
    });

    // Don't return the geminiApiKey in the response for security
    const sanitizedProjects = userProjects.map(project => ({
      id: project.id,
      name: project.name,
      apiKey: project.apiKey,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    }));

    return NextResponse.json(sanitizedProjects);

  } catch (error) {
    console.error('Error fetching projects:', error);
    return NextResponse.json(
      { error: 'Failed to fetch projects' },
      { status: 500 }
    );
  }
}