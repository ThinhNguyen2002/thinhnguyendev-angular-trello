import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Card } from 'src/app/Models/card.model';
import { Column } from 'src/app/Models/column.model';
import { FackeDataService } from 'src/app/services/facke-data.service';
import { mapOrder } from 'src/app/untilitis/sorts';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {
  @Input('column') column: Column = new Column();
  @Output('handleDropCard') handleDropCard: EventEmitter<any> =
    new EventEmitter();
  @Output('handleColumn') handleColumn: EventEmitter<any> = new EventEmitter();

  constructor(private fakeData: FackeDataService) {}

  ngOnInit(): void {
    this.column.cards = mapOrder(
      this.column.cards,
      this.column.cardOrder,
      '_id'
    );
  }

  ngAfterViewInit() {}

  contentNewCard: string = '';
  isAddCardForm: boolean = false;

  onCardDrop(columnId: any, dropResult: any) {
    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      const datas = { columnId, dropResult };
      this.handleDropCard.emit(datas);
    }
  }

  getCardPayload(columnId: any) {
    return (index: number) => {
      return this.column.cards[index];
    };
  }

  onRemoveColumn(column: any) {
    let newData = {
      ...column,
      _destroy: true,
    };

    this.handleColumn.emit(newData);
    this.fakeData.updateCoulumn(newData._id, newData);
  }

  selectAllInlineText(e: any) {
    e.target.focus();
    e.target.select();
  }

  saveContentAfterPressEnter(e: any) {
    if (e.key === 'Enter') {
      e.preventDefault();
      e.target.blur();
    }
  }

  handleTitleColumnBlur(e: any) {
    if (this.column.title !== e.target.value) {
      let newData = {
        ...this.column,
        title: e.target.value,
      };
      this.handleColumn.emit(newData);
      this.fakeData.updateCoulumn(newData._id, newData);
    }
  }

  toggleOpentNewCardForm() {
    this.isAddCardForm = !this.isAddCardForm;
  }

  onAddCard() {
    if (!this.contentNewCard || this.contentNewCard.length < 3) {
      return;
    }
    let newCardToAdd: any = {
      boardId: this.column.boardId,
      columnId: this.column._id,
      title: this.contentNewCard.trim(),
    };

    this.column.cards.push(newCardToAdd);

    this.toggleOpentNewCardForm();
    this.contentNewCard = '';
    this.fakeData.createCard(newCardToAdd)
  }

  onMouseDown(e:any){
    e.preventDefault();
  }
}
