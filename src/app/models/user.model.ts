export interface User {
  email: string;
  password: string;
  name: string;
  _id?: string;
}

export interface UserLoginData {
  email: string;
  password: string;
}
