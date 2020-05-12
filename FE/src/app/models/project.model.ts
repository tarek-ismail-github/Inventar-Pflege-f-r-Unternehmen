
export class Project {
    private _ProjektID: number;
    private _Name: String;
    private _Mitarbeiter: String;
    private _Kunde: String;
    private _Kosten: number;
    private _Projektstart: Date;
    private _Projektende: Date;
    
    constructor(project :Project){
     this._ProjektID=project.ProjektID;
     this._Name=project.Name;
     this._Mitarbeiter=project.Mitarbeiter;
     this._Kunde=project.Kunde;
     this._Kosten=project.Kosten;
     this._Projektstart=project.Projektstart;
     this._Projektende=project.Projektende;
    }
    
    public get ProjektID() : number {
        return this._ProjektID;
    }
    public get Kosten() : number {
        return this._Kosten;
    }
    public get Name() : String {
        return this._Name;
    }
    public get Kunde() : String {
        return this._Kunde;
    }
    
    public get Mitarbeiter() : String {
        return this._Mitarbeiter;
    }
    
    public get Projektstart() : Date {
        return this._Projektstart
    }
    public get Projektende() : Date {
        return this._Projektende
    }
    
    public set ProjektID(value : number) {
        this._ProjektID = value;
    }
    public set Kosten(value : number) {
        this._Kosten = value;
    }
    
    public set Name(value : String) {
        this._Name = value;
    }
    public set Kunde(value : String) {
        this._Kunde = value;
    }
    public set Mitarbeiter(value : String) {
        this._Mitarbeiter = value;
    }
    
    public set Projektstart(value : Date) {
        this._Projektstart = value;
    }
    public set Projektende(value : Date) {
        this._Projektende = value;
    }
    toJSON() {
        return {
            ProjektID: this._ProjektID,
          Kosten: this._Kosten,
          Name: this._Name,
          Kunde: this._Kunde,
          Mitarbeiter: this._Mitarbeiter,
          Projektstart: this._Projektstart,
          Projektende: this._Projektende,
        };
      }
    
    
    
    
}
