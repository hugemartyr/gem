"use server";

import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

export async function uploadImageAction(formData: FormData) {
  const file = formData.get("file") as File;
  if (!file) return null;

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const uploadDir = join(process.cwd(), "public", "uploads");
  await mkdir(uploadDir, { recursive: true });

  // Create a clean filename
  const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
  const path = join(uploadDir, filename);

  await writeFile(path, buffer);

  // Return the path that the browser can use
  return `/uploads/${filename}`;
}
