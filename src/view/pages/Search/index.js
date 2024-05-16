import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HymnList from "./HymnList";
import Snackbar from "@mui/material/Snackbar";
import { StyledComponents } from "../../../utils/index";
import SearchStyledComponents from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentNumber } from "../../../redux/slice/currentNumberSlice";
import { setOpenSearchedHymnList } from "../../../redux/slice/searchSlice";
import searchTextAndSubmit from "../../../utils/searchTextAndSubmit";

const { StyledAlert } = StyledComponents;
const { StyledForm, StyledSearchButton, StyledTextField } =
  SearchStyledComponents;

function Search() {
  const [rusNumber, setRusNumber] = useState("");
  const [engNumber, setEngNumber] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [findedHymns, setFindedHymns] = useState([]);
  const [errorAlert, setErrorAlert] = useState(false);
  const isEngSearchVisible = useSelector(
    (state) => state.settings.isEngSearchVisible
  );
  const searchedHymnsListOpen = useSelector(
    (store) => store.search.searchedHymnsListOpen
  );
  const lg = useSelector((state) => state.settings.language);
  const handleClose = () => setErrorAlert(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleSubmit(e) {
    e.preventDefault();
    searchTextAndSubmit(
      rusNumber,
      engNumber,
      searchedText,
      setRusNumber,
      setEngNumber,
      setSearchedText,
      setCurrentNumber,
      setFindedHymns,
      lg,
      dispatch,
      navigate,
      setErrorAlert
    );
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
      dispatch(setOpenSearchedHymnList(true));
    } else if (searchedText) {
      setErrorAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, findedHymns]);

  return (
    <>
      {searchedHymnsListOpen ? (
        <HymnList
          findedHymns={findedHymns}
          navigate={navigate}
          dispatch={dispatch}
        />
      ) : (
        <StyledForm>
          <StyledTextField
            type="decimal"
            label={lg.search.searchByRussianNumber}
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
              label={lg.search.searchByEnglishNumber}
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
            label={lg.search.searchByText}
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
            <span style={{ fontSize: "16px" }}>{lg.search.search}</span>
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
          {lg.search.errorAlert}
        </StyledAlert>
      </Snackbar>
    </>
  );
}

export default Search;
