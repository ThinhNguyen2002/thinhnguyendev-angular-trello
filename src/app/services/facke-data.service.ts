import { Injectable } from '@angular/core';
import axios from 'axios';
import { API_ROOT } from 'src/app/untilitis/constants';

@Injectable({
  providedIn: 'root',
})
export class FackeDataService {
  constructor() {}

  //fakeData init project
  getFullData() {
    return {
      boards: [
        {
          id: 'board-1',
          columnOrder: ['column-1', 'column-2', 'column-3'],
          columns: [
            {
              id: 'column-1',
              boardId: 'board-2',
              title: 'To do column 1',
              cardOrder: [
                'card-1',
                'card-2',
                'card-3',
                'card-4',
                'card-5',
                'card-6',
                'card-7',
              ],
              cards: [
                {
                  id: 'card-1',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 1',
                  cover:
                    'data:image/jpeg;base64,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',
                },
                {
                  id: 'card-2',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 2',
                  cover: null,
                },
                {
                  id: 'card-3',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 3',
                  cover: null,
                },
                {
                  id: 'card-4',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 4',
                  cover: null,
                },
                {
                  id: 'card-5',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 5',
                  cover: null,
                },
                {
                  id: 'card-6',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 6',
                  cover: null,
                },
                {
                  id: 'card-7',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 7',
                  cover: null,
                },
              ],
            },
            {
              id: 'column-2',
              boardId: 'board-1',
              title: 'Inprogress column 2',
              cardOrder: ['card-8', 'card-9', 'card-10'],
              cards: [
                {
                  id: 'card-8',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 8',
                  cover: null,
                },
                {
                  id: 'card-9',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 9',
                  cover: null,
                },
                {
                  id: 'card-10',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 10',
                  cover: null,
                },
              ],
            },
            {
              id: 'column-3',
              boardId: 'board-1',
              title: 'Done column 3',
              cardOrder: ['card-11', 'card-12', 'card-13'],
              cards: [
                {
                  id: 'card-11',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 11',
                  cover: null,
                },
                {
                  id: 'card-12',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 12',
                  cover: null,
                },
                {
                  id: 'card-13',
                  boardId: 'board-1',
                  columnId: 'column-1',
                  title: 'Title of card 13',
                  cover: null,
                },
              ],
            },
          ],
        },
      ],
    };
  }

  //update column in board
  updateBoard = async (id: any, data: any) => {
    const request = await axios.put(`${API_ROOT}/v1/boards/${id}`, data);
    return request.data;
  };

  //Get full data
  fetchBoardDetails = async (id: any) => {
    const request = await axios.get(`${API_ROOT}/v1/boards/${id}`);
    return request.data;
  };

  //create column
  createCoulumn = async (data: any) => {
    const request = await axios.post(`${API_ROOT}/v1/columns`, data);
    return request.data;
  };

  //update or remove column
  updateCoulumn = async (id: any, data: any) => {
    const request = await axios.put(`${API_ROOT}/v1/columns/${id}`, data);
    return request.data;
  };

  createCard = async (data: any) => {
    const request = await axios.post(`${API_ROOT}/v1/cards`, data);
    return request.data;
  };

  //update or remove card
  updateCard = async (id: any, data: any) => {
    const request = await axios.put(`${API_ROOT}/v1/cards/${id}`, data);
    return request.data;
  };
}
