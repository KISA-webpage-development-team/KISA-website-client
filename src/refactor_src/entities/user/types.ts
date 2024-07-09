// Declare Types for User Entity (not props!)

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
