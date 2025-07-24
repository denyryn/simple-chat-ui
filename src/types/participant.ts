export interface Participant {
  id: string;
  name: string;
  role: 0 | 1 | 2; // 0: admin, 1: agent, 2: customer
}
