"use client"
import { Box, Button, Grid, Paper, TextField } from '@mui/material'
import Link from 'next/link'
import rootServices from '../../RootServices'
import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
const { getReq, postReq, ENDPOINTS } = rootServices;

export default function page() {
    const route = useRouter();
    const [formData, setFormData] = useState({})
    const onInputHandle = (e) => {
        setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }))
    }
    const onSubmitData = async (e) => {
        e.preventDefault();
        console.log(">>>>signup", formData);
        if (!formData?.email || !formData?.password || !formData?.username) return toast.error("All fields are required")
        const res = await postReq(ENDPOINTS.SIGNUP, formData)
    
        if (res?.status == 201) {
            route.replace('/login')
        }
        else {
            const err = res?.response?.data?.errMsg;
            toast.error(Array.isArray(err) ? err[0]?.msg : err)
        } 
    }
    return (
        <Paper sx={{ p: 3, mx: 30, my: 10 }}>
            <center><h1 style={{ fontWeight: "bold" }}>SignUp Page</h1></center>
            <Grid container spacing={3}>

                <Grid item xs={12} md={12} >
                    <TextField
                        // sx={{ p: 1 }}
                        fullWidth
                        variant='standard'
                        label="UserName"
                        type='text'
                        name='username'
                        value={formData?.username}
                        onChange={onInputHandle}
                    />
                </Grid>
                <Grid item xs={12} md={12} >
                    <TextField
                        // sx={{ p: 1 }}
                        fullWidth
                        variant='standard'
                        label="Email"
                        type='text'
                        name='email'
                        value={formData?.email}
                        onChange={onInputHandle}
                    />
                </Grid>
                <Grid item xs={12} md={12} >
                    <TextField
                        // sx={{ p: 1 }}
                        fullWidth
                        variant='standard'
                        label="Password"
                        type='password'
                        name='password'
                        value={formData?.password}
                        onChange={onInputHandle}
                    />
                </Grid>

                <Grid item xs={12} textAlign={'center'}>
                    <Button variant="contained" color="primary" type="submit" onClick={onSubmitData}>
                        SignUp
                    </Button>
                </Grid>

            </Grid>
            <Grid item color="blue" textAlign={'end'}>
                <Link href='/login'>login account</Link>
            </Grid>
        </Paper>
    )
}
