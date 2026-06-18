const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const API_KEY = import.meta.env.VITE_CLOUDINARY_API_KEY as string;
const API_SECRET = import.meta.env.VITE_CLOUDINARY_API_SECRET as string;

async function sha1(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-1", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
}

async function generateSignature(params: Record<string, string>): Promise<string> {
  const sorted = Object.keys(params)
    .sort()
    .map((k) => `${k}=${params[k]}`)
    .join("&");
  return sha1(sorted + API_SECRET);
}

export async function uploadToCloudinary(
  file: File | Blob | string,
  folder = "portfolio"
): Promise<string> {
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const params: Record<string, string> = { folder, timestamp };
  const signature = await generateSignature(params);

  const formData = new FormData();
  formData.append("api_key", API_KEY);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);
  formData.append("folder", folder);

  if (typeof file === "string") {
    // URL — fetch and upload
    const res = await fetch(file);
    const blob = await res.blob();
    formData.append("file", blob);
  } else {
    formData.append("file", file);
  }

  const res = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
    { method: "POST", body: formData }
  );

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error?.message ?? "Cloudinary upload failed");
  }

  const data = await res.json();
  return data.secure_url as string;
}
