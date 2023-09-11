export class Fractions
{
    // frac stands for Fraction, 
    // the first number after it is the numerator, 
    // the second number is denominator

    private _frac18: string = '1/8';
    private _frac14: string = '1/4';
    private _frac13: string = '1/3';
    private _frac12: string = '1/2';
    private _frac23: string = '2/3';
    private _frac34: string = '3/4';

    frac18(): string
    {
        return this._frac18;
    }

    frac14(): string
    {
        return this._frac14;
    }
    
    frac13(): string
    {
        return this._frac13;
    }
    
    frac12(): string
    {
        return this._frac12;
    }
    
    frac23(): string
    {
        return this._frac23;
    }
    
    frac34(): string
    {
        return this._frac34;
    }

    allFractions(): string[]
    {
        const allFractions: string[] = [
            this._frac18,
            this._frac14,
            this._frac13,
            this._frac12,
            this._frac23,
            this._frac34,
        ];
        
        return allFractions;
    }
}