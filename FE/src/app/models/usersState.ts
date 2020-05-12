import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { UsersStateSettings } from './usersStateSettings';

export class UsersState implements UsersStateSettings {
    private _users: User[];
    private _isLoading: BehaviorSubject<boolean>;
    private _total: number;
    private _page: number;

    constructor(settings: UsersStateSettings) {
        this._users = settings.users;
        this._isLoading = settings.isLoading;
        this._total = settings.total || 0;
         this._page = settings.page || 0;
    }
    /**
     * Getter users
     * @return {User[]}
     */
    public get users(): User[] {
        return this._users;
    }

    /**
     * Getter isLoading
     * @return {BehaviorSubject<boolean>}
     */
    public get isLoading(): BehaviorSubject<boolean> {
        return this._isLoading;
    }

    /**
     * Setter users
     * @param {User[]} value
     */
    public set users(value: User[]) {
        this._users = value;
    }

    /**
     * Setter isLoading
     * @param {BehaviorSubject<boolean>} value
     */
    public set isLoading(value: BehaviorSubject<boolean>) {
        this._isLoading = value;
    }
    /**
    * Getter total
    * @return {number}
    */
    public get total(): number {
        return this._total;
    }

    /**
     * Getter page
     * @return {number}
     */
    public get page(): number {
        return this._page;
    }

    /**
     * Setter total
     * @param {number} value
     */
    public set total(value: number) {
        this._total = value;
    }

    /**
     * Setter page
     * @param {number} value
     */
    public set page(value: number) {
        this._page = value;
    }

    toJSON() {
        return {
            users: this._users,
            isLoading: this._isLoading,
            total: this._total,
            page: this._page
        };
    }
}
