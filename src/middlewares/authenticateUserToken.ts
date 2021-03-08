import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import { AppError } from "../errors/AppError";

function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers["authorization"];
  const [, token] = authHeader.split(" ");
  if (token == null) {
    throw new AppError("JWT token is missing");
  }

  const test = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
  return response.status(200).json(test);
}

export { authenticateToken };
