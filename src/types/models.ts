export interface IUser {
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isOwner?: boolean;
  compare(enteredPassword: string, dbPassword: string): boolean;
}