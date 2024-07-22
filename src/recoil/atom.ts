import { atomFamily } from 'recoil';

export interface ChatStateType {
  name: string;
  text: string;
}
export const chatStateFamily = atomFamily<ChatStateType[], string>({
  key: 'chatStateFamily ',
  default: [],
});
