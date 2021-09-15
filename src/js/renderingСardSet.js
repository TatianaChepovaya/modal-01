import cardSetTemplateHBS from '../templates/set-of-cards.hbs';

import { getEventsByOptions } from '../js/events-api';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

import { searchCardsLinks } from './open-close-modal';

const cardSetContainer = document.querySelector('.set-of-cards');
let page = 0;

const refs = {
  input: document.querySelector('.input-field'),
  form: document.querySelector('.search-form'),
  body: document.querySelector('body'),
};

function onInput(event) {
  event.preventDefault();
  const keyword = refs.input.value;
  if (keyword === '') {
    error({
      text: 'Please enter something!',
      delay: 2000,
    });
  } else {
    getEventsByOptions(page, keyword)
      .then(renderingCardSet)
      .then(page++)
      .catch(error);
  }
}

function renderingCardSet(arr) {
  const cardSetTemplateAction = cardSetTemplateHBS(arr.cards);

  cardSetContainer.innerHTML = cardSetTemplateAction;
  searchCardsLinks();
}
refs.form.addEventListener('submit', onInput);
