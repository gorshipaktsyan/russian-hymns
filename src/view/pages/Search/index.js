import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HymnList from "./HymnList";
import Snackbar from "@mui/material/Snackbar";
import { StyledComponents } from "../../../utils/index";
import SearchStyledComponents from "./styles";
import { useDispatch, useSelector } from "react-redux";
import { setIsSearchedHymnsListOpen } from "../../../redux/slice/searchSlice";
import searchTextAndSubmit from "../../../utils/searchTextAndSubmit";
import { useEnterKeySubmit } from "../../../utils/hooks/useKeyboardClick";

const { StyledAlert } = StyledComponents;
const { StyledForm, StyledSearchButton, StyledTextField } =
  SearchStyledComponents;

function Search() {
  const [rusNumber, setRusNumber] = useState("");
  const [engNumber, setEngNumber] = useState("");
  const [searchedText, setSearchedText] = useState("");
  const [errorAlert, setErrorAlert] = useState(false);
  const isEngSearchVisible = useSelector(
    (state) => state.settings.isEngSearchVisible
  );
  const findedHymns = useSelector((state) => state.search.findedHymns);
  const isSearchedHymnsListOpen = useSelector(
    (state) => state.search.isSearchedHymnsListOpen
  );
  const hymns = useSelector((state) => state.hymns.hymns);
  const lg = useSelector((state) => state.settings.language);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEnterKeySubmit(handleSubmit);

  useEffect(() => {
    if (findedHymns.length > 0) {
      dispatch(setIsSearchedHymnsListOpen(true));
    } else if (searchedText) {
      setErrorAlert(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, findedHymns]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleSubmit(e) {
    e.preventDefault();
    searchTextAndSubmit({
      rusNumber,
      engNumber,
      searchedText,
      setRusNumber,
      setEngNumber,
      setSearchedText,
      setErrorAlert,
      lg,
      dispatch,
      navigate,
      hymns,
    });
  }

  function handleTextChange(e) {
    const inputValue = e.target.value;
    setSearchedText(inputValue);
  }

  return (
    <>
      {isSearchedHymnsListOpen ? (
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
        onClose={() => setErrorAlert(false)}
        autoHideDuration={2000}
      >
        <StyledAlert onClose={() => setErrorAlert(false)} severity="error">
          {lg.search.errorAlert}
        </StyledAlert>
      </Snackbar>
    </>
  );
}

export default Search;
