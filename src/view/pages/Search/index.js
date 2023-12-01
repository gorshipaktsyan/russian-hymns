import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField, styled } from "@mui/material";
import "./index.scss";

const StyledForm = styled("form")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "10%",
});
const StyledButton = styled(Button)({
  margin: "1%",
});

function Search({ setCurrentNumber }) {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();
  function handleSubmit(e) {
    e.preventDefault();
    setCurrentNumber(number);
    navigate("/russian-hymns");
  }

  function handleChange(e) {
    setNumber(e.target.value);
  }

  return (
    <StyledForm onSubmit={handleSubmit}>
      <TextField
        name="search"
        label="Поиск"
        value={number}
        placeholder="Поиск"
        onChange={(e) => handleChange(e)}
        fullwidth="true"
      />
      <StyledButton type="submit" variant="contained" fullwidth="true">
        Поиск
      </StyledButton>
    </StyledForm>
  );
}

export default Search;
