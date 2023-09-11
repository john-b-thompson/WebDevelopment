export class MeasurementType
{
    private _teaspoon: string = 'Teaspoon';
    private _tablespoon: string = 'Tablespoon';
    private _ounce: string = 'Ounce';
    private _cup: string = 'Cup';
    private _pint: string = 'Pint';
    private _quart: string = 'Quart';
    private _gallon: string = 'Gallon';
    private _pound: string = 'Pound';

    teaspoon(): string
    {
        return this._teaspoon;
    }

    tablespoon(): string
    {
        return this._tablespoon;
    }
    
    ounce(): string
    {
        return this._ounce;
    }
    
    cup(): string
    {
        return this._cup;
    }
    
    pint(): string
    {
        return this._pint;
    }
    
    quart(): string
    {
        return this._quart;
    }
    
    gallon(): string
    {
        return this._gallon;
    }
    
    pound(): string
    {
        return this._pound;
    }

    allMeasurementTypes(): string[]
    {
        const mesaruementTypes: string[] = [
            this._teaspoon,
            this._tablespoon,
            this._ounce,
            this._cup,
            this._pint,
            this._quart,
            this._gallon,
            this._pound,
        ];

        return mesaruementTypes;
    }

}