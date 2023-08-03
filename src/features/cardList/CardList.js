import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

export function CardList() {

    const cardData = [
        { id: 1, title: 'Card 1', content: 'This is the content of card 1.' },
        { id: 2, title: 'Card 2', content: 'This is the content of card 2.' },
        { id: 3, title: 'Card 3', content: 'This is the content of card 3.' },
      ];

    // imgLink = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonIndex}.png`

    return (
        <Grid container spacing={2} sx={{ marginTop: '10px', paddingLeft: '10px', paddingRight: '10px'}}>
        {cardData.map((card) => (
          <Grid key={card.id} item xs={12} sm={6} md={4}>
            <Card sx={{ height: '100%' }}>
                <CardMedia
                    component="img"
                    height="140"
                    image="/static/images/cards/contemplative-reptile.jpg"
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
          </Grid>
        ))}
      </Grid>
    );
}