import googleAuthProvider from "../auth/google.auth";
import DeveloperService from "../services/developer.service";
import UserService from "../services/user.service";

const UserAuthController = {
  async googleAuth(req, res) {
    const { idToken } = req.body;

    if (!idToken) {
      return res.status(400).json({ message: "ID token is required" });
    }

    try {
      const googleResponse = await googleAuthProvider(idToken);
      if (!googleResponse) {
        return res.status(401).json({ message: "Invalid ID token" });
      }

      // check if user exists in database
      let existingUser = await UserService.getByEmail(googleResponse.email);

      // if not create a new user (also check if email taken by developer)
      if (!existingUser) {
        // check if email is already taken by a user
        const usr = await DeveloperService.getByEmail(googleResponse.email);
        if (usr) {
          return res.sendResponse(400, "Email is already taken by a user");
        }

        // create a new user
        const newUser = await UserService.create({
          email: googleResponse.email,
          username: googleResponse.username,
          name: googleResponse.name,
        });
        if (!newUser) {
          return res.sendResponse(500, "Failed to create user");
        }
        existingUser = { ...newUser._doc, auth: "registered" };
      } else {
        existingUser = { ...existingUser._doc, auth: "login" };
      }

      // create jwt token for the user
      const jwtToken = jwtService.generateUserJWT(existingUser);
      if (!jwtToken) {
        return res.sendResponse(500, "Failed to generate JWT token");
      }

      return res.sendResponse(
        201,
        { data: existingUser, accessToken: jwtToken },
        "User authenticated successfully"
      );
    } catch (error) {
      console.error("Google authentication error:", error);
      return res.sendResponse(500, error.message, "Authentication failed");
    }
  },
};

export default UserAuthController;
