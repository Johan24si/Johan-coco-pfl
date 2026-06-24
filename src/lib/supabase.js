import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://uahfxmxtpcskljboibjb.supabase.co";
const supabaseKey = "sb_publishable_zRkX3A6njyVRRMsLAS92IQ_prvFAzcG";

export const supabase = createClient(supabaseUrl, supabaseKey);
