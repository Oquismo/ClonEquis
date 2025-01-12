import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase URL or Key');
}

export const supabase = createClient(supabaseUrl, supabaseKey);

// Function to insert a new user
export async function insertUser(name: string, email: string) {
  const { data, error } = await supabase
    .from('users')
    .insert([{ name, email }]);

  if (error) {
    console.error('Error inserting user:', error);
    throw error;
  }

  return data;
}