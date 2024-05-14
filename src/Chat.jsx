import React, { useEffect, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import {
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Avatar,
    Modal,
    Box
} from "@mui/material";

import {
    GetChats,
    GetUsers,
    PostMessage,
    GetChatsById,
    CreateGroup,
    CreateChat,
    DeleteGroup,
    DeleteChat
} from "./api";
import { toaster } from "./utils/toast.util";

const Chat = (props) => {
    const { authUser, onLogout } = props;

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [myUser, setMyUser] = useState(null);
    const [chats, setChats] = useState([]);
    const [open, setOpen] = useState(false);
    const [userList, setUserList] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const [selectedUserIds, setSelectedUserIds] = useState([]);

    useEffect(() => {
        GetChats().then((res) => {
            setChats(res.data.data);

            setCurrentChat(res.data.data[0]);
        });
    }, []);

    useEffect(() => {
        GetUsers().then((res) => {
            setUserList(res.data.data.filter((item) => item.email != authUser));

            setMyUser(res.data.data.find((item) => item.email == authUser));
        });
    }, []);

    useEffect(() => {
        let intervalId = null;
        if (currentChat) {
            /// need this to work to get messages
            GetChatsById(currentChat._id).then((res) => {
                setMessages(res.data.data.messages);
            });

            intervalId = setInterval(
                () =>
                    GetChatsById(currentChat._id).then((res) => {
                        setMessages(res.data.data.messages);
                    }),
                2000
            );
        }

        return () => {
            clearInterval(intervalId);
        };
    }, [currentChat]);

    const handleCreateGroup = () => {
        if (!selectedUserIds.length) {
            toaster({ type: "error", message: "Please select members" });
            return;
        }

        CreateGroup({ name, description }).then((res) => {
            CreateChat({
                type: 1,
                members: selectedUserIds,
                messages: [],
                group: res.data.data._id
            }).then((res) => {
                toaster({ type: "success", message: "Group created!" });
                handleClose();
                setSelectedUserIds([]);
                setName("");
                setDescription("");

                GetChats().then((res) => {
                    setChats(res.data.data);
                });
            });
        });
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSendMessage = () => {
        if (message.trim() !== "") {
            PostMessage(
                {
                    sender: myUser._id,
                    content: message
                },
                currentChat._id
            );

            setMessages((prev) => [
                ...prev,
                {
                    sender: myUser._id,
                    content: message
                }
            ]);

            setMessage("");
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    console.log(currentChat);

    return (
        <Grid container style={{ height: "70vh" }}>
            <Grid item xs={12} sm={3} md={3} lg={4}>
                <Button
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 10, margin: 5 }}
                    onClick={() => setOpen(true)}
                >
                    Create Group
                </Button>
                <Paper style={{ padding: 20, height: "100%", overflow: "auto" }}>
                    <Typography variant="h6" gutterBottom>
                        Chat List
                    </Typography>
                    <List>
                        {chats.map((chat, index) => {
                            return (
                                <ListItem button key={index} onClick={() => setCurrentChat(chat)}>
                                    <Avatar style={{ marginRight: 10 }}>{chat._id[0]}</Avatar>
                                    <ListItemText primary={chat._id} />
                                </ListItem>
                            );
                        })}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5}>
                <Paper style={{ padding: 20, height: "100%", overflow: "auto" }}>
                    <Box display={"flex"} justifyContent={"space-between"} mb={3}>
                        <Typography variant="h5" gutterBottom>
                            Chat App
                        </Typography>

                        <Button
                            variant="outlined"
                            onClick={() => {
                                if (currentChat.group) {
                                    DeleteChat(currentChat._id).then((res) => {
                                        DeleteGroup(currentChat.group).then(() => {
                                            GetChats().then((res) => {
                                                setChats(res.data.data);

                                                setCurrentChat(res.data.data[0]);
                                            });
                                        });
                                    });
                                } else {
                                    DeleteChat(currentChat._id).then((res) => {
                                        GetChats().then((res) => {
                                            setChats(res.data.data);

                                            setCurrentChat(res.data.data[0]);
                                        });
                                    });
                                }
                            }}
                        >
                            Delete CHAT
                        </Button>
                    </Box>

                    <div style={{ marginBottom: 20, height: "78vh", overflowY: "scroll" }}>
                        {messages.map((msg) => (
                            <div
                                key={msg.id}
                                style={{
                                    marginBottom: 10,
                                    textAlign: msg.sender === myUser?._id ? "right" : "left"
                                }}
                            >
                                <div
                                    style={{
                                        display: "inline-block",
                                        padding: "5px 10px",
                                        borderRadius: "10px",
                                        backgroundColor:
                                            msg.sender === myUser?._id ? "#DCF8C6" : "#F4F4F4"
                                    }}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                    </div>
                    <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        value={message}
                        onChange={handleMessageChange}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: 10 }}
                        onClick={handleSendMessage}
                    >
                        Send
                    </Button>
                </Paper>
            </Grid>

            <Grid lg={3} p={5}>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ height: 40, marginBottom: 7 }}
                    onClick={onLogout}
                >
                    Logout
                </Button>

                <Typography variant="h5">MEMBERS</Typography>

                <List>
                    {currentChat.members.map((member, index) => {
                        return (
                            <ListItem key={index}>
                                <Avatar style={{ marginRight: 10 }}>{member.username}</Avatar>
                                <ListItemText primary={member.username} />
                            </ListItem>
                        );
                    })}
                </List>
            </Grid>

            <Modal
                open={open}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={() => {
                    setSelectedUserIds([]);
                    handleClose();
                    setName("");
                    setDescription("");
                }}
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 400,
                        bgcolor: "background.paper",
                        border: "2px solid #000",
                        boxShadow: 24,
                        p: 4
                    }}
                >
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <TextField
                        label="Description"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <List>
                        {userList.map((user, index) => (
                            <ListItem
                                key={index}
                                sx={{ cursor: "pointer" }}
                                onClick={() => {
                                    if (selectedUserIds.includes(user._id)) {
                                        setSelectedUserIds((prev) =>
                                            prev.filter((item) => item !== user._id)
                                        );
                                    } else {
                                        setSelectedUserIds([...selectedUserIds, user._id]);
                                    }
                                }}
                            >
                                <Avatar style={{ marginRight: 10 }}>{user._username}</Avatar>
                                <ListItemText primary={user.username} />

                                {selectedUserIds.includes(user._id) && <CheckIcon />}
                            </ListItem>
                        ))}
                    </List>
                    <Button sx={{ marginTop: 3 }} onClick={handleCreateGroup}>
                        Submit
                    </Button>
                </Box>
            </Modal>
        </Grid>
    );
};

export default Chat;
