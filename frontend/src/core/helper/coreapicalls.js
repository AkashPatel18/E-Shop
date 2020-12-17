import {API} from "../../backend"

export const getProduct = () => {
    return fetch(`${API}/products`,{method : "GET"})
    .then(response => {
        return response.json()

    })
    .catch (err => console.log(err))
}