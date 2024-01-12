'use client'
import { Button, Grid, Paper, TextField } from '@mui/material'
import Link from 'next/link'
import React, { useState } from 'react'
import rootServices from '../../RootServices'
const { ENDPOINTS, postReq } = rootServices;
import { useRouter } from "next/navigation";
import { toast } from 'react-toastify'


export default function page() {
    const route = useRouter();
    const [datasource, setDataSource] = useState('')
    const [msgs, setMsgs] = useState('New');

    const onHandleInputs = (e) => {
        setDataSource((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    }
    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await postReq(`${ENDPOINTS.SIGNIN}`, datasource);
        const { token } = res.data?.data || {};
        if (res.status == 200) {
            sessionStorage.setItem('token', token)
            route.replace('/dashboard');
        }
        else if (res?.response?.data?.errMsg && res?.response?.data.errMsg?.length ) {
            toast.info(res.response.data.errMsg[0].msg)
        } else {
            toast.info("Username or Password is incorrect")
        }
    }

    React.useEffect(() => {
        var ws = new WebSocket('ws://localhost:9001/echo');
        
        ws.addEventListener('error', (m) => { console.log("error"); });

        ws.addEventListener('open', (m) => { 
            ws.send('Start Counter')
            console.log("websocket connection open"); 
        });

        ws.addEventListener('message', (m) => { 
            setMsgs(m.data)
         });

    }, [])
    




    return (
        <Paper sx={{ p: 3, mx: 50, my: 10 }}>
            <center><h1 style={{ fontWeight: "bold" }}>LOGIN ACCOUNT</h1></center>
            <h1>{msgs}</h1>
            <Grid container spacing={3}>
                <Grid item xs={12} md={12}>
                    <TextField
                        // sx={{ p:.5 }}
                        fullWidth
                        label="Email"
                        variant="standard"
                        type='text'
                        name='email'
                        value={datasource?.email}
                        onChange={onHandleInputs}
                    />
                </Grid>
                <Grid item xs={12} md={12}>
                    <TextField
                        // sx={{ p:.5 }}
                        fullWidth
                        label="Password"
                        variant="standard"
                        type='password'
                        name='password'
                        value={datasource?.password}
                        onChange={onHandleInputs}
                    />
                </Grid>
                <Grid item xs={12} textAlign={'center'}>
                    <Button variant="contained" color="primary" type="submit"
                        onClick={handleLogin}
                    >
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
