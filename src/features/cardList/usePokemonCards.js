import {useDispatch, useSelector} from "react-redux";
import {requestPokemon, selectNormalizedPoke, selectPokemon, selectPokemonPage} from "./cardSlice";
import {useEffect} from "react";

export const usePokemonCards = () => {
    const pokemon = useSelector(selectNormalizedPoke)
    const page = useSelector(selectPokemonPage)
    const dispatch = useDispatch()

    const requestPage = () => {
        dispatch(requestPokemon(page))
    }

    useEffect(() => {
        dispatch(requestPokemon(page))
    }, [])

    return { pokemon, requestPage }
}
