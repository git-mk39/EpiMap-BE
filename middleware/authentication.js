import { verifytoken } from "../helper/token.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ msg: "Chưa đăng nhập. Không có token." });
    }

    const result = verifytoken(token);
    if (!result) {
      return res.status(403).json({ msg: "Token không hợp lệ." });
    }

    req.user = {
      userId: result.userId,
      role: result.role,
    };
    next();
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Lỗi máy chủ khi xác thực." });
  }
};

const authorizeRoles = (roles) => {
  return (req, res, next) => {
    console.log("role: ", req.user.role);
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Không có quyền truy cập." });
    }
    next();
  };
};

const allowGuestOrAdmin = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) return next();

    const result = verifytoken(token);
    if (result && result.role === "admin") {
      req.user = {
        userId: result.userId,
        role: result.role,
      };
      return next();
    }

    return res
      .status(403)
      .json({ msg: "Chỉ admin hoặc khách chưa đăng nhập mới được truy cập." });
  } catch (err) {
    return res.status(403).json({ msg: "Token không hợp lệ." });
  }
};

export { authenticate, authorizeRoles, allowGuestOrAdmin };
