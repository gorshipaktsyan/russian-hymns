import { StyledComponents } from "../../../utils";
import SearchBarStyledComponents from "./styles";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import { setIsSearchedHymnsListOpen } from "../../../redux/slice/searchSlice";

const { StyledFab } = StyledComponents;
const { SearchedBox, StyledSearchIcon } = SearchBarStyledComponents;

function SearchBar({ dispatch }) {
  const navigate = useNavigate();
  const isMobile = useSelector((state) => state.settings.isMobile);

  function handleClick() {
    dispatch(setIsSearchedHymnsListOpen(false));
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
