import React, { useState } from 'react';
import { AppBar, Box, Typography, Toolbar } from '@mui/material';

export function Header() {

    return (
        <Box sx={{flexGrow: 1, width: '100%'}}>
            <AppBar position="static" color="primary">
            <Toolbar>
                <Typography variant="h1" sx={{ flexGrow: 1 }}>
                    Pokedex
                </Typography>
            </Toolbar>
            </AppBar>
        </Box>
    );

}
