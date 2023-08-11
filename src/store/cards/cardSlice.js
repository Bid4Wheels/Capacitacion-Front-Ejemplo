import {createAsyncThunk, createSelector, createSlice} from '@reduxjs/toolkit';
import {fetchCount, fetchDetails} from "./pokemonAPI";

// Estado inicial del store
const initialState = {
    pokemon: [],
    pokemonRequestStatus: {inProcess: false, error: false}
};

// Esto es un Async thunk. Lo usamos para ejecutar funciones asincronas.
// Luego el estado y resultado de un thunk puede ser visto en los external reducers del slice
// createAsyncThunk recibe como parametros
// typePrefix: Nombre de nuestro thunk. Es utilizado por redux para crear actions
// payloadCreator: La funcion asincrona que queremos correr
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

// Un slice es la principal forma por la que vamos a acceder al store
// Por cada feature es recomendable crear un nuevo slice. De esta forma limitamos el acceso a datos que no se necesitan
// Podemos pensar un slice como un objeto que se va a ir modificando
// La forma de modificar este objeto es mediante acciones
// Las acciones son como un mensaje que se dispara de un objeto en la applicacion.
// Luego esta accion va a ser visible por todos los slices en la app
// Y finalmente un slice va a "atajar" esa action y ejecutarla

// el principal parametro de createSlice es options
// Options es un objeto que puede tener diferentes props (para ver todas las props ir a )
// Las principales props que vamos a utilizar son:
// name: nombre del slice (requerida)
// initialState: estado inicial del store
// reducers: En reducers se va a "atajar" actions que modifican directamente el store.
//  Por ejemplo si tengo un estado inicial { count: 0 }
//  Puedo hacer dispatch (disparar) una accion de sumar
//  Luego si lo definimos en reducers vamos a poder atajar la action
//  Y de esta manera podemos modificar el store
// extraReducers: Cumple una funcion similar a reducers.
// La diferencia es que estos reducers son para atajar estados de async thunks y slices externos
// La mayoria de las veces utilizaremos este reducer para conocer el estado de los thunks
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

// La funcion principal de los normalizers es modificar lo que nos devuelven los selectors.
// Son unicamente un remapeo de las props
const normalizePokemon = (pokemon) => {
    return{
        id: pokemon.id,
        title: pokemon.name,
        content: pokemon.species.name,
        image: pokemon.sprites.front_default
    }
}

// Los selectors son la forma de acceder al store de redux es mediante selectors.
// Los selectors son funciones de esta pinta: (state) => state.cards.pokemon
// Luego utilizaremos esta function en conjunto con useSelector para acceder
export const selectPokemon = (state) => state.cards.pokemon;

// Este selector utiliza un normalizer
// Lo escribimos de esta forma ya que la funcion createSlector optimiza las funciones de normalizacion
// Para crear este tipo de selectors debemos primero definir un selector sin nomralizacion
// En este caso el selector es selectPokemon
// el otro parametro que recibe es una function que nos da como prop el valor que devuelve el selector comun
// Un ejemplo es (result) => normalize(result)
// En este caso particular decidi nomalizar los elementos dentro del array y no el array completo
export const selectNormalizedPoke = createSelector(selectPokemon, (pokemonList) => {
    return pokemonList.map((pokemon, index) => normalizePokemon(pokemon))
})
export const selectPokemonStatus = (state) => state.cards.pokemonRequestStatus

// Debemos exportar el reducer del slice para definir en el store
export default cardSlice.reducer;
