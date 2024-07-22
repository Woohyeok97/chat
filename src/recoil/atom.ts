// import { atom } from 'recoil';

// export interface ChatStateType {
//   roomId: string;
//   messageList: {
//     name: string;
//     text: string;
//   }[];
// }
// export const chatState = atom<ChatStateType[]>({
//   key: 'chatState',
//   default: [],
// });

import { atomFamily } from 'recoil';

export interface ChatStateType {
  name: string;
  text: string;
}
export const chatStateFamily = atomFamily<ChatStateType[], string>({
  key: 'chatStateFamily ',
  default: [],
});
