import React, { useEffect, useState } from "react";
import {
    TextField,
    Button,
    Grid,
    Paper,
    Typography,
    List,
    ListItem,
    ListItemText,
    Avatar
} from "@mui/material";

import { GetChats, GetUsers, GetMessagesById, PostMessage, GetChatsById } from "./api";

const Chat = (props) => {
    const { authUser, onLogout } = props;

    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [myUser, setMyUser] = useState(null);
    const [chats, setChats] = useState([]);

    const [currentChat, setCurrentChat] = useState(null);

    useEffect(() => {
        GetChats().then((res) => {
            setChats(res.data.data);

            setCurrentChat(res.data.data[0]);
        });
    }, []);

    useEffect(() => {
        GetUsers().then((res) => {
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

    return (
        <Grid container style={{ height: "70vh" }}>
            <Grid item xs={12} sm={3} md={3} lg={4}>
                <Paper style={{ padding: 20, height: "100%", overflow: "auto" }}>
                    <Typography variant="h6" gutterBottom>
                        Chat List
                    </Typography>
                    <List>
                        {chats.map((chat, index) => (
                            <ListItem button key={index} onClick={() => setCurrentChat(chat)}>
                                <Avatar style={{ marginRight: 10 }}>{chat._id[0]}</Avatar>
                                <ListItemText primary={chat._id} />
                            </ListItem>
                        ))}
                    </List>
                </Paper>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={5}>
                <Paper style={{ padding: 20, height: "100%", overflow: "auto" }}>
                    <Typography variant="h5" gutterBottom>
                        Chat App
                    </Typography>
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

            <Grid lg={3} p={5} justifyContent={"flex-end"} display={"flex"}>
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ height: 40 }}
                    onClick={onLogout}
                >
                    Logout
                </Button>
            </Grid>
        </Grid>
    );
};

export default Chat;
