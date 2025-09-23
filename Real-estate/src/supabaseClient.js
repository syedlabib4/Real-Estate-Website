// src/supabaseClient.js
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://lmqgqjcitneyoebbsmpe.supabase.co"; 
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxtcWdxamNpdG5leW9lYmJzbXBlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg2MzgyOTUsImV4cCI6MjA3NDIxNDI5NX0.cFGCeFW1ZfYfG-Nld7L6klPif_TAPGvUFjVFveIaVfw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
