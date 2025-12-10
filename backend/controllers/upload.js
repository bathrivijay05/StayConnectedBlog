import { config } from "dotenv";
import { supabase } from "../utils/supabaseClient.js";

config();

export const uploadImage = async (req, res) => {
  // Check if file was uploaded
  if (!req.file) {
    return res
      .status(400)
      .json({ error: "No file uploaded or invalid file type." });
  }

  const file = req.file;
  const fileName = `${Date.now()}-${file.originalname}`;

  try {
    // Upload to Supabase Storage
    // Make sure you create a bucket named 'images' in your Supabase dashboard
    const { data, error } = await supabase.storage
      .from("images")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
      });

    if (error) {
      throw error;
    }

    // Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from("images")
      .getPublicUrl(fileName);

    // Return the full public URL
    res.status(200).json(publicUrlData.publicUrl);
  } catch (err) {
    console.error("Supabase Upload Error:", err);
    res.status(500).json({ error: "Failed to upload image" });
  }
};
