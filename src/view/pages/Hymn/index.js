import React from "react";
import Box from "@mui/material/Box";
import storage from "../../services/storage/storage.json";
import "./index.scss";

function Hymn({ number }) {
  const hymn = storage.find((h) => Number(h.number) === number);

  return (
    <Box
      sx={{ pt: 10, width: "100%" }}
      dangerouslySetInnerHTML={{ __html: hymn.html }}
    />
  );
}

export default Hymn;
