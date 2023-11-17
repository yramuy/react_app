import React, { useEffect, useRef, useState } from "react";
import Layout from "../Layout";
import { Alert, Box, Snackbar } from "@mui/material";
import BoxHeader from "../BoxHeader";
import { useNavigate, useParams } from "react-router-dom";
import Posts from "./Posts";
import { useAuth } from "../auth/Auth";

const AddEditUserPosts = () => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const navigate = useNavigate();
    const { postId } = useParams();
    const [showMsg, setShowMsg] = useState(false);
    const [flashMsg, setFlashMsg] = useState("");
    const { flashMsg1 } = useAuth();

    const inputElement = useRef();
    const textAreaElement = useRef();
    const [error, setError] = useState("");
    const [error1, setError1] = useState("");
    const [show, setShow] = useState(false);

    const handleSave = async (e) => {

        if (title === "") {
            setShow(true);
            setError("Title is required");
            inputElement.current.focus();
            return;

        } else if (body === "") {
            setShow(true);
            setError1("Body is required");
            textAreaElement.current.focus();
            return;
        } else {
            setShow(false);
            const userId = sessionStorage.getItem("userId");

            try {
                await fetch('/ProjectApis/v1/saveUserPosts', {
                    method: 'POST',
                    body: JSON.stringify({
                        loginUserId: userId,
                        title: title,
                        body: body
                    }),
                    headers: {
                        "Authorization": "b8416f2680eb194d61b33f9909f94b9d",
                        "Content-Type": "application/json",
                    },
                }).then((response) => response.json()).then((data) => {

                    if (data.status === 1) {
                        navigate('/posts');
                        console.log(data.message);
                        // setShowMsg(true);
                        flashMsg1(data.message);
                        // setFlashMsg(data.message);
                    } else {
                        setShowMsg(false);
                        navigate('/addEditUserPost');
                    }
                }).catch((err) => {

                });
            } catch (error) {

            }
        }
    }

    const handleUpdate = async () => {
        if (title === "") {
            setShow(true);
            setError("Title is required");
            inputElement.current.focus();
            return;

        } else if (body === "") {
            setShow(true);
            setError1("Body is required");
            textAreaElement.current.focus();
            return;
        } else {
            setShow(false);
            try {
                await fetch('/ProjectApis/v1/updateUserPost', {
                    method: 'POST',
                    body: JSON.stringify({
                        post_id: postId,
                        title: title,
                        body: body
                    }),
                    headers: {
                        "Authorization": "b8416f2680eb194d61b33f9909f94b9d",
                        "Content-Type": "application/json",
                    },
                }).then((response) => response.json()).then((data) => {

                    if (data.status === 1) {
                        navigate('/posts');
                        flashMsg1(data.message);
                    } else {
                        navigate('/addEditUserPost/' + postId);
                    }
                }).catch((err) => {
                    console.log(err.message);
                });
            } catch (error) {

            }
        }
    }

    const handleCancel = () => {
        navigate('/posts');
    }

    useEffect(() => {
        getPostDetails();
    }, [postId]);

    const getPostDetails = async () => {
        try {
            await fetch('/ProjectApis/v1/getUserPostsById', {
                method: 'POST',
                body: JSON.stringify({
                    post_id: postId
                }),
                headers: {
                    "Authorization": "b8416f2680eb194d61b33f9909f94b9d",
                    "Content-Type": "application/json",
                },
            }).then((response) => response.json()).then((data) => {

                const res = data.posts;

                console.log(res)

                if (data.status === 1) {
                    setTitle(res[0].title);
                    setBody(res[0].body);
                }
            }).catch((err) => {

            });
        } catch (error) {

        }
    }

    const handleClose = () => {
        setShowMsg(false);
    }

    return (
        <Layout>
            <div style={{ padding: '10px' }}>

                {
                    postId > 0 ? (
                        <h3 style={{ textAlign: 'start', marginLeft: '10px', paddingBottom: '10px' }}>Edit Post</h3>
                    ) : (
                        <h3 style={{ textAlign: 'start', marginLeft: '10px', paddingBottom: '10px' }}>Add Posts</h3>
                    )
                }

                {
                    showMsg && (
                        <Snackbar open={showMsg} autoHideDuration={3000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                                {
                                    flashMsg
                                }
                            </Alert>
                        </Snackbar>
                    )
                }

                <form>
                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Title</label>
                        <div class="col-sm-8">
                            <input
                                type="text"
                                ref={inputElement}
                                class="form-control"
                                id="name"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}

                                />
                            {
                                show && (
                                    <span style={{marginLeft: '30px', color: 'red'}}>{error}</span>
                                )
                            }
                            
                        </div>
                        
                    </div>

                    <div class="row mb-3">
                        <label for="inputEmail3" class="col-sm-4 col-form-label">Body</label>
                        <div class="col-sm-8">
                            <textarea
                                ref={textAreaElement}
                                class="form-control"
                                id="exampleFormControlTextarea1"
                                rows="5"
                                value={body}
                                onChange={(e) => setBody(e.target.value)}
                            />
                            {
                                show && (
                                    <span style={{marginLeft: '30px', color: 'red'}}>{error1}</span>
                                )
                            }
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '10px', marginLeft: '50%' }}>
                        {
                            postId > 0 ? (
                                <button type="button" class="btn btn-primary" onClick={handleUpdate}>Update</button>
                            ) : (
                                <button type="button" class="btn btn-primary" onClick={handleSave}>Save</button>
                            )
                        }

                        <button type="button" class="btn btn-secondary" onClick={handleCancel}>Cancel</button>
                    </div>
                </form>
            </div>
        </Layout>
    );
};

export default AddEditUserPosts;