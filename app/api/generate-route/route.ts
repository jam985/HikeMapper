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
    const { instructions, coordinates } = await generateHikeRoute(description);
    console.log('Generated route:', { instructions, coordinates });
    return NextResponse.json({ instructions, coordinates });
  } catch (error) {
    console.error('Error generating route:', error);
    return NextResponse.json({ error: 'Failed to generate route' }, { status: 500 });
  }
}
