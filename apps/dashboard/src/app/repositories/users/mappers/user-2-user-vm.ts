import { UserVM, RowActionUser } from '../model';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function User2UserVM(user: any): UserVM {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    status: user.status,
    role: user.role,
    options: {
      options: [
        {
          name: 'Editar',
          value: RowActionUser.update,
        },
        {
          name: 'Eliminar',
          value: RowActionUser.delete,
        },
      ],
    },
  };
}
