import { MeasurementType } from "./mesaruementType";

export class Ingredient {
    public Name: string;
    public Measurement: string;
    public WholeAmount: string;
    public FractionAmount: string;

    constructor(name: string, measurement: string, wholeAmount: string, 
                    fractionAmount: string)
    {
        this.Name = name;
        this.Measurement = measurement;
        this.WholeAmount = wholeAmount;
        this.FractionAmount = fractionAmount;
    }

    getAmount(): string
    {
        let amount: string = '';

        if (this.WholeAmount != '0')
        {
            amount+= this.WholeAmount + ' ';
        }

        if (this.FractionAmount != '0')
        {
            amount+= this.FractionAmount + ' ';
        }

        return amount;
    }

}
