import React, { useState } from "react";
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
} from "@mui/material";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([
    { id: 1, name: "User 1" },
    { id: 2, name: "User 2" },
    { id: 3, name: "User 3" },
  ]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessage = () => {
    if (message.trim() !== "") {
      setMessages([
        ...messages,
        { id: messages.length, text: message, senderId: 1 }, // Hardcoded sender ID for now
      ]);
      setMessage("");
    }
  };

  return (
    <Grid container style={{ height: "100vh" }}>
      <Grid item xs={12} sm={3} md={3}>
        <Paper style={{ padding: 20, height: "100%", overflow: "auto" }}>
          <Typography variant="h6" gutterBottom>
            User List
          </Typography>
          <List>
            {users.map((user) => (
              <ListItem button key={user.id}>
                <Avatar style={{ marginRight: 10 }}>
                  {user.name.charAt(0)}
                </Avatar>
                <ListItemText primary={user.name} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>
      <Grid item xs={12} sm={6} md={6}>
        <Paper style={{ padding: 20, height: "100%", overflow: "auto" }}>
          <Typography variant="h5" gutterBottom>
            Chat App
          </Typography>
          <div
            style={{ marginBottom: 20, height: "78vh", overflowY: "scroll" }}
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  marginBottom: 10,
                  textAlign: msg.senderId === 2 ? "right" : "left",
                }}
              >
                <div
                  style={{
                    display: "inline-block",
                    padding: "5px 10px",
                    borderRadius: "10px",
                    backgroundColor: msg.senderId == 2 ? "#DCF8C6" : "#F4F4F4",
                  }}
                >
                  {msg.text}
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
    </Grid>
  );
};

export default Chat;
