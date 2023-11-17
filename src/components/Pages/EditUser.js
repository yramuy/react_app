import React, { useState } from "react";
import Layout from "../Layout";
import { Box, Grid, InputLabel } from "@mui/material";
import BoxHeader from "../BoxHeader";
import { useNavigate, useParams } from "react-router-dom";
import { Button, FormControl, Stack } from "react-bootstrap";
import { useEffect } from "react";

const EditUser = () => {
    const { userId } = useParams();
    const navigate = useNavigate();
    const [userObj, setUserObj] = useState([]);
    const [list, setList] = useState([]);

    const [name, setName] = useState('');
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [website, setWebsite] = useState('');


    useEffect(() => {
        fetchUsers('https://jsonplaceholder.typicode.com/users');
    }, []);

    const fetchUsers = async (url) => {

        const response = await fetch(url);
        const data = await response.json();
        // setList(data);

        const usersList = data.find((editUser) => {
            return editUser.id == userId;

        });

        setName(usersList.name);
        setUserName(usersList.username);
        setEmail(usersList.email);
        setPhone(usersList.phone);
        setWebsite(usersList.website);
    }

    const handleCancelbtn = () => {
        navigate('/users');
    }

    const handleUpdate = () => {
        
    }

    return (
        <>
            <Layout>

                <div style={{ padding: '10px' }}>

                    <h3 style={{ textAlign: 'start', marginLeft: '10px', paddingBottom: '10px' }}>Edit User</h3>

                    <form>
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-4 col-form-label">Name</label>
                            <div class="col-sm-8">
                                <input 
                                type="text" 
                                class="form-control" 
                                id="name" 
                                value={name}
                                onChange={(e) => setName(e.target.value)}

                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-4 col-form-label">User Name</label>
                            <div class="col-sm-8">
                                <input 
                                type="text" 
                                class="form-control" 
                                id="username" 
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-4 col-form-label">Email</label>
                            <div class="col-sm-8">
                                <input 
                                type="email" 
                                class="form-control" 
                                id="email"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-4 col-form-label">Phone</label>
                            <div class="col-sm-8">
                                <input 
                                type="text" 
                                class="form-control" 
                                id="phone"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                 />
                            </div>
                        </div>
                        <div class="row mb-3">
                            <label for="inputEmail3" class="col-sm-4 col-form-label">Website</label>
                            <div class="col-sm-8">
                                <input 
                                type="text" 
                                class="form-control" 
                                id="website" 
                                value={website}    
                                onChange={(e) => setWebsite(e.target.value)}
                                />
                            </div>
                        </div>
                        <div style={{display: 'flex', gap: '10px', marginLeft: '30%'}}>
                        <button type="button" class="btn btn-primary" onClick={handleUpdate}>Update</button>
                        <button type="button" class="btn btn-secondary" onClick={handleCancelbtn}>Cancel</button>
                        </div>
                    </form>
                </div>

            </Layout>
        </>
    )
};

export default EditUser;