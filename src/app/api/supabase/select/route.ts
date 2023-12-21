import { createClient } from '@supabase/supabase-js';
import { NextApiResponse } from 'next';
import { NextResponse } from 'next/server';

export const supabase = createClient(
  'https://kxzjxqtbievffsoxdeij.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4emp4cXRiaWV2ZmZzb3hkZWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzE3MDgxNywiZXhwIjoyMDE4NzQ2ODE3fQ.-bef-Fs-4gEN_oRDm5VIWMaRybVsu82OOTj3X6jEqLU'
);
export async function POST(req: Request, res: NextApiResponse) {
  const { match = undefined, table } = await req.json();
  if (match) {
    const { error, data } = await supabase.from(table).select('*').match(match);
    return NextResponse.json({ error, data });
  } else {
    const { error, data } = await supabase.from(table).select('*');
    return NextResponse.json({ error, data });
  }
}
