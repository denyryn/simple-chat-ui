export interface Comment {
  id: number;
  type: "text" | "image" | "video" | "pdf";
  message: string;
  sender: string;
}
