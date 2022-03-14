import { Order } from './idOrder.model';
import { Card } from './card.model';

export class Column { 
  boardId: number = 0;
  cardOrder: Order[] = [];
  cards: Card[] = [];
  _id: number = 0;
  title: string = '';
}
