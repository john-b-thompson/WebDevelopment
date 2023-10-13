export class MeasurementType
{
    teaspoon(): string
    {
        return 'Teaspoon';
    }

    tablespoon(): string
    {
        return 'Tablespoon';
    }
    
    ounce(): string
    {
        return 'Ounce';
    }
    
    cup(): string
    {
        return 'Cup';
    }
    
    pint(): string
    {
        return 'Pint';
    }
    
    quart(): string
    {
        return 'Quart';
    }
    
    gallon(): string
    {
        return 'Gallon';
    }
    
    pound(): string
    {
        return 'Pound';
    }
    
    gram(): string
    {
        return 'Gram';
    }
    
    slice(): string
    {
        return 'Slice';
    }

    allMeasurementTypes(): string[]
    {
        const mesaruementTypes: string[] = [
            this.teaspoon(),
            this.tablespoon(),
            this.ounce(),
            this.cup(),
            this.pint(),
            this.quart(),
            this.gallon(),
            this.pound(),
            this.gram(),
            this.slice()
        ];

        return mesaruementTypes;
    }

}