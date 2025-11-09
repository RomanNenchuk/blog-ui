type User = {
  id: string;
  fullname: string;
  email: string;
};

type LoginPayload = {
  email: string;
  password: string;
};

type RegisterPayload = {
  email: string;
  fullname: string;
  password: string;
};
