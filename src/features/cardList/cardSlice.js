import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {fetchCount, fetchDetails} from "./pokemonAPI";

const initialState = {
    pokemon: [],
    pokemonRequestStatus: {inProcess: false, error: false}
};

export const requestPokemon = createAsyncThunk(
    'poke/requestList',
    async (page) => {
        const {data: { results }} = await fetchCount(page);
        return await Promise.all(results.map(async (pokemon, index) => {
            const {data} = await fetchDetails(index + (page * 12) + 1)
            return data
        }))
    }
)

export const cardSlice = createSlice({
    name: 'cards',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(requestPokemon.pending, (state) => {
                state.pokemonRequestStatus = {inProcess: true, error: false}
            })
            .addCase(requestPokemon.rejected, (state) => {
                state.pokemonRequestStatus = {inProcess: false, error: true}
            })
            .addCase(requestPokemon.fulfilled, (state, action) => {
                state.pokemonRequestStatus = {inProcess: false, error: false}
                state.pokemon = state.pokemon.concat(action.payload)
            })
    }
})

const normalizePokemon = (pokemon) => {
    return{
        id: pokemon.id,
        title: pokemon.name,
        content: pokemon.species.name,
        image: pokemon.sprites.front_default
    }
}

export const selectPokemon = (state) => state.cards.pokemon;
export const selectNormalizedPoke = createSelector(selectPokemon, (pokemonList) => {
    return pokemonList.map((pokemon, index) => normalizePokemon(pokemon))
})
export const selectPokemonStatus = (state) => state.cards.pokemonRequestStatus


export default cardSlice.reducer;
