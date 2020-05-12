import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
export interface UsersStateSettings {
    users: User[];
    isLoading: BehaviorSubject<boolean>;
    total?: number;
    page?: number;
}
