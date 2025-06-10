import authoRouter from "../user/autho.router.js";

function webInitRouterAdmin(app) {
  app.use("/admin", authoRouter);
}

export default webInitRouterAdmin;
