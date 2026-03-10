import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { prompt } = await request.json();
  
  // Simulate AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Mock GPT response
  const story = `Once upon a time, based on "${prompt}", a magical adventure began...`;
  
  return NextResponse.json({ story });
}
