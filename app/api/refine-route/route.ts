import { NextResponse } from 'next/server';
import { refinedHikeRoute } from '@/app/utils/openai';

export async function POST(request: Request) {
  console.log('Received request to refine route');

  const { description, route, feedback } = await request.json();

  if (!description || !route || !feedback) {
    console.error('Missing required data for route refinement');
    return NextResponse.json({ error: 'Description, route, and feedback are required' }, { status: 400 });
  }

  try {
    const refinedRoute = await refinedHikeRoute(description, route, feedback);
    console.log('Refined route:', refinedRoute);
    return NextResponse.json({ route: refinedRoute });
  } catch (error) {
    console.error('Error refining route:', error);
    return NextResponse.json({ error: 'Failed to refine route' }, { status: 500 });
  }
}
