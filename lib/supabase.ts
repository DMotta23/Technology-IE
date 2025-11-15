import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://itsapoockpvcqedyoywb.supabase.co';
// This key is safe to expose in a browser environment.
// See: https://supabase.com/docs/guides/auth/row-level-security
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml0c2Fwb29ja3B2Y3FlZHlveXdiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMwMjQyNzAsImV4cCI6MjA3ODYwMDI3MH0.DriKPg5I9iply8xzBWhfR3eGs0oCnuOL4tVQzAG7MBs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
