import { Request } from 'express';
import { UserData } from '../user/user.interface';

// declare interface userRequest extends Request {
//     user?: UserData;
// }

declare global {
  interface userRequest extends Request {
    user?: UserData;
  }
}
