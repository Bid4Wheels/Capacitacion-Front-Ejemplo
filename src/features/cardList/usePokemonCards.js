import {useDispatch, useSelector} from "react-redux";
import {requestPokemon, selectNormalizedPoke, selectPokemon, selectPokemonPage, selectPokemonStatus} from "./cardSlice";
import {useEffect, useState} from "react";

export const usePokemonCards = () => {
    const pokemon = useSelector(selectNormalizedPoke)
    const pokemonRequestStatus = useSelector(selectPokemonStatus)
    const dispatch = useDispatch()
    const [page, setPage] = useState(0)

    const requestPage = () => {
        dispatch(requestPokemon(page))
        setPage(page + 1)
    }

    return { pokemon, pokemonRequestStatus, requestPage }
}
