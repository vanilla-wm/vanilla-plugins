import fetch from 'isomorphic-fetch'

const parseResponse = ({ response, resolve, reject }) => {
  response
    .json()
    .then((data) => resolve(data))
    .catch((e) => reject(e))
}

export default (query, { clientId, clientSecret, VANILLA_API_URL }) =>
  new Promise((resolve, reject) => {
    fetch(VANILLA_API_URL, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString('base64')}`,
      },
      body: JSON.stringify({
        query,
      }),
    })
      .then((response) => {
        if (response.status === 200) {
          parseResponse({ response, reject, resolve })
          return
        }
        reject(response.status)
      })
      .catch((error) => reject(error))
  })
