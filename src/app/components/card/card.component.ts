import { Component, Input, OnInit } from '@angular/core';
import { Card } from 'src/app/Models/card.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input('card') card:Card = new Card();
  
  constructor() { }

  ngOnInit(): void {
  }

  handleImg($event:any){
    $event.preventDefault();
  }

}
