export type TError = {
  data: {
    message: string;
    stack: string;
    success: boolean;
  };
  status: number;
};

export type TResponce = {
  data?: any;
  error?: TError;
};
