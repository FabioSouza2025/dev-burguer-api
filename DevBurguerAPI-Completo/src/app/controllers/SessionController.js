import * as Yup from "yup";
import User from "../models/User";
import jwt from "jsonwebtoken";

import authConfig from "../../config/auth";

class SessionController {
  async store(request, response) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    try {
      await schema.validate(request.body, { abortEarly: false });
    } catch (err) {
      return response.status(400).json({ error: err.errors });
    }

    const { email, password } = request.body;

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return response
          .status(401)
          .json({ error: "Make sure your password or email are correct" });
      }

      const isSamePassword = await user.checkPassword(password);

      if (!isSamePassword) {
        return response
          .status(401)
          .json({ error: "Make sure your password or email are correct" });
      }

      return response.status(201).json({
        id: user.id,
        name: user.name,
        email,
        admin: user.admin,
        token: jwt.sign({ id: user.id, name: user.name }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (error) {
      return response.status(500).json({ error: "Error authenticating user" });
    }
  }
}

export default new SessionController();
