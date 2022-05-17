export interface User {
  id?: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  codec_name?: string;
  codec_ip?: string
}

export interface RegisterRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface UserFullData {
  id: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  avatar: File;
}
