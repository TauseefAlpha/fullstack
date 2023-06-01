import {
  Avatar,
  Box,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { FormEvent, useState } from "react";
import TopNavBar from "../layout/topNavBar";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { useNavigate } from "react-router-dom";
import { useAddbookMutation } from "../../bookapi/bookcurdapi";

interface createbook {
  title: string;
  author: string;
}

const Addbook: React.FC = () => {
  const [book, setBook] = useState<createbook>({
    title: "",
    author: "",
  });
  //redux tookqit qurey mutation
  const [addBook] = useAddbookMutation();
  const navigate = useNavigate();

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    const updatedBook = { ...book, [name]: value };
    setBook(updatedBook);
  }

  async function handlebook(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      const response = await addBook(book);
      if (response) {
        setBook({
          ...book,
          title: "",
          author: "",
        });
        alert("booked successfully added");
        navigate("/booklist");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
      <TopNavBar />

      <Box
        display={"flex"}
        justifyContent={"center"}
        alignContent={"center"}
        sx={{
          backgroundImage: "url('./imgs/imgbg.jpg')",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          height: "100vh",
        }}
      >
        <Paper
          sx={{
            bgcolor: "",
            width: 300,
            p: 10,
            height: "50vh",
            borderRadius: "15px",
            mt: 8,
          }}
        >
          <Grid
            container
            direction={"column"}
            spacing={6}
            alignItems={"center"}
            component={"form"}
            onSubmit={handlebook}
          >
            <Typography variant="h4" mb="4">
              Add BOOK
            </Typography>
            <Grid item>
              <Avatar>
                <MenuBookIcon color="warning" />
              </Avatar>
            </Grid>
            <Grid item>
              <TextField
                name="title"
                variant="outlined"
                label="book name"
                value={book?.title}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item sx={{ mb: "8" }}>
              <TextField
                name="author"
                variant="outlined"
                label="Author name"
                value={book?.author}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item>
              <Button variant="contained" color="warning" type="submit">
                Add Book
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
};

export default Addbook;
