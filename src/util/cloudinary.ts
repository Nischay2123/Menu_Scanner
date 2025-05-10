import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";
import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
  });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});

// console.log(process.env.CLOUDINARY_CLOUD_NAME);

/**
 * Uploads a buffer to Cloudinary and returns the secure URL.
 * @param buffer - The file buffer to upload
 * @param folder - Folder name in Cloudinary
 * @param publicId - (Optional) Custom public ID
 * @returns Promise<string> - secure_url
 */
export const uploadBufferToCloudinary = (buffer: Buffer, folder: string, publicId?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: "image",
      },
      (error, result) => {
        if (error || !result) return reject(error || new Error("Upload failed"));
        resolve(result.secure_url);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};
