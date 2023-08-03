import {pokeAxios} from "../../utils/http-commons";

const PAGE_SIZE = 12
export function fetchCount(page=0) {
    return pokeAxios.get("/pokemon", {params: {limit: PAGE_SIZE, offset: PAGE_SIZE * (page + 1)}})
}

export function fetchDetails(id) {
    return pokeAxios.get(`/pokemon/${id}`)
}

