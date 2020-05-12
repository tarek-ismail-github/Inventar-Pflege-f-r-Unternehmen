export class Server {
    private _ServerID: number;
    private _Typ: String;
    private _Ort: String;
    private _OS: String;

    constructor(server :Server){
        this._ServerID = server.ServerID;
        this._Typ = server.Typ;
        this._Ort= server.Ort;
        this._OS = server.OS;
    }
    
    public get ServerID() : number {
        return this._ServerID;
    }
    
    public get Typ() : String {
        return  this._Typ;
    }
    
    public get Ort() : String {
        return this._Ort;
    }
    
    public get OS() : String {
        return this._OS ;
    }

    public set ServerID(value : number) {
    this._ServerID = value;
    }
    
    public set Typ(value : String) {
        this._Typ = value;
    }
    
    public set Ort(value : String) {
        this._Ort = value;
    }
    
    public set OS(value : String) {
        this._OS = value;
    }
    
    toJSON() {
        return {
            ServerID: this._ServerID,
            Typ: this._Typ,
          Ort: this._Ort,
          OS: this._OS,
        };
      }
    

}
