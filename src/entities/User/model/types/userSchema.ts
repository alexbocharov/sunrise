export interface User {
  id: string;
  loginId?: string;
  username: string;
  accessToken?: string;
  avatar?: string;
  role?: string[];
  firstname?: string;
  lastname?: string;
  middlename?: string;
  email?: string;
  jobTitle?: string;
  position?: string;
  department?: string;
  businessUnit?: string;
  organization?: string;
  success?: boolean;
}

export interface UserSchema {
  authData?: User;
  _inited: boolean;
}
