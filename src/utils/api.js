// Взаимодействие с API
const ingredientsURL = process.env.REACT_APP_API_INGREDIENTS_URL
const ordersURL = process.env.REACT_APP_API_ORDERS


const options = {method:'GET', redirect:'follow'}
export async function getIngredients () {
  try {
    return fetch(ingredientsURL, options)
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка сетевого взаимодействия: ${response.status}`)
        } else {
          return response.json()
        }
      })
  } catch(err) {
    return Promise.reject(`Ошибка сетевого взаимодействия: ${err.message}`);
  }
}

export async function createOrder (companents) {
  try {
    return fetch(ordersURL, {
      method:'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({"ingredients": companents})
    })
      .then(response => {
        if (!response.ok) {
          return Promise.reject(`Ошибка сетевого взаимодействия: ${response.status}`)
        } else {
          return response.json()
        }
      })
  } catch(err) {
    return Promise.reject(`Ошибка сетевого взаимодействия: ${err.message}`);
  }
}
