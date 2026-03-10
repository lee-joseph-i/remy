'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function StoriesPage() {
  const [story, setStory] = useState('');
  const [loading, setLoading] = useState(false);

  const generateStory = async () => {
    setLoading(true);
    const response = await fetch('/api/agent', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: 'a brave knight' }),
    });
    const data = await response.json();
    setStory(data.story);
    setLoading(false);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold">AI Story Generator</h1>
      <Button onClick={generateStory} disabled={loading}>
        {loading ? 'Generating...' : 'Generate Story'}
      </Button>
      {story && (
        <div className="mt-4 max-w-2xl rounded-lg bg-gray-100 p-6">
          <p data-testid="story-output">{story}</p>
        </div>
      )}
    </main>
  );
}
