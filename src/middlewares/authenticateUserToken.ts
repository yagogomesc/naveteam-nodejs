import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AppError } from '../errors/AppError';

interface JWTpayload {
  id: number;
  email: string;
  iat: number;
  exp: number;
}

function authenticateToken(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authHeader = request.headers['authorization'];
  const [, token] = authHeader.split(' ');
  if (token == null) {
    throw new AppError('JWT token is missing');
  }

  try {
    const validToken = jwt.verify(token, process.env.ACCESS_JWT_SECRET);

    const { id } = validToken as JWTpayload;

    request.id = id;

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT', 401);
  }
}

export { authenticateToken };
