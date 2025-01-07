import { cookies } from "next/headers";
import { createServerActionClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect } from 'react';

export function ComposePost({
  userAvatarUrl
}: {
  userAvatarUrl: string;
}) {
  const addPost = async (formData: FormData) => {
    'use server';
    const content = formData.get('content');

    if (content === null) return;

    const supabase = createServerActionClient({ cookies });

    const { data: { user } } = await supabase.auth.getUser();

    if (user === null) return;

    await supabase.from('posts').insert({ content, user_id: user.id });
  };

  const fetchData = async () => {
    try {
      const response = await fetch('/api/data', {
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      // Manejar los datos
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <form action={addPost} className="flex flex-1 flex-col gap-y-4">
      <div className="flex flex-1 flex-col gap-y-4">
        <img className="rounded-full w-12 h-12 object-contain" src={userAvatarUrl} alt="User Avatar" />
        <textarea name="content" placeholder="What's on your mind?" className="w-full p-2 border rounded"></textarea>
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Post</button>
      </div>
    </form>
  );
}