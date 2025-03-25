import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { db } from '@/lib/db';
import { projects } from '@/lib/db/schema';
import { eq, and } from 'drizzle-orm';

// GET /api/projects/[id] - Get a single project by ID
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

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

    // Get the project for this user
    const project = await db.query.projects.findFirst({
      where: (projects, { eq, and }) =>
        and(
          eq(projects.id, parseInt(id)),
          eq(projects.userId, user.id)
        ),
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Don't return the geminiApiKey in the response for security
    const sanitizedProject = {
      id: project.id,
      name: project.name,
      apiKey: project.apiKey,
      createdAt: project.createdAt,
      updatedAt: project.updatedAt,
    };

    return NextResponse.json(sanitizedProject);

  } catch (error) {
    console.error('Error fetching project:', error);
    return NextResponse.json(
      { error: 'Failed to fetch project' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/[id] - Delete a project
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json({ error: 'Invalid project ID' }, { status: 400 });
    }

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

    // Check if project exists and belongs to the user
    const project = await db.query.projects.findFirst({
      where: (projects, { eq, and }) =>
        and(
          eq(projects.id, parseInt(id)),
          eq(projects.userId, user.id)
        ),
    });

    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Delete the project
    await db.delete(projects).where(
      and(
        eq(projects.id, parseInt(id)),
        eq(projects.userId, user.id)
      )
    );

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json(
      { error: 'Failed to delete project' },
      { status: 500 }
    );
  }
}