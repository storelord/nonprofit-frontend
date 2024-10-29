import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Utility function to concatonate and override tailwinds class names
 * @param inputs
 * @returns
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns a random time-sortable string that can be used as a ID
 * @returns a string like "m22mh8ch5rxd5bjetj"
 */
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
