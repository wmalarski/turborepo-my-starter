import type { Session, User } from "./types";

export const getUser = (session: Session): Promise<User> => {
  return Promise.resolve({
    email: "email",
    id: "id",
    session,
  });
};
