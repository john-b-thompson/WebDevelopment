import { MeasurementType } from "./mesaruementType";

export class Ingredient {
    public Name: string;
    public Measurement: string;
    public Amount: string;

    constructor(name: string, measurement: string, amount: string)
    {
        this.Name = name;
        this.Measurement = measurement;
        this.Amount = amount;
    }

}
