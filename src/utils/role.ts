import { Roles } from "../interfaces/user/user.interface";

export const verifyRole = (role: string): boolean => {
  return Object.values(Roles).includes(role as Roles);
};
