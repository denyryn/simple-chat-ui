"use server";
import { cache } from "react";

export const fetchImageBase64 = cache(async (url: string): Promise<string> => {
  const res = await fetch(url);
  const arrayBuffer = await res.arrayBuffer();
  const contentType = res.headers.get("content-type") || "image/png";
  const base64 = Buffer.from(arrayBuffer).toString("base64");
  return `data:${contentType};base64,${base64}`;
});
