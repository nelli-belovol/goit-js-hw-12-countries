import { alert } from '@pnotify/core';

export default function fetchCountries(country) {
  let base_url = `https://restcountries.eu/`;
  let params = `rest/v2/name/${country}`;
  const url = base_url + params;
  return fetch(url).then(response => {
    if (response.status === 200) {
      return response.json();
    } else {
      return alert({
        text: 'Not found',
        delay: 2000,
      });
    }
  });
}
