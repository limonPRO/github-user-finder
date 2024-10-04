import axios from 'axios';
// import GitHubUser from '../models/GitHubUser.js';
import httpStatus from 'http-status';
import { GitHubUser } from '../models/Github.model.js';

// GitHub User Search API with Pagination and Total Page Count
export const searchGitHubUser = async (username, page, limit) => {
  try {
    // Default values for pagination
    let _page = page ? parseInt(page) : 1;
    let _limit = limit ? parseInt(limit) : 10;
    const skip = (_page - 1) * _limit;

    // Check if the GitHub user exists in the database
    const totalUsersInDB = await GitHubUser.countDocuments({ username: new RegExp(username, 'i') });
    const dbUsers = await GitHubUser.find({ username: new RegExp(username, 'i') })
                                    .skip(skip)
                                    .limit(_limit);

    // Prepare response
    const response = {
      code: httpStatus.OK,
      success: true,
      data: [],
      message: "Users found in the database",
      count: 0,
      page: _page,
      limit: _limit,
      totalPages: 0,
      nextPage: null,
      previousPage: null,
    };

    // If users are found in the database
    if (dbUsers.length > 0) {
      const totalPages = Math.ceil(totalUsersInDB / _limit);
      response.data = dbUsers;
      response.count = dbUsers.length;
      response.totalPages = totalPages;

      // Set next and previous page links
      if (_page < totalPages) {
        response.nextPage = _page + 1;
      }
      if (_page > 1) {
        response.previousPage =_page - 1;
      }

      return response;
    }

    // If not found in the database, call GitHub API
    const githubResponse = await axios.get(`https://api.github.com/search/users?q=${username}&page=${_page}&per_page=${_limit}`);
    const { items, total_count } = githubResponse.data;

    // Save new users to the database
    const newGitHubUsers = [];
    for (const item of items) {
      const existingUser = await GitHubUser.findOne({ username: item.login });

      if (!existingUser) {
        const newUser = new GitHubUser({
          username: item.login,
          avatarUrl: item.avatar_url,
          profileUrl: item.html_url,
        });
        await newUser.save();
        newGitHubUsers.push(newUser);
      }
    }

    // Prepare the response from GitHub API
    const totalPages = Math.ceil(total_count / _limit);
    response.data = newGitHubUsers.length > 0 ? newGitHubUsers : items;
    response.count = items.length;
    response.totalPages = totalPages;

    // Set next and previous page links
    if (_page < totalPages) {
      response.nextPage = _page + 1;
    }
    if (_page > 1) {
      response.previousPage = _page - 1;
    }

    return response;
  } catch (error) {
    return {
      code: httpStatus.INTERNAL_SERVER_ERROR,
      success: false,
      message: error.message,
      data: [],
      count: 0,
      totalPages: 0,
      nextPage: null,
      previousPage: null,
    };
  }
};

