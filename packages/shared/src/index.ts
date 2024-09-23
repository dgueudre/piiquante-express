export type User = {
  toto: string;
};

export type JwtPayload = {
  userId: string;
};

export type AuthPayload = {
  userId: string;
  token: string;
};
