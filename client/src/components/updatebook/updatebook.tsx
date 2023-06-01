import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useState, MouseEvent } from "react";
import {
  useUpdateBookMutation,
} from "../../bookapi/bookcurdapi";

export interface createbook {
  title: string;
  author: string;
}
type Iprops = {
  id: string;
  title: string;
  author: string;
};

const Updatebook = ({ id, title, author }: Iprops) => {
  const [open, setOpen] = useState<boolean>(false);
  const [book, setBook] = useState<createbook>({
    title: title,
    author: author,
  });

  const [updateBook] = useUpdateBookMutation();
 

  function handleClickOpen(event: MouseEvent<HTMLButtonElement>): void {
    setOpen(true);
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    const updatedBook = { ...book, [name]: value };
    setBook(updatedBook);
  }

  async function handleUpdate() {
    try {
      await updateBook({ id, book });
      setOpen(false);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Box>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ marginInlineStart: 10 }}
      >
        Update
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update book</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="title"
            label="Book title"
            type="text"
            fullWidth
            value={book.title}
            onChange={handleChange}
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            name="author"
            label="Book Author"
            type="text"
            fullWidth
            value={book.author}
            onChange={handleChange}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleUpdate}>Update</Button>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Updatebook;
