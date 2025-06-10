import { verifytoken } from "../helper/token.js";

// Middleware xác thực người dùng
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
const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({ msg: "Không có quyền truy cập." });
    }
    next();
  };
};

export { authenticate, authorizeRoles };
