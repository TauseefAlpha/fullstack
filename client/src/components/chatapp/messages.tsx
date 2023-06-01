import { List, ListItem, ListItemText, ListSubheader } from '@mui/material';
import React from 'react'
import {Messagevalue} from "./chatapp"

type mesgIprops = {
  messsages:Messagevalue[];
};

const Messages = ({ messsages }: mesgIprops) => {

  console.log("messages", messsages);
  return (
    <List
      sx={{
        marginLeft: "10px",
        overflow: "auto",
        maxHeight: "21vw",
        maxWidth: 530,
        bgcolor: "background.paper",
        position: "relative",
        "& ul": { padding: 0 },
      }}
    >
      <ListSubheader>{`I'm sticky chat apper below `}</ListSubheader>
      {messsages.map((msg, ind) => (
        <ListItem key={ind}>
 <ListItemText >{msg.text}</ListItemText>
        </ListItem>
      ))}
    </List>
  );
};

export default Messages