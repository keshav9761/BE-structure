"use client"
import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import Link from 'next/link'
import rootServices from '../../RootServices'
import React, { useEffect } from 'react'
const { getReq, postReq, ENDPOINTS } = rootServices;

export default function page() {
   
    return (
        <Paper sx={{ p: 3, mx: 30, my: 10 }}>
            <center><h1 style={{ fontWeight: "bold" }}>SignUp Page</h1></center>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6} >
                    <TextField
                        // sx={{ p: 1 }}
                        fullWidth
                        variant='standard'
                        label="UserName"
                        type='text'
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField
                        // sx={{ p: 1 }}
                        fullWidth
                        variant='standard'
                        label="Email"
                        type='text'
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField
                        // sx={{ p: 1 }}
                        fullWidth
                        variant='standard'
                        label="Password"
                        type='password'
                    />
                </Grid>
                <Grid item xs={12} md={6} >
                    <TextField
                        // sx={{ p: 1 }}
                        fullWidth
                        variant='standard'
                        label="Email"
                        type='text'
                    />
                </Grid>
                <Grid item xs={12} textAlign={'center'}>
                    <Button variant="contained" color="primary" type="submit" >
                        SignUp
                    </Button>
                </Grid>
                <Grid item color="blue" textAlign={'end'}>
                    <Link href='/login'>login account</Link>
                </Grid>
            </Grid>
        </Paper>
    )
}
