import { Component, OnInit } from '@angular/core';
import { FackeDataService } from 'src/app/services/facke-data.service';
import { applyDrag } from 'src/app/untilitis/dragDrop';
import { mapOrder } from 'src/app/untilitis/sorts';

@Component({
  selector: 'app-board-content',
  templateUrl: './board-content.component.html',
  styleUrls: ['./board-content.component.scss'],
})
export class BoardContentComponent implements OnInit {
  constructor(private fakeData: FackeDataService) {}

  boardId: string = '620479046f09c9614476f51e';
  board: any = '';
  isLoading: boolean = true;

  datas: any = this.fakeData.getFullData();
  isNewColumnForm: boolean = false;
  newTitleCoulmn: string = '';

  ngOnInit(): void {
    // console.log('this.fakeData.getFullData()', this.datas);
    this.fakeData.fetchBoardDetails(this.boardId).then((data) => {
      data.columns = mapOrder(data.columns, data.columnOrder, '_id');

      this.board = data;
      console.log('data', data);
    }).finally(() => {
      this.isLoading = false;
    })
  }

  onColumnDrop(dropResult: any) {
    let newColumn = applyDrag(this.board.columns, dropResult);

    this.board.columnOrder = newColumn.map((column: any) => column._id);

    this.board.columns = newColumn;

    console.log(this.board);
    this.fakeData.updateBoard(this.board._id, this.board).then(() => {
      console.log('update column succefull');
    });
  }

  handleDropCard(payload: any) {
    const { columnId, dropResult } = payload;

    if (dropResult.removedIndex !== null || dropResult.addedIndex !== null) {
      let currentColumn = this.board.columns.find(
        (column: any) => column._id === columnId
      );

      currentColumn.cards = applyDrag(currentColumn.cards, dropResult);
      currentColumn.cardOrder = currentColumn.cards.map(
        (card: any) => card._id
      );

      if (dropResult.removedIndex !== null && dropResult.addedIndex !== null) {
        /**
         * Action : move card inside its column
         * 1 - Call api update cardOrder in current column
         */
        this.fakeData
          .updateCoulumn(currentColumn._id, currentColumn)
          .then(() => {
            console.log('in column', dropResult);
          });
      } else {
        /**
         * Action: Move card between two column
         * 1 - Call api update cardOrder in current column
         * 2 - Call api update columnId in current card
         */
        console.log('in out column', dropResult);
        if (dropResult.addedIndex !== null) {
          let currentCard = dropResult.payload;
          currentCard.columnId = currentColumn._id;

          this.fakeData.updateCoulumn(currentColumn._id, currentColumn);
          this.fakeData.updateCard(currentCard._id, currentCard);
        }
      }
    }
  }

  handleColumn(column: any) {
    let curIndex = this.board.columns.findIndex(
      (c: any) => c._id === column._id
    );

    if (column._destroy) {
      this.board.columns.splice(curIndex, 1);
      this.board.columnOrder = this.board.columns.map(
        (column: any) => column.id
      ); 
    } else {
      this.board.columns.splice(curIndex, 1, column);
      this.board.columnOrder = this.board.columns.map(
        (column: any) => column.id
      );
      // console.log(this.board.columns);
    }
  }

  toggleOpentNewColumnForm() {
    this.isNewColumnForm = !this.isNewColumnForm;
  }

  onAddColumn() {
    console.log(this.newTitleCoulmn);
    if (!this.newTitleCoulmn) {
      return;
    }
    const newColumnToAdd = {
      boardId: this.board._id,
      title: this.newTitleCoulmn
    };
    this.board.columns.push(newColumnToAdd);
    this.toggleOpentNewColumnForm() 
    this.fakeData.createCoulumn(newColumnToAdd)
  }
}
