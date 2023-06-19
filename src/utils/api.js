// Взаимодействие с API

const options = {method:'GET', redirect:'follow'}
export default function getApiInfo (url) {
  return fetch(url, options)
    .then(res => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка сетевого взаимодействия: ${res.status}`);
    })
}
