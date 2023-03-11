export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
  user?: User;
}


export interface User {
  id: number;
  name: string;
  username: string;
  website: string;
  company: {
    name: string;
  }
}