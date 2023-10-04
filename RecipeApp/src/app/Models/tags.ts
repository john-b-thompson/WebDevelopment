export class Tags
{
    keto(): string
    {
        return 'Keto';
    }

    glutenFree(): string
    {
        return 'Gluten Free';
    }

    dairyFree(): string
    {
        return 'Dariy Free';
    }

    nutFree(): string
    {
        return 'Nut Free';
    }

    sugarFree(): string
    {
        return 'Sugar Free';
    }

    vegan(): string
    {
        return 'Vegan';
    }

    soyFree(): string
    {
        return 'Soy Free';
    }
    
    allTags(): string[]
    {
        const allTags: string[] = [
            this.keto(),
            this.glutenFree(),
            this.dairyFree(),
            this.nutFree(),
            this.sugarFree(),
            this.vegan(),
            this.soyFree()
        ];
        
        return allTags;
    }
}