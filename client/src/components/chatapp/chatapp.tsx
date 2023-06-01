import { Box, Container, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Messages from "./messages";
import MessagesInputs from "./messagesInputs";
import TopNavBar from "../layout/topNavBar";
import { io } from "socket.io-client";

export type Messagevalue = {
  sender: "";
  text: "";
};
const socket = io("http://localhost:3600");

const Chatapp = () => {
  const [messsages, setMessages] = useState<Messagevalue[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    socket.connect()
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    socket.on("userTyping", ({ userId, isTyping }) => {
      setIsTyping(isTyping);
    });

    return () => {
     socket.disconnect();
       socket.off("userTyping");
    };
  }, []);

    const sendMessage = async (message: Messagevalue) => {
      socket.emit("createChat", message);
    };

  return (
    <Container>
      <TopNavBar />
      <Box display={"flex"} justifyContent={"center"} sx={{ mt: 1 }}>
        <Paper
          sx={{
            width: "40vw",
            height: "90vh",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            textAlign={"center"}
            borderRadius="10px"
            bgcolor={"blue"}
            p={2}
            variant="h4"
            color={"white"}
          >
            Chatapp
          </Typography>
          <Box height={"35vw"} width={"40vw"} textAlign={"center"}>
            <Messages messsages={messsages} />
          </Box>
          <MessagesInputs
            isTyping={isTyping}
            socket={socket}
            sendMessage={sendMessage}
          />
        </Paper>
      </Box>
    </Container>
  );
};

export default Chatapp;
