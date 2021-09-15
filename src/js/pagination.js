import Pagination from 'tui-pagination';
import refs from './renderingСardSet';
import { getEventsByAttractions, getEventsByOptions } from './events-api';
import { renderingCardSet } from './renderingСardSet';
import cardSet from '../templates/set-of-cards.hbs';
import axios from 'axios';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import { error } from '@pnotify/core';

// Ссылки----------------------------------------------------------->
const container = document.getElementById('tui-pagination-container');
const containerOfCards = document.querySelector('.set-of-cards');
const input = document.querySelector('.input-field');

// переменки и опции------------------------------------------------->
const API_KEY = 'GcvUr561HaBI30kU58PhKSa9RWqvwjKx';
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';
const breakPoint = 'events.json';
let page = 0;
const options = {
  totalItems: 199,
  itemsPerPage: 10,
  visiblePages: 5,
  page: 1,
  centerAlign: true,
  firstItemClassName: 'tui-first-child',
  lastItemClassName: 'tui-last-child',
  template: {
    page: `<a href="" class="tui-page-btn">{{page}}</a>`,
    currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
    moveButton:
      '<a href="" class="tui-page-btn tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</a>',
    disabledMoveButton:
      '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
      '<span class="tui-ico-{{type}}">{{type}}</span>' +
      '</span>',
    moreButton:
      '<a href="" class="tui-page-btn tui-{{type}}-is-ellip">' +
      '<span class="tui-ico-ellip">...</span>' +
      '</a>',
  },
};

// Создал новый экземпляр с опциями и контейнером для кнопок---------------------->
export const pagination = new Pagination(container, options);

// Функция прорисовки разметки--------------------------------------------------->
function renderMarkup(arr) {
  const markup = cardSet(arr.map(item => item));
  containerOfCards.insertAdjacentHTML('beforeend', markup);
}

// Функуия - коллбек для метода экземпляра - pagination.on()? которая делает запрос и рендерит согласно номеру страницы---------------------------------------------------------
export function onPaginationBarPush(eventData) {
  const keyword = input.value;
  page = eventData.page;
  console.log(keyword);
  if (keyword === '') {
    error({
      text: 'Please enter something!',
      delay: 2000,
    });
  } else {
    axios
      .get(`${BASE_URL}${breakPoint}?apikey=${API_KEY}&locale=*&keyword=${keyword}&page=${page}`)
      .then(r => r.data._embedded.events)
      .then((containerOfCards.innerHTML = ''))
      .then(renderMarkup)
      .catch(error);
  }
}
