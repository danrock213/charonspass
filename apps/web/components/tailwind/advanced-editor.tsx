'use client';

import { defaultEditorContent } from '@/lib/content';
import { useEffect, useState } from 'react';
import { useDebouncedCallback } from 'use-debounce';

// If you have a specific type for editor content, replace `any` with it.
const TailwindAdvancedEditor = () => {
  const [initialContent, setInitialContent] = useState<any | null>(null);
  const [saveStatus, setSaveStatus] = useState('Saved');
  const [charsCount, setCharsCount] = useState<number | undefined>();

  const debouncedUpdates = useDebouncedCallback(async (content: any) => {
    // Placeholder for future saving logic
    setSaveStatus('Saved');
  }, 500);

  useEffect(() => {
    const content = window.localStorage.getItem('novel-content');
    if (content) setInitialContent(JSON.parse(content));
    else setInitialContent(defaultEditorContent);
  }, []);

  if (!initialContent) return null;

  return (
    <div className="relative w-full max-w-screen-lg border p-6 rounded-lg shadow bg-white dark:bg-background">
      <div className="flex absolute right-5 top-5 z-10 mb-5 gap-2">
        <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">{saveStatus}</div>
        {charsCount && (
          <div className="rounded-lg bg-accent px-2 py-1 text-sm text-muted-foreground">{charsCount} Words</div>
        )}
      </div>

      <p className="text-muted-foreground italic">
        Editor component temporarily disabled while `novel` dependency is removed.
      </p>
    </div>
  );
};

export default TailwindAdvancedEditor;
