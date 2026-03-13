import { createClient } from "@supabase/supabase-js";

let supabaseClient: any = null;

function getSupabase() {
  if (!supabaseClient) {
    const url = process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_KEY;
    if (!url || !key) {
      return null;
    }
    supabaseClient = createClient(url, key);
  }
  return supabaseClient;
}

export default async function handler(req: any, res: any) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, Authorization'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Basic authorization using the hardcoded credentials
  const authHeader = req.headers.authorization;
  if (!authHeader || authHeader !== 'Basic YWRtaW5AaG9tb2xvZ2FwbHVzLmNvbS5icjo3Njk4Mzk4KlJl') {
      return res.status(401).json({ error: "Unauthorized" });
  }

  const supabase = getSupabase();
  if (!supabase) {
    return res.status(500).json({ error: "Supabase not configured. Please set SUPABASE_URL and SUPABASE_KEY." });
  }

  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from("waitlist")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return res.status(200).json(data);
    } catch (err: any) {
      console.error('API Error:', err);
      return res.status(500).json({ error: "Failed to fetch leads", message: err.message });
    }
  }

  if (req.method === 'PATCH') {
    try {
      const { id, status, notes } = req.body;
      if (!id) {
        return res.status(400).json({ error: "Missing id" });
      }

      const updateData: any = {};
      if (status !== undefined) updateData.status = status;
      if (notes !== undefined) updateData.notes = notes;

      if (Object.keys(updateData).length === 0) {
        return res.status(400).json({ error: "No data to update" });
      }

      const { data, error } = await supabase
        .from("waitlist")
        .update(updateData)
        .eq("id", id)
        .select();

      if (error) throw error;
      return res.status(200).json(data[0]);
    } catch (err: any) {
      console.error('API Error:', err);
      return res.status(500).json({ error: "Failed to update lead", message: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
