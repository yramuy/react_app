import React, { useReducer, useState } from "react";
import Layout from "../Layout";
import BoxHeader from "../BoxHeader";
import { Alert, Autocomplete, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Snackbar, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";
import { Button, Table } from "react-bootstrap";
import { useEffect } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import AddCircleOutlineSharpIcon from '@mui/icons-material/AddCircleOutlineSharp';
import { useAuth } from "../auth/Auth";

const reducer = (state, action) => {

    if (action.type === 'LIST') {

        return {
            ...state,
            userPosts: action.payload.data,
            flashMessage: { show: action.payload.show, message: action.payload.message },

        };
    }
    if (action.type === 'AUTOCOMPLETE') {

        return {
            ...state,
            autoComPost: action.payload,
        };
    }

    if (action.type === 'OPEN_DELETE_DIALOG') {

        return {
            ...state,
            flag: true,
            deleteUserId: action.payload
        }
    }

    if (action.type === 'CLOSE') {

        return {
            ...state,
            flag: action.payload,
            flashMessage: { show: action.payload.flashMsg, message: action.payload.msg },
        }

    }

    if (action.type === 'DELETE') {

        return {
            ...state,
            userPosts: action.payload.data,
            flashMessage: { show: action.payload.flashMsg, message: action.payload.msg },
            flag: false,
        }

    }

    if (action.type === 'INPUT') {
        return {
            ...state,
            userPostId: action.payload[0]['user_id'],
            userPostName: action.payload[0]['user_name'],
        }
    }

    if (action.type === "SEARCH") {

        return {
            ...state,
            userPosts: action.payload
        }
    }

    if (action.type === "RESET") {

        return {
            ...state,
            userPostId: action.payload
        }
    }

    return state;
}

const Posts = () => {

    const initialState = {
        userPosts: [],
        autoComPost: [],
        flag: false,
        deleteUserId: "",
        sno: 1,
        userPostId: "",
        userPostName: "",
        search: false,
        flashMessage: { show: false, message: "" },
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const navigate = useNavigate();
    const { flash,flashMsg1 } = useAuth();

    useEffect(() => {
        fetchUserPosts();
        GetAutoCompleteUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        const loginUserId = sessionStorage.getItem('userId');
        try {
            await fetch('/ProjectApis/v1/GetUserPosts', {
                method: 'POST',
                body: JSON.stringify({
                    loginUserId: state.userPostId
                }),
                headers: {
                    "Authorization": "b8416f2680eb194d61b33f9909f94b9d",
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {
                if (data.status === 1) {
                    // dispatch({ type: 'LIST', payload: data.UserPosts });
                    dispatch({ type: 'LIST', payload: { show: true, message: flash, data: data.UserPosts }});
                    flashMsg1("");
                } else {
                    dispatch({ type: 'LIST', payload: [] });
                }
            }).catch((err) => {
                console.log(err.message)
            });
        } catch (error) {
            console.log(error.message)
        }
    }

    const GetAutoCompleteUserPosts = async () => {
        const loginUserId = sessionStorage.getItem('userId');
        try {
            await fetch('/ProjectApis/v1/GetAutoCompleteUserPosts', {
                method: 'POST',
                body: JSON.stringify({
                    loginUserId: loginUserId
                }),
                headers: {
                    "Authorization": "b8416f2680eb194d61b33f9909f94b9d",
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {
                if (data.status === 1) {
                    dispatch({ type: 'AUTOCOMPLETE', payload: data.UserPosts });
                } else {
                    dispatch({ type: 'AUTOCOMPLETE', payload: [] });
                }
            }).catch((err) => {
                console.log(err.message)
            });
        } catch (error) {
            console.log(error.message)
        }
    }

    const DeleteDialog = (id) => {
        dispatch({ type: 'OPEN_DELETE_DIALOG', payload: id });
    }

    const handleClose = () => {
        dispatch({ type: 'CLOSE', payload: false });
    }

    const handleDelete = async () => {

        try {
            await fetch('/ProjectApis/v1/DeleteUserPosts', {
                method: 'POST',
                body: JSON.stringify({
                    post_id: state.deleteUserId
                }),
                headers: {
                    "Authorization": "b8416f2680eb194d61b33f9909f94b9d",
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {

                if (data.status === 1) {
                    fetchUserPosts();
                    dispatch({ type: 'DELETE', payload: { data: data.UserPosts, msg: data.message, flashMsg: true } });
                    // dispatch({ type: 'FLASH', payload: true });
                    
                }else{
                    dispatch({ type: 'DELETE', payload: { data: data.UserPosts, msg: data.message, flashMsg: false } });
                }
            }).catch((err) => {
                console.log(err.message)
            });
        } catch (error) {
            console.log(error.message)
        }
        // dispatch({ type: 'DELETE', payload: false });
    }

    const AddUserPosts = () => {
        navigate('/addEditUserPost');
    }

    const handleChangeValue = (value) => {
        const usersList = state.autoComPost.filter((option) => {
            return option.user_name === value;
        });

        console.log(usersList)

        dispatch({ type: "INPUT", payload: usersList });
    }

    const handleSearch = () => {

        fetchUserPosts();
    }

    const handleReset = () => {
        dispatch({ type: "RESET", payload: "" });
        fetchUserPosts();
    }

    return (
        <Layout>

            <div className="container">

                <div style={{ padding: '10px' }}>
                    <div class="row">
                        <div class="col-6 col-md-2">
                            <Autocomplete
                                onChange={(event, value) =>
                                    handleChangeValue(value)

                                } // prints the selected value
                                freeSolo
                                id="free-solo-2-demo"
                                disableClearable
                                options={state.autoComPost.map((option) => option.user_name)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="User Post"
                                        InputProps={{
                                            ...params.InputProps,
                                            type: 'search',
                                        }}

                                    />
                                )


                                }

                            />

                        </div>
                        <div class="col-6 col-md-3 p-3" style={{ display: 'flex', gap: '10px' }}>
                            <button type="button" class="btn btn-primary" onClick={handleSearch}>Search</button>
                            <button type="button" class="btn btn-secondary" onClick={handleReset}>Reset</button>
                        </div>
                    </div>
                </div>


                <Box sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>
                    <div>

                        <BoxHeader title="User Posts" />
                        {/* {
                            state.flashMessage.show && (
                        <flashMessage  onClose={handleClose} in={state.flash} timeout={{ enter: 300, exit: 1000 }}>
                            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                                {
                                    state.flashMessage.message
                                }
                            </Alert>
                        </flashMessage>
                    )
                        } */}
                        {
                            state.flashMessage.message !== "" ? (
                                <Snackbar open={state.flashMessage.show} autoHideDuration={6000} onClose={handleClose}  textAlign="right">
                                    <Alert onClose={handleClose} severity="info" sx={{ width: '100%', vertical: 'bottom', horizontal: 'center' }}>
                                        {
                                            state.flashMessage.message
                                        }
                                    </Alert>
                                </Snackbar>
                            ): ("")

                            /* state.flashMessage.show && (
                                <Snackbar open={state.flashMessage.show} autoHideDuration={3000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                                        {
                                            state.flashMessage.message
                                        }
                                    </Alert>
                                </Snackbar>
                            ) */

                            
                        }
                        <IconButton sx={{ color: 'green', float: 'right' }} onClick={AddUserPosts}>{<AddCircleOutlineSharpIcon />}</IconButton>
                        <div className="box-content">

                            <TableContainer component={Paper} sx={{ maxHeight: 440 }}>

                                <Table sx={{ minWidth: 600 }} aria-label="simple table" stickyHeader id="users">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>S No</TableCell>
                                            <TableCell>Post Id</TableCell>
                                            <TableCell>User Name</TableCell>
                                            <TableCell>Title</TableCell>
                                            <TableCell>Body</TableCell>
                                            <TableCell>Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {
                                            state.userPosts.length > 0 ? state.userPosts.map((posts, index) => (
                                                <TableRow key={posts.id}>
                                                    <TableCell>{index+1}</TableCell>
                                                    <TableCell>{posts.id}</TableCell>
                                                    <TableCell>{posts.user_name}</TableCell>
                                                    <TableCell>{posts.title}</TableCell>
                                                    <TableCell>{posts.body}</TableCell>
                                                    <TableCell>
                                                        <NavLink to={`/addEditUserPost/${posts.id}`}>
                                                            <IconButton>
                                                                <EditIcon />
                                                            </IconButton>
                                                        </NavLink>
                                                        <NavLink onClick={() => DeleteDialog(posts.id)}>
                                                            <IconButton sx={{ color: 'red' }}>
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </NavLink>
                                                    </TableCell>
                                                </TableRow>
                                            )) : (
                                                <TableRow>
                                                    <TableCell colSpan='6'>No records found!</TableCell>
                                                </TableRow>
                                            )
                                        }
                                    </TableBody>

                                </Table>
                            </TableContainer>

                        </div>

                    </div>
                </Box>
            </div>

            <Dialog
                open={state.flag}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description">
                <DialogTitle id="alert-dialog-title">
                    {"Delete Confirmation"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <Alert severity="error">Are you sure want to delete ?</Alert>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} style={{ background: 'grey' }}>Cancel</Button>
                    <Button onClick={handleDelete} autoFocus style={{ background: 'red' }}>Delete</Button>
                </DialogActions>
            </Dialog>
        </Layout>
    );
};

export default Posts;