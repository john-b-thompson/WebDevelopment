export class Fractions
{
    // frac{n}{n}()
    // frac stands for Fraction, 
    // the first number after it is the numerator, 
    // the second number is denominator

    frac18(): string
    {
        return '1/8';
    }

    frac14(): string
    {
        return '1/4';
    }
    
    frac13(): string
    {
        return '1/3';
    }
    
    frac12(): string
    {
        return '1/2';
    }
    
    frac23(): string
    {
        return '2/3';
    }
    
    frac34(): string
    {
        return '3/4';
    }

    allFractions(): string[]
    {
        const allFractions: string[] = [
            this.frac18(),
            this.frac14(),
            this.frac13(),
            this.frac12(),
            this.frac23(),
            this.frac34()
        ];
        
        return allFractions;
    }
}