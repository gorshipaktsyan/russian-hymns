import { useMemo } from "react";
import { Divider } from "@mui/material";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import hymns from "../../services/storage/hymns.json";
import SearchIcon from "@mui/icons-material/Search";
import StyledComponents from "../../../utils/sharedStyles";

const { StyledBox, StyledList, StyledFab } = StyledComponents;

function HymnsList({ handleTitleClick, letter, handleBackClick, isMobile }) {
  const filteredHymns = useMemo(() => {
    const removeSymbols = (text) => text.replace(/[^a-zA-Zа-яА-ЯёЁ]/g, "");
    return hymns
      .filter(
        (h) => h.first_letter === letter || h.first_letter_chorus === letter
      )
      .map((hymn) => {
        if (hymn.first_letter === letter) {
          return {
            ...hymn,
            filteredByFirstLetter: true,
            filteredText: removeSymbols(hymn.first_string),
          };
        } else {
          return {
            ...hymn,
            filteredText: removeSymbols(hymn.chorus_first_string),
          };
        }
      })
      .sort((a, b) => {
        return a.filteredText.localeCompare(b.filteredText, "ru", {
          sensitivity: "base",
        });
      });
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
