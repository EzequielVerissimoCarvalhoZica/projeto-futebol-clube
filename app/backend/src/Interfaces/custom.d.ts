import { } from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      role?: string;
    }
  }
}
