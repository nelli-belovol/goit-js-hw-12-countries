// var debounce = require('lodash.debounce');
// console.log(debounce);
import countryCard from '../templates/countryCard.hbs';

const refs = {
  div: document.querySelector('.country'),
  input: document.querySelector('.input'),
  list: document.querySelector('ul'),
};

refs.input.addEventListener('input', e => {
  const searchCountry = e.target.value;

  fetchCountries(searchCountry);
});

function fetchCountries(country) {
  let base_url = `https://restcountries.eu/`;
  let params = `rest/v2/name/${country}`;
  const url = base_url + params;
  fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error('ERROR');
      }
    })
    .then(data => {
      createMarkUp(data);
    })
    .catch(error => {
      console.log(error);
    });
}
function createMarkUp(array) {
  if (array.length > 2 && array.length < 10) {
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
    console.log(markUp);
    refs.div.innerHTML = markUp;
  }
}
