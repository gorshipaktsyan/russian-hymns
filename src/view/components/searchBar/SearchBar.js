import StyledComponents from "../../../utils/sharedStyles";
import SearchBarStyledComponents from "./styles";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";

const { StyledFab } = StyledComponents;
const { SearchedBox, StyledSearchIcon } = SearchBarStyledComponents;

function SearchBar({ isMobile, useArrows }) {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/");
  }

  return (
    <>
      {!isMobile ? (
        <SearchedBox>
          <StyledSearchIcon onClick={handleClick} />
        </SearchedBox>
      ) : (
        <StyledFab
          color="primary"
          aria-label="add"
          onClick={handleClick}
          sx={useArrows && { bottom: "55px !important" }}
        >
          <SearchIcon />
        </StyledFab>
      )}
    </>
  );
}

export default SearchBar;
