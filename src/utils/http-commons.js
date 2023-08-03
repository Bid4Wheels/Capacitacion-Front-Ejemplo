import axios from "axios"

const pokeAxios = axios.create({
    baseURL: "https://pokeapi.co/api/v2",
    headers: {
        crossDomain: true,
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
    },
})

export const getPokemon = async () => {
    const url = `/pokemon`

    return (await pokeAxios.get(url)).data
}