import { useMemo } from "react";
import { Divider } from "@mui/material";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import hymns from "../../services/storage/hymns.json";
import AddIcon from "@mui/icons-material/ArrowBack";
import StyledComponents from "../../../utils/sharedStyles";

const { StyledBox, StyledList, StyledFab } = StyledComponents;
const renderHymnTitle = (h, index, titleProperty, onTitleClick) => (
  <HymnTitle
    title={h[titleProperty]}
    number={h.number}
    id={h._id}
    hymnsList={h}
    index={index}
    BorderBottom={Divider}
    onTitleClick={onTitleClick}
  />
);

function HymnsList({ handleTitleClick, letter, handleBackClick }) {
  const filteredHymns = useMemo(() => {
    const hymnsWithFirstLetter = [];
    const hymnsWithChorusFirstLetter = [];
    hymns.filter((h) => {
      if (h.first_letter === letter) {
        hymnsWithFirstLetter.push(h);
        return;
      } else if (h.first_letter_chorus === letter) {
        hymnsWithChorusFirstLetter.push(h);
      }
    });
    return {
      firstLetter: hymnsWithFirstLetter,
      chorusFirstLetter: hymnsWithChorusFirstLetter,
    };
  }, [letter]);

  return (
    <StyledBox>
      <StyledList>
        {filteredHymns.firstLetter.map((h, index) =>
          renderHymnTitle(h, index, "first_string", handleTitleClick)
        )}
        {filteredHymns.chorusFirstLetter.map((h, index) =>
          renderHymnTitle(h, index, "chorus_first_string", handleTitleClick)
        )}
      </StyledList>
      <StyledFab color="primary" aria-label="add" onClick={handleBackClick}>
        <AddIcon />
      </StyledFab>
    </StyledBox>
  );
}

export default HymnsList;
