export class Table {
    private _AssestName: string;
    private _AttributName:string;
    private _DatenType:string ;
    private _Tabels :string;


    constructor(table :Table){
        this._AssestName = table.AssestName;
        this._AttributName= table.AttributName;
        this._DatenType =table.DatenType;
        this._Tabels=table.Tabels;
    }

    public get AssestName() : string {
        return  this._AssestName;
    }
    public get DatenType() : string{
        return  this._DatenType;
    }

    public get AttributName() : string {
        return this._AttributName;
    }
    public get Tabels() : string {
        return this._Tabels;
    }

    public set AttributName(value : string) {
        this._AttributName = value;
    }

    public set AssestName(value : string) {
        this._AssestName = value;
    }
    public set DatenType(value : string) {
        this._DatenType = value;
    }
    public set Tabels(value : string) {
        this._Tabels = value;
    }

    toJSON1() {
        return {
            AttributName: this._AttributName,
            //AssestName: this._AssestName,
          
        };
      }
      toJSON2() {
        return {
            DatenType :this._DatenType,
            //AssestName: this._AssestName,
          
        };
      }

}
