import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://jtdcnxpcpvrnvwenuknz.supabase.co";
// we have activated row level security, so nobody can rewrite data, only read by this code, so it is safe to reveal it in the code :D.
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZGNueHBjcHZybnZ3ZW51a256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwODkyOTMsImV4cCI6MjAwNjY2NTI5M30.VfLAlUUmgaNZk_tu7oM3_-TbWBELbLsslGE6H5bGOGI`;
// const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0ZGNueHBjcHZybnZ3ZW51a256Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTEwODkyOTMsImV4cCI6MjAwNjY2NTI5M30.VfLAlUUmgaNZk_tu7oM3_-TbWBELbLsslGE6H5bGOGI`;
export const supabase = createClient(supabaseUrl, supabaseKey);
