import React from "react";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import TopNavBar from "../layout/topNavBar";

function About() {
  return (
    <Box
      sx={{
        backgroundImage: "url('./imgs/book.jpg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        height: "100vh",
      }}
    >
      <TopNavBar />
      <Typography textAlign={"center"} variant="h4" component="h4" color={"white"} p={4}>
        About screen
      </Typography>
      <Typography color={"white"} p={4}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
        repellendus adipisci esse sequi commodi. Aliquam provident quibusdam,
        similique beatae eum numquam dolorem a rerum perferendis delectus odio
        natus dolore illo! lo Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Quaerat quos reiciendis voluptatum iusto, quas rem accusantium sit
        dolor aliquid recusandae quibusdam totam eos magni enim nemo fuga
        placeat. Aut, ea. Lorem, ipsum dolor sit amet consectetur adipisicing
        elit. Modi atque facere consectetur quae! Dolorem suscipit magnam
        impedit quae magni doloribus, sint qui aut recusandae accusantium
        molestiae quos architecto! Est, dolor!
      </Typography>
    </Box>
  );
}

export default About;
