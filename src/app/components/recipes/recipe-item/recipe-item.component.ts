import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from 'src/app/models/recipe';

declare var html2pdf: any;

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe?: Recipe;
  constructor() { }

  ngOnInit(): void {
  }

  download(): void {
    const element = document.getElementById('pdf');
    var opt = {
      margin: 1,
      filename: `${this.recipe!.name}.pdf`
    };
    html2pdf().from(element).set(opt).save();
  }

}
