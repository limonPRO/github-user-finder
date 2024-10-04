import express from "express";
import UserRoute from "./User.route.js";
import GithubRoute from "./Github.route.js"

const router = express.Router();

const routes = [
  {
    path: "/users",
    route: UserRoute,
  },
  {
    path: "/github-users",
    route: GithubRoute,
  },
];

routes.forEach((current, i) => {
  router.use(current.path, current.route);
});

export default router;
