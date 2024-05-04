import StyledComponents from "../../../utils/sharedStyles";
import SearchBarStyledComponents from "./styles";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import actions from "../../../redux/actions/actions";
import { useSelector } from "react-redux";

const { StyledFab } = StyledComponents;
const { SearchedBox, StyledSearchIcon } = SearchBarStyledComponents;

function SearchBar({ searchedHymnsListOpen, dispatch }) {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.hymns.isMobile);

  function handleClick() {
    searchedHymnsListOpen &&
      dispatch({ type: actions.SET_SEARCHED_HYMNS_LIST_OPEN, payload: false });
    navigate("/");
  }
  return (
    <>
      {!isMobile ? (
        <SearchedBox>
          <StyledSearchIcon onClick={handleClick} />
        </SearchedBox>
      ) : (
        <StyledFab color="primary" aria-label="add" onClick={handleClick}>
          <SearchIcon />
        </StyledFab>
      )}
    </>
  );
}

export default SearchBar;
