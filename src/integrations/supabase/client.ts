// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mndtebdctyppsfxpnpmo.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1uZHRlYmRjdHlwcHNmeHBucG1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU5NDE3MTIsImV4cCI6MjA2MTUxNzcxMn0.sWjJj4O9QMDuEcNIkK8ZRigf-pj_7ep5bhjEAfmUVzo";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);