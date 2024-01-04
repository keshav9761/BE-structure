"use client"
import React, { useEffect, useRef } from 'react'
import { Button, Grid, Paper, TextField } from '@mui/material'
import rootServices from '../../RootServices';
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify';
const { ENDPOINTS, getReq } = rootServices;

export default function page() {
    const emailRef = useRef();
    const route = useRouter();
    const handleForgetPwd = async () => {
            const res = await getReq(ENDPOINTS.FORGETPWD, { email: emailRef.current?.value }, "asParams");
            if(res.status === 200) {
                toast.success(res.data?.msg);
                route.replace('/login')
            }
    }

    return (
        <Paper sx={{ p: 3, mx: 50, my: 10 }} justifyContent={'center'}>
            <center><h1 style={{ fontWeight: "bold" }}>LOGIN ACCOUNT</h1></center>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TextField
                        inputRef={emailRef}
                        // sx={{ p:.5 }}
                        fullWidth
                        label="Email"
                        name="email"
                        variant="standard"
                        type='text'
                        
                    />
                </Grid>
                {/* <Grid item xs={12} md={12}>
                    <TextField
                        // sx={{ p:.5 }}
                        fullWidth
                        label="Password"
                        variant="standard"
                        type='password'
                    />
                </Grid> */}
                <Grid item xs={12} textAlign={'center'}>
                    <Button variant="contained" color="primary"
                    onClick={handleForgetPwd} >
                        Reset Password
                    </Button>
                </Grid>
                <Grid item color="blue" textAlign={'end'}>
                    {/* <Link href='/signup'>Create account</Link> */}
                </Grid>
            </Grid>
        </Paper>
    )
}
