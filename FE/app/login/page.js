import { Button, Grid, Paper, TextField } from '@mui/material'
import Link from 'next/link'
import React from 'react'

export default function page() {
    return (
        <Paper sx={{ p: 3, mx: 50, my: 10 }}>
            <center><h1 style={{ fontWeight: "bold" }}>LOGIN ACCOUNT</h1></center>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TextField
                        // sx={{ p:.5 }}
                        fullWidth
                        label="Email"
                        variant="standard"
                        type='text'
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        // sx={{ p:.5 }}
                        fullWidth
                        label="Password"
                        variant="standard"
                        type='password'
                    />
                </Grid>
                <Grid item xs={12} textAlign={'center'}>
                    <Button variant="contained" color="primary" type="submit" >
                        Login
                    </Button>
                </Grid>
                <Grid item color="blue" textAlign={'end'}>
                    <Link href='/signup'>Create account</Link>
                </Grid>
                <Grid item color="blue" textAlign={'end'}>
                    <Link href='/forgetPassword'>Forget Password</Link>
                </Grid>
            </Grid>
        </Paper>
    )
}
