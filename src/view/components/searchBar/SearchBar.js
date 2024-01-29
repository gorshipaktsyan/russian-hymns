import SearchIcon from "@mui/icons-material/Search";
import StyledComponents from "../../../utils/sharedStyles";
import SearchBarStyledComponents from "./styles";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const { StyledFab } = StyledComponents;
const { SearchedBox } = SearchBarStyledComponents;

function SearchBar() {
  const navigate = useNavigate();
  const isMobile = navigator.maxTouchPoints > 0;

  function handleClick() {
    navigate("/russian-hymns/search");
  }

  return (
    <>
      {!isMobile ? (
        <SearchedBox>
          <Button sx={{ color: "white" }} onClick={handleClick}>
            Поиск
          </Button>
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
