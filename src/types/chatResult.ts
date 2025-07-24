import type { Room } from "./room";
import type { Comment } from "./comment";

export interface ChatResult {
  room: Room;
  comments: Comment[];
}
