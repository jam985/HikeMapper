import { NextResponse } from 'next/server';
import { generateHikeRoute } from '@/app/utils/openai';

export async function POST(request: Request) {
  console.log('Received request to generate route');

  const { description } = await request.json();

  if (!description) {
    console.error('No description provided');
    return NextResponse.json({ error: 'Description is required' }, { status: 400 });
  }

  try {
    const route = await generateHikeRoute(description);
    console.log('Generated route:', route);
    return NextResponse.json({ route });
  } catch (error) {
    console.error('Error generating route:', error);
    return NextResponse.json({ error: 'Failed to generate route' }, { status: 500 });
  }
}
