import {pokeAxios} from "../../utils/http-commons";

const PAGE_SIZE = 10
export function fetchCount(page=0) {
    return pokeAxios.get("/pokemon", {params: {limit: PAGE_SIZE, offset: PAGE_SIZE * page}})
}
