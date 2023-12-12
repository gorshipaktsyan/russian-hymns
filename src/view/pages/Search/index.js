import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import { TextField, styled } from "@mui/material";
import persistentStore from "../../services/PersistentStore";
import "./index.scss";

const StyledForm = styled("form")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "10%",
});

const StyledButton = styled(Button)({
  background: "black",
  margin: "1%",
  "&:hover": {
    background: "grey",
  },
});

function Search({ setCurrentNumber, setIsHymnPage }) {
  const [number, setNumber] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const currentData = new Date();
    setCurrentNumber(Number(number));
    const searchedNumbers = persistentStore.get("searchedNumbers") || [];
    // const numbers = [...new Set([Number(number), ...searchedNumbers])];
    const HYMN_OBJECT = { number: Number(number), date: currentData };
    const UPDATED_HYMNS = [...searchedNumbers, HYMN_OBJECT];

    persistentStore.set("searchedNumbers", UPDATED_HYMNS);
    navigate("/russian-hymns");
    setIsHymnPage(true);
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
        onChange={handleChange}
        fullwidth="true"
      />
      <StyledButton type="submit" variant="contained" fullwidth="true">
        Поиск
      </StyledButton>
    </StyledForm>
  );
}

export default Search;
