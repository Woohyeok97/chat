import { atom } from 'recoil';

export interface UserStateType {
  name: '플라워1' | '플라워2' | '플라워3';
}
export const userState = atom<UserStateType>({
  key: 'userState',
  default: {
    name: '플라워1',
  },
});
