
export default  (query, {clientId,clientSecret,VANILLA_API_URL})=> new Promise(async (resolve,reject) => {
    try {
        const response = await fetch(VANILLA_API_URL, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
            },
            body: JSON.stringify({
                query
            })
        });

        if (response.status === 200) {
            return response.json().then(data => resolve(data)).catch(e => reject(e))
        }
        return reject(response.status)
    } catch (e) {
        reject(e)
    }
})
