import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SearchedHymnList from "./SearchedHymnList";
import {
  setFoundHymns,
  setIsSearchedHymnsListOpen,
} from "../../../redux/slice/searchSlice";
import { setCurrentNumber } from "../../../redux/slice/currentNumberSlice";
import { useEnterKeySubmit } from "../../../utils/hooks";
import { clearInputs } from "../../../utils";
import { hymnsService } from "../../../services";
import { StyledComponents } from "../../styles";
import Snackbar from "@mui/material/Snackbar";
import SearchStyledComponents from "./styles";

const { StyledAlert } = StyledComponents;
const { StyledForm, StyledSearchButton, StyledTextField } =
  SearchStyledComponents;

function Search() {
  const [rusNumber, setRusNumber] = useState("");
  const [engNumber, setEngNumber] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const { isEngSearchVisible, language } = useSelector(
    (state) => state.settings
  );
  const { foundHymns, isSearchedHymnsListOpen } = useSelector(
    (state) => state.search
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEnterKeySubmit(handleSubmit);

  useEffect(() => {
    if (foundHymns.length > 0) {
      dispatch(setIsSearchedHymnsListOpen(true));
    } else if (searchedText) {
      setErrorAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, foundHymns]);

  function handleSubmit(e) {
    e.preventDefault();
    let number = [];
    if (rusNumber) {
      number = hymnsService.findSearchedHymns(rusNumber, "number");
      dispatch(setCurrentNumber([number]));
    } else if (engNumber) {
      number = hymnsService.findSearchedHymns(engNumber, "number_eng");
      dispatch(setCurrentNumber([number]));
    } else if (searchedText) {
      const foundHymns = hymnsService.findHymnsWithMatchKey(
        searchedText,
        language.regExp.onlyLetters
      );
      foundHymns.length && dispatch(setFoundHymns(foundHymns));
      return;
    } else {
      number = [Math.floor(Math.random() * 800)];
      dispatch(setCurrentNumber(number));
    }
    if (number.length) {
      navigate(`/hymns/${number}`);
      dispatch(setFoundHymns([]));
    }
    setErrorAlert(true);
    clearInputs(setRusNumber, setEngNumber, setSearchedText);
  }

  function handleTextChange(e) {
    const inputValue = e.target.value;
    setSearchedText(inputValue);
  }

  return (
    <>
      {isSearchedHymnsListOpen ? (
        <SearchedHymnList
          foundHymns={foundHymns}
          navigate={navigate}
          dispatch={dispatch}
        />
      ) : (
        <StyledForm>
          <StyledTextField
            type="decimal"
            label={language.search.searchByRussianNumber}
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
          {isEngSearchVisible && (
            <StyledTextField
              type="decimal"
              label={language.search.searchByEnglishNumber}
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
            label={language.search.searchByText}
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
            <span style={{ fontSize: "16px" }}>{language.search.search}</span>
          </StyledSearchButton>
        </StyledForm>
      )}
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errorAlert}
        onClose={() => setErrorAlert(false)}
        autoHideDuration={2000}
      >
        <StyledAlert onClose={() => setErrorAlert(false)} severity="error">
          {language.search.errorAlert}
        </StyledAlert>
      </Snackbar>
    </>
  );
}

export default Search;
