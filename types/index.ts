// ====== USER PARAMS
export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
};

// ====== MYID PARAMS
export type CreateMyidParams = {
  userId: string;
  myid: {
    idTitle: string;
    idNumber: string;
    imageUrl: string;
  };
  path: string;
};

export type UpdateMyidParams = {
  userId: string;
  myid: {
    _id: string;
    idTitle: string;
    idNumber: string;
    imageUrl: string;
  };
  path: string;
};

export type DeleteMyidParams = {
  myidId: string;
  path: string;
};

export type GetAllMyidsParams = {
  query: string;
  userId: string;
  limit: number;
  page: number;
};

export type GetMyidByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

export type Myid = {
  _id: string;
  idTitle: string;
  idNumber: string;
  imageUrl: string;
  organizer: {
    _id: string;
    firstName: string;
    lastName: string;
  };
};

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string;
  key: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};
