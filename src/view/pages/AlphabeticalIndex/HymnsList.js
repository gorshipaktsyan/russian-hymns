import { useMemo } from "react";
import { Divider } from "@mui/material";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import hymns from "../../services/storage/hymns.json";
import SearchIcon from "@mui/icons-material/Search";
import StyledComponents from "../../../utils/sharedStyles";
import filterHymns from "../../../utils/filterHymns";

const { StyledBox, StyledList, StyledFab } = StyledComponents;

function HymnsList({
  handleTitleClick,
  letter,
  handleBackClick,
  isMobile,
  lg,
}) {
  const filteredHymns = useMemo(() => {
    return filterHymns(letter, lg);
  }, [letter]);

  return (
    <StyledBox>
      <StyledList>
        {filteredHymns.map((h, index) => (
          <HymnTitle
            title={
              h.filteredByFirstLetter ? h.first_string : h.chorus_first_string
            }
            number={h.number}
            id={h._id}
            hymnsList={filteredHymns}
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
