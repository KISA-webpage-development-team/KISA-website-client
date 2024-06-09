// Props
export interface UserParamsPageProps {
  params: {
    email: string;
  };
}

// User data
export interface User {
  email: string;
  fullname: string;
  created: string;
  linkedin: string;
  major: string;
  bornDate: Number;
  bornMonth: Number;
  bornYear: Number;
  gradYear: Number;
}
