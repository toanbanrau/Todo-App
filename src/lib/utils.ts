import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkThumbnail = (dataUrl: string) => {
  if (!dataUrl) return;
  if (dataUrl.startsWith("data:image")) return "image";
  if (dataUrl.startsWith("data:video")) return "video";
};