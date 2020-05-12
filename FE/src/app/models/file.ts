export class File {
    private _ID: number;
    private _File: any;

    constructor(file :File){
        this._ID = file.ID;
        this._File = file.File;
    }
    
    public get ID() : number {
        return this._ID;
    }

    public get File() : any {
        return  this._File;
    }

    public set ID(value : number) {
    this._ID = value;
    }

    public set File(value : any) {
        this._File = value;
    }

    toJSON() {
        return {
            ID: this._ID,
            File: this._File,
        };
      }

}
