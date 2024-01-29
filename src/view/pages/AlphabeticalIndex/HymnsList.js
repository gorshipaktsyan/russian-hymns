import { useMemo } from "react";
import { Divider } from "@mui/material";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import hymns from "../../services/storage/hymns.json";
import AddIcon from "@mui/icons-material/ArrowBack";
import StyledComponents from "../../../utils/sharedStyles";

const { StyledBox, StyledList, StyledFab } = StyledComponents;

function HymnsList({ handleTitleClick, letter, handleBackClick }) {
  const filteredHymns = useMemo(() => {
    return hymns
      .filter(
        (h) => h.first_letter === letter || h.first_letter_chorus === letter
      )
      .map((hymn) => {
        if (hymn.first_letter === letter) {
          return {
            ...hymn,
            filteredByFirstLetter: true,
          };
        } else {
          return hymn;
        }
      })
      .sort((a, b) =>
        a.filteredByFirstLetter && !b.filteredByFirstLetter
          ? -1
          : b.filteredByFirstLetter && !a.filteredByFirstLetter
          ? 1
          : a.first_string_sort.localeCompare(b.first_string_sort, "ru")
      );
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
      <StyledFab color="primary" aria-label="add" onClick={handleBackClick}>
        <AddIcon />
      </StyledFab>
    </StyledBox>
  );
}

export default HymnsList;
