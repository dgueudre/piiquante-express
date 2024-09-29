export type IJwtPayload = {
  userId: string;
};

export type IJwtFullPayload = {
  exp: number;
  iat: number;
} & IJwtPayload;

export type AuthPayload = {
  userId: string;
  token: string;
};

export * from './entities';
export * from './validations';
