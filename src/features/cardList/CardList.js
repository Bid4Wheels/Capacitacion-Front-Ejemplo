import React, {useEffect, useRef, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import {Box, Grid} from '@mui/material';
import {usePokemonCards} from "./usePokemonCards";
import useInfiniteScroll from "../../utils/hooks";

export function CardList() {

    const {pokemon, requestPage, pokemonRequestStatus} = usePokemonCards()
    const ref = useRef()

    useInfiniteScroll(ref, requestPage)

    const cardData = [
        { id: 1, title: 'Card 1', content: 'This is the content of card 1.' },
        { id: 2, title: 'Card 2', content: 'This is the content of card 2.' },
        { id: 3, title: 'Card 3', content: 'This is the content of card 3.' },
    ];

    // imgLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`

    // A change
    return (
        <Box paddingBottom={"30px"}>
            <Box display="flex" flexWrap={"wrap"} padding={"20px"} justifyContent={"center"}>
                {pokemon.map((card) => (
                    <Card sx={{ height: '100%', marginRight: '40px', width:"25vw", marginBottom: '20px' }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={card.image}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {card.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {card.content}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
            {!pokemonRequestStatus.inProcess && <Typography variant={"body"} ref={ref}>Load more</Typography>}
            {pokemonRequestStatus.inProcess && <Typography variant={"body"}>Loading...</Typography>}
        </Box>
    );
}
