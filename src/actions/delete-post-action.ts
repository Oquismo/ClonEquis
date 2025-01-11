

'use server'

import { createServerActionClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function deletePost(id: string): Promise<void> {
  const supabase = createServerActionClient({ cookies });
  const { error } = await supabase.from('posts').delete().eq('id', id);

  if (error) {
    throw new Error('Error al eliminar el post');
  }
}