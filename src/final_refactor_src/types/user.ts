// Declare Types for User
// [NOTE] never includes props type here

interface SimpleUser {
  email: string;
  fullname: string;
  major: string;
  gradYear: number;
  linkedin?: string;
}

interface User extends SimpleUser {
  created: string;
  bornDate: number;
  bornMonth: number;
  bornYear: number;
}

export type { SimpleUser, User };
