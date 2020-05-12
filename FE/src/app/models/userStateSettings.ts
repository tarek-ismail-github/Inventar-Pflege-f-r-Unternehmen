import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
export interface UserStateSettings {
  user: User;
  isLoading: BehaviorSubject<boolean>;
  isLoggedIn: BehaviorSubject<boolean>;
}
