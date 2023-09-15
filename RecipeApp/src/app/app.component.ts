import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RecipeApp';

  fraction14 = 1/4;
  fraction110 = '&#8530;';

  toHTML(input: string) 
   {
    return new DOMParser().parseFromString(input, "text/html").documentElement.textContent;
}

  toDecimal(input: string)
  {
    return parseFloat(input);
  }
}
