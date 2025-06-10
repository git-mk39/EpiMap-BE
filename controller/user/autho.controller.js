import { createToken } from "../../helper/token.js";
import Account from "../../model/admin.model.js";

const signIn = async (req, res) => {
  console.log("đăng nhập");
  try {
    const accountSended = req.body.username;
    const passwordSended = req.body.password;
    console.log(accountSended, "sdfsf===", passwordSended);
    if (!accountSended || !passwordSended) {
      return res
        .status(400)
        .json({ msg: "User name and password are required" });
    }

    const account = await Account.findOne({ username: accountSended });
    console.log("accc ", account);
    if (!account) {
      return res.status(200).json({ msg: "Account does not exist" });
    } else {
      if (account.password === passwordSended) {
        const token = createToken(account);
        console.log(token);
        return res
          .status(200)
          .cookie("token", token, { httpOnly: true, secure: true })
          .json({
            success: true,
            msg: "Login success",
            user: {
              role: account.role,
              userId: account._id,
              username: account.username,
              gender: account.gender,
              name: account.name,
            },
          });
      } else {
        return res.status(200).json({ msg: "Password is incorrect" });
      }
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

const signOut = async (req, res) => {
  try {
    res.status(200).clearCookie("token").json({
      success: true,
      msg: "Log out success",
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

export { signIn, signOut };
