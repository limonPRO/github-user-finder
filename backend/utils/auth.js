import jwt from "jsonwebtoken";

const jwtSecret = "mySecret";

export const getToken = (userObject) => {
  const user = {
    _id: userObject?._id,
    firstName: userObject?.firstName,
    lastName: userObject?.lastName,
    email: userObject?.email,
  };
  return jwt.sign(user, jwtSecret);
};

export const getUserFromToken = (token) => {
  if (!token) {
    return null;
  }
  return jwt.verify(token, jwtSecret);
};
