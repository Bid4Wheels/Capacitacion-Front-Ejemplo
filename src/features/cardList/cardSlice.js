import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {fetchCount} from "./pokemonAPI";

const initialState = {
    pokemon: [],
    pokemonRequestStatus: {inProcess: false, error: false},
    page: 0
};

export const requestPokemon = createAsyncThunk(
    'poke/requestList',
    async (page) => {
        const {data} = await fetchCount(page);
        return data
    }
)

export const cardSlice = createSlice({
    name: 'cards',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(requestPokemon.pending, (state) => {
                state.pokemonReqestStatus = {inProcess: true, error: false}
            })
            .addCase(requestPokemon.rejected, (state) => {
                state.pokemonRequestStatus = {inProcess: false, error: true}
            })
            .addCase(requestPokemon.fulfilled, (state, action) => {
                state.pokemonRequestStatus = {inProcess: false, error: false}
                state.pokemon = state.pokemon.concat(action.payload.results)
                state.page = state.page + 1
            })
    }
})

const normalizePokemon = (pokemon, index) => {
    return{
        id: index,
        title: pokemon?.name
    }
}

export const selectPokemon = (state) => state.cards.pokemon;
export const selectNormalizedPoke = createSelector(selectPokemon, (pokemonList) => {
    return pokemonList.map((pokemon, index) => normalizePokemon(pokemon, index))
})
export const selectPokemonPage = (state) => state.cards.page;


export default cardSlice.reducer;
