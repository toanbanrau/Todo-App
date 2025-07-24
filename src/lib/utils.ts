import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const checkThumbnail = (dataUrl: string) => {
  const img = new Image();
  img.src = dataUrl;
  return new Promise((resolve)=>{
    img.onerror = () => resolve(false);
    img.onload = () => resolve(true);
  });
};

export const successTodo = (todoCount: number, doneCount: number) => {
  if (todoCount === 0) return 0;
  return Math.floor((doneCount / todoCount) * 100);
};
