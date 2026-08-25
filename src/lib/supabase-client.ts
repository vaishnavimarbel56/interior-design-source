import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  throw new Error(
    'Missing Supabase environment variables. Please check your .env file.'
  );
}

export const supabase = createClient<Database>(
  SUPABASE_URL,
  SUPABASE_ANON_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
);

// Auth helpers
export const getCurrentUser = async () => {
  const { data } = await supabase.auth.getSession();
  return data.session?.user || null;
};

export const getCurrentProfile = async () => {
  const user = await getCurrentUser();
  if (!user) return null;

  const { data } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return data;
};

export const isAdmin = async () => {
  const profile = await getCurrentProfile();
  return profile?.role === 'admin';
};
