import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import TopNavBar from "../layout/topNavBar";
import { Link } from "react-router-dom";
import Updatebook from "../updatebook/updatebook";
import {useDeleteBookMutation,useGetallBooksQuery} from "../../bookapi/bookcurdapi"

const Bookist: React.FC = () => {

  
  const [deleteBook] = useDeleteBookMutation();
  const getbooks = useGetallBooksQuery();
  console.log("allbooks",getbooks.currentData);
  const { currentData = [] } = useGetallBooksQuery();


  async function handleDelete(id: any) {
    try {
     const response = await deleteBook(id)
     const data=(response as { data: any }).data;
     getbooks.refetch()
      // setBooks(books.filter((val: any) => val._id !== data._id));
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  }

  return (
    <Box>
      <TopNavBar />
      <Box display={"flexbox"} justifyContent={"space-around"}>
        <Typography align="center" variant="h3">
          Book list
        </Typography>
        <Box textAlign={"right"} sx={{ marginRight: "2" }}>
          <Button
            sx={{ textDecorationLine: "none" }}
            variant="outlined"
            color="secondary"
          >
            <Link to="/addbook">Add new Book</Link>
          </Button>
        </Box>
      </Box>
      <hr />
      <Grid container spacing={4} direction={"row"} padding={6}>
        {currentData.length > 0 &&
          currentData.map((book: any) => (
            <Grid item xs={12} md={4} key={book._id}>
              <Card sx={{ maxWidth: 300 }}>
                <CardHeader
                  sx={{ backgroundColor: "grey" }}
                  avatar={<Avatar>R</Avatar>}
                  title={`${book.author}`}
                  subheader={`ISBN${book._id}`}
                />
                <CardContent>
                  <Typography>{book.title} </Typography>
                  <Typography>
                    Published By:{book.user.firstName}{" "} {book.user.lastName}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    color="primary"
                    onClick={() => handleDelete(book._id)}
                  >
                    Delete
                  </Button>

                  <Updatebook
                    id={book._id}
                    title={book.title}
                    author={book.author}
                  />
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Box>
  );
};

export default Bookist;
