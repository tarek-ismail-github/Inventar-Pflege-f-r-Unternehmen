import { User } from '../models/user';
export interface UserSettings {
    uuid?: string;
    email: string;
    salutation: string;
    firstName: string;
    lastName: string;
    enabled: boolean;
    locked: boolean;
    lastFailedLoginAttempts?: number;
    lastFailedLoginAttemptAt?: Date;
    createdAt?: Date;
    createdBy?: User;
    lastModifiedAt?: Date;
    lastModifiedBy?: User;
    role: string;
    token?: string;
}
