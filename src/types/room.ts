import type { Participant } from "./participant";

export interface Room {
  name: string;
  id: number;
  image_url: string;
  participant: Participant[];
}
