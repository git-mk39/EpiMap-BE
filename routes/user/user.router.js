import authoRouter from "./autho.router.js";

function webInitRouterUser(app) {
  app.use("/user", authoRouter);
}

export default webInitRouterUser;
