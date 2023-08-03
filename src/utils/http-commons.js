import axios from "axios"

export const pokeAxios = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    headers: {
        crossDomain: true,
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
})
