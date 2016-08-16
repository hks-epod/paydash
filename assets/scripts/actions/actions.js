'use strict';

import fetch from 'isomorphic-fetch';

export const REQUEST_CARDS = 'REQUEST_CARDS';
export const RECEIVE_CARDS = 'RECEIVE_CARDS';


function requestCards() {
  return {
    type: REQUEST_CARDS
  };
}

function receiveCards(json) {
  return {
    type: RECEIVE_CARDS,
    posts: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

function fetchCards() {
  return dispatch => {
    dispatch(requestCards());
    return fetch('/musters/data')
      .then(response => response.json())
      .then(json => dispatch(receiveCards(json)));
  };
}


