import express from "express";
import cors from "cors";
import webInitRouterAdmin from "./routes/admin/admin.router.js";
import webInitRouterUser from "./routes/user/user.router.js";

const app = express();
app.use(cors());
app.use(express.json());

webInitRouterUser(app);
webInitRouterAdmin(app);

app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
