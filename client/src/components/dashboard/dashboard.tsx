import { Typography, Container } from "@mui/material";
import React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { useGetAllUsersQuery } from "../../authapi/authapi";
import TopNavBar from "../layout/topNavBar";

const columns = [
  {
    field: "firstName",
    headerName: "firstName",
    width: 200,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
  },
  {
    field: "email",
    headerName: "email",
    width: 250,
  },
  // {
  //   field: "password",
  //   headerName: "password",
  //   width: 100,
  // },
  {
    field: "createdAt",
    headerName: "createdAt",
    width: 150,
  },
  {
    field: "updatedAt",
    headerName: "updatedAt",
    width: 150,
  },
];

const Dashboard: React.FC = () => {

  const {currentData=[] } = useGetAllUsersQuery();
 console.log("currentdata", currentData);
    
  return (
    <Container>
      <TopNavBar />
      <Typography variant="h3">Home</Typography>
      <DataGrid
        getRowId={(currentData)=>(currentData._id)}
        rows={currentData}
        columns={columns}
        disableRowSelectionOnClick
      />
    </Container>
  );
};

export default Dashboard;
