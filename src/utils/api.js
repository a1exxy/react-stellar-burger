// Взаимодействие с API

const options = {method:'GET', redirect:'follow'}
export default async function getApiInfo (url) {
  try {
    return fetch(url, options)
      .then(response => {
        if (!response.ok) {
          throw new Error(`${response.status}`);
        } else {
          return response.json()
        }
      })
  } catch(err) {
    return Promise.reject(`Ошибка сетевого взаимодействия: ${err.message}`);
  }
}
