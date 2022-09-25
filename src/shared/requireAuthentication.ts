import { getSession } from "next-auth/react";

export const requireAuthentication = (context: any, cb: Function) => {
  const session = getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/connect-wallet",
        permanent: false,
      },
    };
  }
  return cb({ session });
};
