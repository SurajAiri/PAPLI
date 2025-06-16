import googleAuthProvider from "../auth/google.auth.js";
import DeveloperService from "../services/developer.service.js";
import UserService from "../services/user.service.js";
import jwtService from "../services/jwt.service.js";

const DeveloperAuthController = {
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

      // check if developer exists in database
      let existingDev = await DeveloperService.getByEmail(googleResponse.email);

      // if not create a new developer (also check if email taken by users)
      if (!existingDev) {
        // check if email is already taken by a user
        const usr = await UserService.getByEmail(googleResponse.email);
        if (usr) {
          return res.sendResponse(400, "Email is already taken by a user");
        }

        // create a new developer
        const newDeveloper = await DeveloperService.create({
          email: googleResponse.email,
          username: googleResponse.username,
          name: googleResponse.name,
          // provider: user.provider,
        });
        if (!newDeveloper) {
          return res.sendResponse(500, "Failed to create developer");
        }
        // existingDev = newDeveloper;
        existingDev = { ...newDeveloper._doc, auth: "registered" };
      } else {
        existingDev = { ...existingDev._doc, auth: "login"};
      }

      // create jwt token for the developer
      const jwtToken = jwtService.generateDeveloperJWT(existingDev);
      if (!jwtToken) {
        return res.sendResponse(500, "Failed to generate JWT token");
      }

      return res.sendResponse(
        201,
        { data: existingDev, accessToken: jwtToken },
        "Developer authenticated successfully"
      );
    } catch (error) {
      console.error("Google authentication error:", error);
      return res.sendResponse(500, error.message, "Authentication failed");
    }
  },
};

export default DeveloperAuthController;
