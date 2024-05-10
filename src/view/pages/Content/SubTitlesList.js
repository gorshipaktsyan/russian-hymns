import { useMemo, useEffect } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import hymns from "../../services/storage/hymns.json";
import Subtitles from "../../services/storage/subtitles.json";
import { Box, Divider } from "@mui/material";
import StyledContentComponents from "./styles";
import actions from "../../../redux/actions/actions";

const { StyledSubList, StyledSubHymnsList } = StyledContentComponents;

function SubTitlesList({
  expandedList,
  handleHymnClick,
  ScrollToTittle,
  dispatch,
}) {
  const grouped = useMemo(() => {
    return hymns.filter((hymn) => hymn.title === expandedList.selectedTitleId);
  }, [expandedList.selectedTitleId]);
  const subtitles = useMemo(() => {
    return Subtitles.filter(
      (sub) => sub.title === expandedList.selectedSubtitleId
    );
  }, [expandedList.selectedSubtitleId]);

  function handleSubTitleClick(subtitleId) {
    dispatch({
      type: actions.SET_CONTENT_EXPANDED_LIST,
      payload: {
        selectedSubtitleId:
          expandedList.selectedSubtitleId === subtitleId ? "" : subtitleId,
      },
    });
    ScrollToTittle(subtitleId);
  }

  useEffect(() => {
    dispatch({
      type: actions.SET_CONTENT_EXPANDED_LIST,
      payload: null,
    });
  }, [expanded.selectedTitleId]);

  return (
    <StyledSubList>
      {subtitles.map((sub, index) => {
        const hymns = grouped.filter((h) => h.subtitle === sub._id);
        return (
          <Box key={index}>
            <HymnTitle
              title={sub.name_upper}
              id={sub._id}
              hymnsList={subtitles}
              index={index}
              BorderBottom={Divider}
              onTitleClick={handleSubTitleClick}
              style={{
                fontWeight: selectedSubtitleId === sub._id && "bold",
                fontSize: "15px",
              }}
            />
            {selectedSubtitleId === sub._id && (
              <StyledSubHymnsList>
                {hymns.map((h, index) => (
                  <HymnTitle
                    title={h.first_string}
                    number={h.number}
                    id={h._id}
                    hymnsList={hymns}
                    index={index}
                    BorderBottom={Divider}
                    onTitleClick={handleHymnClick}
                  />
                ))}
              </StyledSubHymnsList>
            )}
          </Box>
        );
      })}
    </StyledSubList>
  );
}

export default SubTitlesList;
