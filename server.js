import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser"; // ✅
import webInitRouterAdmin from "./routes/admin/admin.router.js";
import webInitRouterUser from "./routes/user/user.router.js";
import epimap from "./api/epimap.route.js"
import reportRoutes from "./api/dailyReport.route.js";

const app = express();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(cookieParser());
app.use(express.json());

webInitRouterUser(app);
webInitRouterAdmin(app);
app.use("/", epimap);

// Use Routes
app.use('/api', reportRoutes);

app.use((req, res) => {
  res.status(404).json({ error: "not found" });
});

export default app;
