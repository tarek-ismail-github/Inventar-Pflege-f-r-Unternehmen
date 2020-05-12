
export class Deployment {
    private _Datum: Date;
    private _DeployID: number;
    private _DurchfuehrenderMitarbeiter: String;
    private _InstallierteVersion: String;
    private _ProjektID: number;
    private _ServerID: number;
    constructor(deployment:Deployment){
        this._Datum =deployment.Datum;
        this._DeployID=deployment.DeployID;
        this._DurchfuehrenderMitarbeiter=deployment.DurchfuehrenderMitarbeiter;
        this._InstallierteVersion=deployment.InstallierteVersion;
        this._ProjektID=deployment.ProjektID;
        this._ServerID = deployment.ServerID;

    }
    
    public get ServerID() : number {
        return this._ServerID;
    }
    
    public get ProjektID() : number {
        return this._ProjektID;
    }
    
    public get InstallierteVersion() : String {
        return this._InstallierteVersion;
    }
    
    public get DurchfuehrenderMitarbeiter() : String {
        return this._DurchfuehrenderMitarbeiter;
    }
    
    public get Datum() : Date {
        return this._Datum;
    }
    
    public get DeployID() : number {
        return this._DeployID;
    }
    
    public set ServerID(value : number) {
        this._ServerID= value;
    }
    public set ProjektID(value : number) {
        this._ProjektID= value;
    }
    public set InstallierteVersion(value : String) {
        this._InstallierteVersion= value;
    }
    public set DurchfuehrenderMitarbeiter(value : String) {
        this._DurchfuehrenderMitarbeiter= value;
    }
    public set Datum(value : Date) {
        this._Datum= value;
    }
    public set DeployID(value : number) {
        this._DeployID= value;
    }
    
}
