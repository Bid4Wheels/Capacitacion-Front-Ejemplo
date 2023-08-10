import React, {useEffect, useRef, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, Grid, Button} from '@mui/material';
import {usePokemonCards} from "./hooks/usePokemonCards";
import useInfiniteScroll from "../../utils/hooks";
import {cardApiSlice, useGetPokemonList, useGetPokemonListQuery} from "../../store/cards/cardApiSlice";

export function CardList() {
    // const {pokemon, requestPage, pokemonRequestStatus} = usePokemonCards()
    const [page, setPage] = useState(0)
    const {data, error, isFetching} = useGetPokemonListQuery(page)
    const ref = useRef()

    useInfiniteScroll(ref, () => setPage(page + 1))

    const cardData = [
        { id: 1, title: 'Card 1', content: 'This is the content of card 1.' },
        { id: 2, title: 'Card 2', content: 'This is the content of card 2.' },
        { id: 3, title: 'Card 3', content: 'This is the content of card 3.' },
    ];
    console.log(data)

    // imgLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`

    return (
        <Box paddingBottom={"30px"}>
            <Box display="flex" flexWrap={"wrap"} padding={"20px"} justifyContent={"center"}>
                {data && data.map((card, index) => (
                    <Card key={index} sx={{ height: '100%', marginRight: '40px', width:"25vw", marginBottom: '20px' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={card.image}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h5">
                                {card.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {card.content}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            {(!isFetching && data) && <Typography variant={"body"} ref={ref}>Load more</Typography>}
            {isFetching && <Typography variant={"body"}>Loading...</Typography>}
        </Box>
    );
}
