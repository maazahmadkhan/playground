import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const splitByMaxLength = (str: string, maxLength: number) => {
  const items = str.split(",");
  const result = [];

  let current = "";

  for (const item of items) {
    // If adding this item (plus comma if needed) stays within limit
    const candidate = current ? `${current},${item}` : item;

    if (candidate.length <= maxLength) {
      current = candidate;
    } else {
      // Push current string and start a new one
      if (current) result.push(current);
      current = item;
    }
  }

  // Push the last group
  if (current) result.push(current);

  return result;
};
