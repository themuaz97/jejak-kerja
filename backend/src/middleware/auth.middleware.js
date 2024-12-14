/** @format */
import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";

export const protectRoute = async (req, res, next) => {
  try {
    // 1. Get the JWT token from the header's request Authorization
    const bearerToken = req.headers.authorization;
    const [type, token] = bearerToken?.split(" ") ?? [];

    if (!token || type !== "Bearer") {
      return res.status(401).send({ message: "No token found, authorization denied" });
    }

    // 2. Verify the token
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.SECRET_KEY);
    } catch (error) {
      return res.status(401).send(
        {
          message: "Invalid token or expired token, authorization denied",
        });
    }

    const userId = decoded.userId;

    // 3. Fetch the user from the database
    const user = await prisma.users.findFirst({
      where: { id: userId },
      include: { roles: true }, 
    });

    if (!user) {
      return res.status(401).send({ message: "Invalid token, authorization denied" });
    }

    // 4. Attach the user to the request object
    req.user = {
      user_id: user.id,
      role_id: user.roles?.id,
      role_name: user.roles?.name,
    };

    // 5. Call the next middleware or route handler
    next();
  } catch (error) {
    console.error("Error in protectRoute:", error); // Log unexpected errors
    res.status(500).send({ message: "Internal server error", error: error.message });
  }
};

export const protectAdminRoute = (req, res, next) => {
  // Check if the user's role is admin (role_id = admin)
  if (req.user?.role_name?.toLowerCase().includes("admin")) {
    // If the user is an admin, proceed to the next middleware or route handler
    return next();
  } else {
    // If the user is not an admin, return unauthorized
    return res.status(403).json({ message: "Access denied, admin only" });
  }
};
