export class User {
    private _uuid: string;
    private _salutation: string;
    private _phone: string;
    private _enabled: boolean;
    private _locked: boolean;
    private _lastFailedLoginAttempts: number;
    private _lastFailedLoginAttemptAt: Date;
    private _createdAt: Date;
    private _createdBy: User;
    private _lastModifiedAt: Date;
    private _lastModifiedBy: User;
    private _email: string;
    private _firstName: string;
    private _lastName: string;
    private _role: string;
    private _token: string;
    private _companyUuid: string;
  
    constructor(user: User) {
      this._uuid = user.uuid;
      this._salutation = user.salutation;
      this._phone = user.phone;
      this._enabled = user.enabled;
      this._locked = user.locked;
      this._lastFailedLoginAttempts = user.lastFailedLoginAttempts;
      this._lastFailedLoginAttemptAt = user.lastFailedLoginAttemptAt;
      this._createdAt = user.createdAt;
      this._createdBy = user.createdBy;
      this._lastModifiedAt = user.lastModifiedAt;
      this._lastModifiedBy = user.lastModifiedBy;
      this._email = user.email;
      this._firstName = user.firstName;
      this._lastName = user.lastName;
      this._role = user.role;
      this._token = user.token;
      this._companyUuid = user.companyUuid;
    }
  
    public get salutation(): string {
      return this._salutation;
    }
  
    public get companyUuid(): string {
      return this._companyUuid;
    }
  
    public set companyUuid(value: string) {
      this._companyUuid = value;
    }
  
    public get phone(): string {
      return this._phone;
    }
  
  
    public get enabled(): boolean {
      return this._enabled;
    }
  
    public get locked(): boolean {
      return this._locked;
    }
  
    public get lastFailedLoginAttempts(): number {
      return this._lastFailedLoginAttempts;
    }
  
    public get lastFailedLoginAttemptAt(): Date {
      return this._lastFailedLoginAttemptAt;
    }
  
    public get createdAt(): Date {
      return this._createdAt;
    }
  
    public get createdBy(): User {
      return this._createdBy;
    }
  
    public get lastModifiedAt(): Date {
      return this._lastModifiedAt;
    }
  
    public get lastModifiedBy(): User {
      return this._lastModifiedBy;
    }
  
    public set salutation(value: string) {
      this._salutation = value;
    }
  
    public set phone(value: string) {
      this._phone = value;
    }
  
    public set enabled(value: boolean) {
      this._enabled = value;
    }
  
    public set locked(value: boolean) {
      this._locked = value;
    }
  
    public set lastFailedLoginAttempts(value: number) {
      this._lastFailedLoginAttempts = value;
    }
  
    public set lastFailedLoginAttemptAt(value: Date) {
      this._lastFailedLoginAttemptAt = value;
    }
  
    public set createdAt(value: Date) {
      this._createdAt = value;
    }
  
    public set createdBy(value: User) {
      this._createdBy = value;
    }
  
    public set lastModifiedAt(value: Date) {
      this._lastModifiedAt = value;
    }
  
    public set lastModifiedBy(value: User) {
      this._lastModifiedBy = value;
    }
  
    public get uuid(): string {
      return this._uuid;
    }
  
    public get email(): string {
      return this._email;
    }
  
    public get firstName(): string {
      return this._firstName;
    }
  
    public get lastName(): string {
      return this._lastName;
    }
  
    public get role(): string {
      return this._role;
    }
  
    public set uuid(value: string) {
      this._uuid = value;
    }
  
    public set email(value: string) {
      this._email = value;
    }
  
    public set firstName(value: string) {
      this._firstName = value;
    }
  
    public set lastName(value: string) {
      this._lastName = value;
    }
  
    public set role(value: string) {
      this._role = value;
    }
  
    public get token(): string {
      return this._token;
    }
  
    public set token(value: string) {
      this._token = value;
    }
  
    /*
    * get the object for the supplied role or null if not found
    */
    public getRoleByName(role): string {
      if (role && this.role) {
        return this.role === role ? this.role : null;
      }
      return null;
    }
    /*
    * check if a user has a permission
    * type can be 'any' or 'all' if an array is supplied for permission
    * returns true or false
    */
    public hasRole(role: string | string[], type: string = 'all') {
  
      // all roles need to be true, 'any' is possible as option
      // to check if at least one of the roles is true
      // if (type === undefined) type = 'all';
      if (role && role.constructor === Array) {
        // check multiple roles and return true if any matches
        if (type === 'any') {
          for (const rle of role) {
            if (this.getRoleByName(rle)) {
              return true;
            }
          }
          return false;
          // default match all
          // check multiple roles and return false if one of them fails
        } else {
          for (const rle of role) {
            if (!this.getRoleByName(rle)) {
              return false;
            }
          }
          return true;
        }
      } else {
        return (!role || !this.getRoleByName(role)) ? false : true;
      }
    }
  
    toJSON() {
      return {
        uuid: this._uuid,
        salutation: this._salutation,
        phone: this._phone,
        enabled: this._enabled,
        lastFailedLoginAttempts: this._lastFailedLoginAttempts,
        lastFailedLoginAttemptAt: this._lastFailedLoginAttemptAt,
        createdAt: this._createdAt,
        createdBy: this._createdBy,
        lastModifiedAt: this._lastModifiedAt,
        lastModifiedBy: this._lastModifiedBy,
        email: this._email,
        firstName: this._firstName,
        lastName: this._lastName,
        role: this._role,
        token: this._token,
        locked: this.locked
      };
    }
  }
  