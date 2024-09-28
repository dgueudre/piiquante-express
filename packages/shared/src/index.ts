export type User = {
  toto: string;
};

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

export type ILoginForm = {
  email: string;
  password: string;
};

export interface ISauce {
  _id: string;
  userId: string;
  name: string;
  manufacturer: string;
  description: string;
  mainPepper: string;
  imageUrl: string;
  heat: number;
  likes: number;
  dislikes: number;
  usersLiked: string[];
  usersDisliked: string[];
}

export interface IUser {
  email: string;
  password: string;
}
