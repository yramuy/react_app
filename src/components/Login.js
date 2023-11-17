import React, { useState } from "react";
import { Alert, Box, Button, Card, CardActionArea, CardContent, CardMedia, Container, Snackbar, TextField } from '@mui/material';
import UserImg from '../images/user1.jpg';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "./auth/Auth";
import { usersObj } from "../json/users";

const Login = () => {

    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { login } = useAuth();
    const [users, setUsers] = useState(usersObj);
    const [showMsg, setShowMsg] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();

        // check if array contains object
        // const isFound = users.some(data => {
        //     if (data.name === userName && data.password === password) {
        //         login(data.id, data.name, data.role);
        //         // Assign value to a key
        //         sessionStorage.setItem("userId", data.id);
        //         sessionStorage.setItem("userName", data.name);
        //         sessionStorage.setItem("userRole", data.role);
        //         return true;
        //     }

        //     return false;
        // });

        // if (isFound) {

        //     setShowMsg(false);
        //     navigate('/home', { replace: true });
        //     console.log('✅array contains object with id = 1');

        // } else {

        //     setShowMsg(true);
        //     navigate('/', {replace: true});
        // }

        // console.log(showMsg);

        try {
            await fetch('/ProjectApis/v1/loginWithMobNumOrUsrname', {
                method: 'POST',
                body: JSON.stringify({
                    mobnumber: "",
                    username: userName,
                    password: password,
                }),
                headers: {
                    "Authorization": "b8416f2680eb194d61b33f9909f94b9d",
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {

                if (data.status === 1) {

                    const userData = data.userDetails;
                    sessionStorage.setItem("userId", userData.user_id);
                    sessionStorage.setItem("userName", userData.user_name);
                    sessionStorage.setItem("userRoleId", userData.user_role_id);
                    sessionStorage.setItem("userRole", userData.role_name);
                    sessionStorage.setItem("userImg", userData.image);
                    sessionStorage.setItem("empName", userData.emp_name);
                    sessionStorage.setItem("empNumber", userData.emp_number);

                    setShowMsg(false);
                    navigate('/home', { replace: true });
                } else {
                    setShowMsg(true);
                    navigate('/', { replace: true });
                }

                console.log(data.message);

            }).catch((err) => {
                console.log(err.message);
            });
        } catch (error) {
            console.log(error.message);
        }

    }

    const handleClose = () => {
        setShowMsg(false);
    }

    return (
        <>
            <Container className="login-container" maxWidth="sm">
                <Card style={{ marginTop: '70px', width: '400px', marginLeft: '60px' }}>
                    <CardActionArea>
                        <CardMedia>
                            <img src={UserImg} alt="Avator" />
                        </CardMedia>
                        <CardContent>
                            <form>
                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <input
                                        type="text"
                                        label="Username"
                                        id="username"
                                        name="username"
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}

                                    />
                                </Box>
                                <br />
                                <Box
                                    sx={{
                                        width: 500,
                                        maxWidth: '100%',
                                    }}
                                >
                                    <input
                                        type="password"
                                        label="Password"
                                        id="password"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}

                                    />
                                </Box>
                                <br />
                                <Button type="button" variant="contained" name='btnLogin' onClick={handleLogin}>Login</Button>
                            </form>

                        </CardContent>
                    </CardActionArea>
                </Card>
                {
                    showMsg && (
                        <Snackbar open={showMsg} autoHideDuration={3000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                                Invalid Username or Password!
                            </Alert>
                        </Snackbar>
                    )
                }
            </Container>
        </>
    );
};

export default Login;