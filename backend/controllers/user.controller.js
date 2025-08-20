import { User } from "../models/user.model.js";

const getUserData = async (req, res) => {
  try {
    const { userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.json({ success: false, message: "User Not Found" });
    }

    res.json({
      success: true,
      userData: {
        username: user.username,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (err) {
    return res.json({ success: false, message: err.message });
  }
};

export { getUserData };
