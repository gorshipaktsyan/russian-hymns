import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HymnList from "./HymnList";
import hymns from "../../services/storage/hymns.json";
import Snackbar from "@mui/material/Snackbar";
import StyledComponents from "../../../utils/sharedStyles";
import SearchStyledComponents from "./styles";
import findText from "../../../utils/findText";

const { StyledAlert } = StyledComponents;
const { StyledForm, StyledSearchButton, StyledTextField } =
  SearchStyledComponents;

function Search({
  setCurrentNumber,
  openSearchedHymnList,
  setOpenSearchedHymnList,
  englishSearch,
}) {
  const [rusNumber, setRusNumber] = useState("");
  const [engNumber, setEngNumber] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [findedHymns, setFindedHymns] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const handleClose = () => setErrorAlert(false);
  const navigate = useNavigate();

  function searchRussianNumber() {
    return findSearchedNumbers(rusNumber, "number");
  }
  function searchEnglishNumber() {
    return findSearchedNumbers(engNumber, "number_eng");
  }
  function findSearchedNumbers(input, property) {
    const numbers = input.split(",").map((num) => Number(num.trim()));
    const matchingHymns = hymns.filter((h) => numbers.includes(h[property]));
    const resultNumbers = matchingHymns.map((h) => h.number);
    resultNumbers.length && setCurrentNumber(resultNumbers);
    return resultNumbers;
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleSubmit(e) {
    e.preventDefault();
    let number;
    if (rusNumber) {
      number = searchRussianNumber();
    } else if (engNumber) {
      number = searchEnglishNumber();
    } else if (searchedText) {
      setFindedHymns(findText(searchedText));
      return;
    } else {
      const randomNumber = Math.floor(Math.random() * 800);
      setCurrentNumber([randomNumber]);
      number = [randomNumber];
    }
    if (number.length) {
      navigate(`/hymns/${[number]}`);
    }
    setErrorAlert(true);
    setRusNumber("");
    setEngNumber("");
    setSearchedText("");
  }
  function handleTextChange(e) {
    const inputValue = e.target.value;
    setSearchedText(inputValue);
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        handleSubmit(event);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleSubmit]);
  useEffect(() => {
    if (findedHymns.length > 0) {
      setOpenSearchedHymnList(true);
    } else if (searchedText) {
      setErrorAlert(true);
    }
  }, [findedHymns]);

  return (
    <>
      {openSearchedHymnList ? (
        <HymnList
          findedHymns={findedHymns}
          setCurrentNumber={setCurrentNumber}
          navigate={navigate}
        />
      ) : (
        <StyledForm>
          <StyledTextField
            type="decimal"
            label="Поиск по русскому  номеру"
            value={rusNumber}
            inputProps={{
              inputMode: "decimal",
              pattern: "[0-9]*",
            }}
            onChange={(e) => {
              setRusNumber(e.target.value);
              setEngNumber("");
              setSearchedText("");
            }}
            autoFocus
          />
          {englishSearch && (
            <StyledTextField
              type="decimal"
              label="Поиск по английскому номеру"
              value={engNumber}
              inputProps={{
                inputMode: "decimal",
                pattern: "[0-9]*",
              }}
              onChange={(e) => {
                setEngNumber(e.target.value);
                setRusNumber("");
                setSearchedText("");
              }}
            />
          )}
          <StyledTextField
            label="Поиск по тексту"
            value={searchedText}
            inputProps={{
              inputMode: "search",
            }}
            onChange={(e) => {
              handleTextChange(e);
              setRusNumber("");
              setEngNumber("");
            }}
          />
          <StyledSearchButton
            type="submit"
            variant="contained"
            onClick={handleSubmit}
          >
            <span style={{ fontSize: "16px" }}>Поиск</span>
          </StyledSearchButton>
        </StyledForm>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorAlert}
        onClose={handleClose}
        autoHideDuration={2000}
      >
        <StyledAlert onClose={handleClose} severity="error">
          Соответствующий гимн не найден!
        </StyledAlert>
      </Snackbar>
    </>
  );
}

export default Search;
