import { GithubService } from "../services/index.js";


export const getAllGithubUsers = async (req, res) => {
  try {

    const { page, limit, username } = req?.query;

    const respone = await GithubService.searchGitHubUser(username, +page, +limit);

    res.status(respone?.code).send(respone);
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error?.message,
      data: [],
      count: 0,
    };
  }
};