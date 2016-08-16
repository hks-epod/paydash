'use strict';

import { combineReducers } from 'redux';
import {
  REQUEST_CARDS, RECEIVE_CARDS
} from '../actions';


function cards(state = {
  isFetching: false,
  items: []
}, action) {
  switch (action.type) {
    case REQUEST_CARDS:
      return Object.assign({}, state, {
        isFetching: true
      });
    case RECEIVE_CARDS:
      return Object.assign({}, state, {
        isFetching: false,
        items: action.cards,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

function cardsByUser(state = { }, action) {
  switch (action.type) {
    case RECEIVE_CARDS:
    case REQUEST_CARDS:
      return Object.assign({}, state, {
        musters: cards(state.musters, action)
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  cardsByUser
});

export default rootReducer;
