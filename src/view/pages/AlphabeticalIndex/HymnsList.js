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
    return hymns.filter(
      (h) => h.first_letter === letter || h.first_letter_chorus === letter
    );
  }, [letter]);

  return (
    <StyledBox>
      <StyledList>
        {filteredHymns.map((h, index) => (
          <HymnTitle
            title={h.chorus_first_string || h.first_string}
            number={h.number}
            id={h._id}
            hymnsList={filteredHymns}
            index={index}
            BorderBottom={Divider}
            onTitleClick={handleTitleClick}
          />
        ))}
      </StyledList>
      <StyledFab color="primary" aria-label="add" onClick={handleBackClick}>
        <AddIcon />
      </StyledFab>
    </StyledBox>
  );
}

export default HymnsList;
