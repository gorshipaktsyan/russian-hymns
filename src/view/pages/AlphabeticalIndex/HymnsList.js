import { Divider } from "@mui/material";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import SearchIcon from "@mui/icons-material/Search";
import StyledComponents from "../../../utils/sharedStyles";
import filterHymnsByLetter from "../../../utils/filterHymnsByLetter";
import { useSelector } from "react-redux";

const { StyledBox, StyledList, StyledFab } = StyledComponents;

function HymnsList({
  handleTitleClick,
  letter,
  handleBackClick,
  isMobile,
  lg,
}) {
  const hymns = useSelector((state) => state.hymns.hymns);
  const filteredHymnsByLetter = filterHymnsByLetter(letter, lg, hymns);

  return (
    <StyledBox>
      <StyledList>
        {filteredHymnsByLetter.map((h, index) => (
          <HymnTitle
            title={
              h.filteredByFirstLetter ? h.first_string : h.chorus_first_string
            }
            number={h.number}
            id={h._id}
            hymnsList={filteredHymnsByLetter}
            index={index}
            BorderBottom={Divider}
            onTitleClick={handleTitleClick}
          />
        ))}
      </StyledList>
      {isMobile && (
        <StyledFab color="primary" aria-label="add" onClick={handleBackClick}>
          <SearchIcon />
        </StyledFab>
      )}
    </StyledBox>
  );
}

export default HymnsList;
