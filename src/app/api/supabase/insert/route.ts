import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  'https://kxzjxqtbievffsoxdeij.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imt4emp4cXRiaWV2ZmZzb3hkZWlqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMzE3MDgxNywiZXhwIjoyMDE4NzQ2ODE3fQ.-bef-Fs-4gEN_oRDm5VIWMaRybVsu82OOTj3X6jEqLU'
);
export async function POST(req: Request) {
  const { body, table } = await req.json();
  const { error, data } = await supabase.from(table).insert(body).select('*');
  return NextResponse.json({ error, data });
}
