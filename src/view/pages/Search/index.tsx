import { FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Snackbar from '@mui/material/Snackbar';

import { setCurrentHymns } from '../../../redux/slice/currentHymnsSlice';
import { setFoundHymns } from '../../../redux/slice/searchSlice';
import { RootState } from '../../../redux/store';
import { hymnsService } from '../../../services';
import { HymnType } from '../../../types';
import { useEnterKeySubmit } from '../../../utils/hooks';
import { StyledComponents } from '../../styles';

import SearchedHymnList from './SearchedHymnList';
import SearchStyledComponents from './styles';

const { StyledAlert } = StyledComponents;
const { StyledForm, StyledSearchButton, StyledTextField } = SearchStyledComponents;

function Search() {
  const [inputs, setInputs] = useState({
    rusNumber: '',
    engNumber: '',
    searchedText: ''
  });
  const [errorAlert, setErrorAlert] = useState(false);
  const { isEngSearchVisible, language } = useSelector((state: RootState) => state.settings);
  const { foundHymns } = useSelector((state: RootState) => state.search);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEnterKeySubmit(handleSubmit);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    let searchedHymns: HymnType[] = [];
    const { rusNumber, engNumber, searchedText } = inputs;

    if (rusNumber) {
      searchedHymns = hymnsService.findSearchedHymns(rusNumber, 'number');
      dispatch(setCurrentHymns(searchedHymns));
    }

    if (engNumber) {
      searchedHymns = hymnsService.findSearchedHymns(engNumber, 'number_eng');
      dispatch(setCurrentHymns(searchedHymns));
    }

    if (searchedText) {
      const foundHymns = hymnsService.findHymnsWithMatchKey(
        searchedText,
        language.regExp.onlyLetters
      );
      if (foundHymns.length) {
        dispatch(setFoundHymns(foundHymns));
        return;
      }
    }

    if (!rusNumber && !engNumber && !searchedText) {
      const randomHymn = hymnsService.findRandomHymn();
      searchedHymns = [randomHymn];
      dispatch(setCurrentHymns([randomHymn]));
    }

    if (searchedHymns.length) {
      const searchedHymnsNumbers = hymnsService.getHymnsNumbers(searchedHymns);
      navigate(`/hymns/${searchedHymnsNumbers}`);
      dispatch(setFoundHymns([]));
    }
    setErrorAlert(true);
    setInputs({ rusNumber: '', engNumber: '', searchedText: '' });
  }

  return (
    <>
      {foundHymns.length ? (
        <SearchedHymnList foundHymns={foundHymns} navigate={navigate} dispatch={dispatch} />
      ) : (
        <StyledForm>
          <StyledTextField
            type="decimal"
            label={language.search.searchByRussianNumber}
            value={inputs.rusNumber}
            inputProps={{
              inputMode: 'decimal',
              pattern: '[0-9]*'
            }}
            onChange={(e) => {
              setInputs({
                rusNumber: e.target.value,
                engNumber: '',
                searchedText: ''
              });
            }}
            autoFocus
          />
          {isEngSearchVisible && (
            <StyledTextField
              type="decimal"
              label={language.search.searchByEnglishNumber}
              value={inputs.engNumber}
              inputProps={{
                inputMode: 'decimal',
                pattern: '[0-9]*'
              }}
              onChange={(e) => {
                setInputs({
                  rusNumber: '',
                  engNumber: e.target.value,
                  searchedText: ''
                });
              }}
            />
          )}
          <StyledTextField
            label={language.search.searchByText}
            value={inputs.searchedText}
            inputProps={{
              inputMode: 'search'
            }}
            onChange={(e) => {
              setInputs({
                rusNumber: '',
                engNumber: '',
                searchedText: e.target.value
              });
            }}
          />
          <StyledSearchButton type="submit" variant="contained" onClick={handleSubmit}>
            <span style={{ fontSize: '16px' }}>{language.search.search}</span>
          </StyledSearchButton>
        </StyledForm>
      )}
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
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
