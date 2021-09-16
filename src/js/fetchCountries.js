import * as _ from 'lodash';
import { error } from '@pnotify/core';

import countryCard from '../templates/countryCard.hbs';
import fetchCountries from './searchQuery';

const refs = {
  div: document.querySelector('.country'),
  input: document.querySelector('.input'),
  list: document.querySelector('.list__country'),
};

refs.input.addEventListener(
  'input',
  _.debounce(e => {
    const searchQuery = e.target.value;
    refs.list.innerHTML = '';
    refs.div.innerHTML = '';
    fetchCountries(searchQuery)
      .then(createMarkUp)
      .catch(() => error({ text: `The request failed`, delay: 2000 }))
      .finally((e.target.value = ''));
  }, 1000),
);

function createMarkUp(array) {
  if (array.length >= 2 && array.length < 10) {
    const items = array
      .map(country => {
        return `<li>${country.name}</li>`;
      })
      .join('');
    refs.list.insertAdjacentHTML('beforeend', items);
  }
  if (array.length === 1) {
    const country = array[0];
    const markUp = countryCard(country);
    refs.div.innerHTML = markUp;
  }
  if (array.length > 10) {
    error({
      text: 'Too many matches found. Please enter a more specific query',
      delay: 2000,
    });
  }
}
