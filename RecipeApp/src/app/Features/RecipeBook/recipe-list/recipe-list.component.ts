import { Component } from '@angular/core';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent {

  loadedModal: string = '';
  modalArray: number[] = [
    1,
    2,
    3,
    4,
    5,
    6
  ];

  onLoad(recipeId: number)
  {
    this.loadedModal = 'Testing. I hope this works!!! From: ' + recipeId;
  }
}
