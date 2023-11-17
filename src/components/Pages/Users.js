import { Alert, Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Layout from "../Layout";
import { useEffect, useState } from "react";
import BoxHeader from "../BoxHeader";
import { NavLink } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, Modal } from 'react-bootstrap';
import EditUser from "./EditUser";
import { useNavigate } from "react-router-dom";

const Users = () => {
    const [list, setList] = useState([]);
    const [flag, setFlag] = useState(false);
    const [userId, setUserId] = useState("");
    const [username,setUsername] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers('https://jsonplaceholder.typicode.com/users');
    }, []);

    // fetch users 
    const fetchUsers = async (url) => {
        try {
            const response = await fetch(url);
            const data = await response.json();
            setList(data);
            console.log(data);

        } catch (error) {
            console.log(error);
        }
    };

    // delete user
    const DeleteDialog = (id,name) => {
        setFlag(true);
        setUserId(id);
        setUsername(name);
    }

    const handleClose = () => {
        setFlag(false);
    }

    const handleDelete = () => {

        const usersList = list.filter((deleteUser) => {
            return deleteUser.id !== userId;
        });

        setList(usersList);
        setFlag(false);

        // console.log("user id ", userId);
    }

    return (

        <Layout>
            <Box sx={{ width: '100%', overflow: 'hidden', padding: '10px' }}>
                <div>
                    <BoxHeader title="Users List" />
                    <div className="box-content">
                        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>

                            <Table sx={{ minWidth: 600 }} aria-label="simple table" stickyHeader id="users">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Id</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell>Username</TableCell>
                                        <TableCell>Email</TableCell>
                                        <TableCell>Phone</TableCell>
                                        <TableCell>Website</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        list.length > 0 ? list.map((data) => (
                                            <TableRow key={data.id}>
                                                <TableCell component="th" scope="row">{data.id}</TableCell>
                                                <TableCell>{data.name}</TableCell>
                                                <TableCell>{data.username}</TableCell>
                                                <TableCell>{data.email}</TableCell>
                                                <TableCell>{data.phone}</TableCell>
                                                <TableCell>{data.website}</TableCell>
                                                <TableCell>
                                                    <NavLink to={`/editUser/${data.id}`} >
                                                        <IconButton>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </NavLink>
                                                    <NavLink onClick={() => DeleteDialog(data.id,data.name)}>
                                                        <IconButton sx={{ color: 'red' }}>
                                                            <DeleteIcon />
                                                        </IconButton>
                                                    </NavLink>
                                                </TableCell>
                                            </TableRow>
                                        )) : (<TableRow>
                                            <TableCell colSpan='7'><strong>No records found!</strong></TableCell>
                                        </TableRow>)
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </div>
                    <Dialog
                        open={flag}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description">
                        <DialogTitle id="alert-dialog-title">
                            {"Delete Confirmation"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Alert severity="error">Are you sure want to delete <strong>{username}</strong>?</Alert>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose} style={{ background: 'grey' }}>Cancel</Button>
                            <Button onClick={handleDelete} autoFocus style={{ background: 'red' }}>Delete</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            </Box>


        </Layout>
    );
}

export default Users;