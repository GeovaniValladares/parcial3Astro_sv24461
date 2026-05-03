import { loginUser } from "./auth/login";
import { logoutUser } from "./auth/logout";
import { registerUser } from "./auth/register";
import { adminUsers } from "./admin/users";

export const server = {
  auth: {
    loginUser,
    logoutUser,
    registerUser,
  },
  admin: adminUsers
};