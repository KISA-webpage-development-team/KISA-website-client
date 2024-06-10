// Props
export interface UserParamsPageProps {
  params: {
    email: string;
  };
}

// User data
export interface SimpleUser {
  major: string;
  gradYear: Number;
  linkedin: string;
}

export interface User extends SimpleUser {
  email: string;
  fullname: string;
  created: string;
  bornDate: Number;
  bornMonth: Number;
  bornYear: Number;
}
