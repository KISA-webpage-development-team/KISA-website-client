// Declare Types for User
// [NOTE] never includes props type here

interface SimpleUser {
  email: string;
  fullname: string;
  major: string;
  gradYear: Number;
  linkedin?: string;
}

interface User extends SimpleUser {
  created: string;
  bornDate: Number;
  bornMonth: Number;
  bornYear: Number;
}

export type { SimpleUser, User };
