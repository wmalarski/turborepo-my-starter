export type Session = {
  token: string;
};

export type User = {
  id: string;
  email: string;
  session: Session;
};
