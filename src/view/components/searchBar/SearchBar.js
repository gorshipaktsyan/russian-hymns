import StyledComponents from "../../../utils/sharedStyles";
import SearchBarStyledComponents from "./styles";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const { StyledFab } = StyledComponents;
const { SearchedBox, StyledSearchIcon } = SearchBarStyledComponents;

function SearchBar({ isMobile }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/search");
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
