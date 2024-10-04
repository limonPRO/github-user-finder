import { UserService } from "../services/index.js";


//  register user
export const userRegister = async (req, res) => {
  const respone = await UserService.sendVerificationEmail(req?.body);
  res.status(respone?.code).send(respone);
};

// Verify email and register user
export const verifyEmailAndRegisterUser = async (req, res) => {
  const { token } = req.query;
  const response = await UserService.verifyAndRegisterUser(token);
  res.status(response.code).send(response);
};

//login user
export const userLogin = async (req, res) => {
  const respone = await UserService.loginUser(req?.body);
  res.status(respone?.code).cookie("token", respone?.token).send(respone);
};


//get profile
export const getProfile = async (req, res) => {
  const id = req?.params?.id;
  const respone = await UserService.getProfile(id);
  res.status(respone?.code).send(respone);
};