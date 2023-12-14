import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import hymns from "../../services/storage/hymns.json";
import Button from "@mui/material/Button";
import { TextField, styled } from "@mui/material";
import persistentStore from "../../services/PersistentStore";
import "./index.scss";
import HymnList from "./HymnList";

const StyledForm = styled("div")({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  marginTop: "5%",
});

const StyledButton = styled(Button)({
  background: "black",
  "&:hover": {
    background: "grey",
  },
});
const StyledTextField = styled(TextField)({
  marginBottom: "1%",
  "& input": {
    "-webkit-appearance": "none",
    margin: "0",
  },
  "& input::-webkit-outer-spin-button, & input::-webkit-inner-spin-button": {
    "-webkit-appearance": "none",
    margin: "0",
  },
});

function Search({ setCurrentNumber }) {
  const [rusNumber, setRusNumber] = useState("");
  const [engNumber, setEngNumber] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  function searchRussianNumber(HYMN_OBJECT) {
    setCurrentNumber(Number(rusNumber));
    HYMN_OBJECT.number = Number(rusNumber);
  }
  function searchEnglishNumber(HYMN_OBJECT) {
    const hymn = hymns.find((h) => h.number_eng === Number(engNumber));
    setCurrentNumber(hymn.number);
    HYMN_OBJECT.number = hymn.number;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const currentData = new Date();
    const searchedNumbers = persistentStore.get("searchedNumbers") || [];
    let HYMN_OBJECT = { number: "", date: currentData };
    if (rusNumber) {
      searchRussianNumber(HYMN_OBJECT);
    } else if (engNumber) {
      searchEnglishNumber(HYMN_OBJECT);
    } else if (searchedText) {
      setOpen(true);
      return;
    } else {
      const randomNumber = Math.floor(Math.random() * 800);
      setCurrentNumber(Number(randomNumber));
      HYMN_OBJECT.number = Number(randomNumber);
    }
    const UPDATED_HYMNS = [...searchedNumbers, HYMN_OBJECT];
    persistentStore.set("searchedNumbers", UPDATED_HYMNS);
    navigate("/russian-hymns");
  }

  return (
    <StyledForm>
      <StyledTextField
        type="number"
        name="search"
        label="поиск по русскому  номеру"
        value={rusNumber}
        onChange={(e) => setRusNumber(e.target.value)}
      />
      <StyledTextField
        type="number"
        name="search"
        label="поиск по английскому номеру"
        value={engNumber}
        onChange={(e) => setEngNumber(e.target.value)}
      />
      <StyledTextField
        name="search"
        label="поиск по тексту"
        value={searchedText}
        onChange={(e) => setSearchedText(e.target.value)}
      />
      <StyledButton type="submit" variant="contained" onClick={handleSubmit}>
        Поиск
      </StyledButton>
      <HymnList
        open={open}
        setOpen={setOpen}
        searchedText={searchedText}
        setCurrentNumber={setCurrentNumber}
        navigate={navigate}
      />
      ;
    </StyledForm>
  );
}

export default Search;
