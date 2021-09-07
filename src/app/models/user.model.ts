export interface user {
  email: string;
  password: string;
  id?: string;
}
export class User {
  constructor(
    public email: string,
    public password: string,
    public id?: string
  ) {}
}
