import { UserItemVM } from '../model/user-item-vm';
import { User2UserVM } from './user-2-user-vm';

export function User2UserItemVM(user: any): UserItemVM {
  const userVM = User2UserVM(user);
  return {
    ...userVM,
  };
}
