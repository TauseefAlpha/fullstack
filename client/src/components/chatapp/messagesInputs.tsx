import { Box, Button, TextField } from '@mui/material'
import React, { ChangeEvent, FormEvent, useState } from 'react'
import {Messagevalue} from "./chatapp"

type Iprops = {
  isTyping: boolean;
  socket: any;
  sendMessage: (message:Messagevalue) => void;
};

const MessagesInputs = ({ isTyping, socket, sendMessage }: Iprops) => {
  const [msgvalue, setmsgValue] = useState<Messagevalue>({
    sender: "",
    text: "",
  });

  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    console.log("eventtarget", event.target);
    setmsgValue({
      ...msgvalue,
      [event.target.name]: event.target.value,
    });
    socket.emit("userTyping", { userId: msgvalue.sender, isTyping: true });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    try {
      sendMessage(msgvalue);
      setmsgValue({
        sender: "",
        text: "",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Box textAlign={"center"} component={"form"} onSubmit={handleSubmit}>
      <TextField
        placeholder="name"
        label="Name"
        name="sender"
        fullWidth
        variant="filled"
        sx={{ alignItems: "center" }}
        value={msgvalue.sender}
        onChange={handleChange}
      />

      <TextField
        label="Text"
        variant="filled"
        name="text"
        multiline
        fullWidth
        rows={3}
        maxRows={5}
        value={msgvalue.text}
        onChange={handleChange}
      />
      <Box textAlign={"right"} sx={{ p: "5px 7px" }}>
        <Button
          variant="contained"
          type="submit"
          disabled={!(msgvalue.sender && msgvalue.text)}
        >
          Send
        </Button>
        {isTyping && <p>Someone is typing...</p>}
      </Box>
    </Box>
  );
};

export default MessagesInputs