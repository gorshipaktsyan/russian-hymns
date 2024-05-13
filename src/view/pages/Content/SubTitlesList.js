import { useMemo, useEffect } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import hymns from "../../services/storage/hymns.json";
import Subtitles from "../../services/storage/subtitles.json";
import { Box, Divider } from "@mui/material";
import StyledContentComponents from "./styles";
import HymnActions from "../../../redux/actions/HymnActions";

const { StyledSubList, StyledSubHymnsList } = StyledContentComponents;

function SubTitlesList({
  expandedList,
  handleHymnClick,
  ScrollToTittle,
  dispatch,
}) {
  const grouped = useMemo(() => {
    return hymns.filter(
      (hymn) => hymn.title === expandedList.contentSelectedTitleId
    );
  }, [expandedList.contentSelectedTitleId]);

  const subtitles = useMemo(() => {
    return Subtitles.filter(
      (sub) => sub.title === expandedList.contentSelectedTitleId
    );
  }, [expandedList.contentSelectedTitleId]);

  function handleSubTitleClick(subtitleId) {
    dispatch({
      type: HymnActions.SET_CONTENT_EXPANDED_LIST,
      payload: {
        contentSelectedSubtitleId:
          expandedList.contentSelectedSubtitleId === subtitleId
            ? ""
            : subtitleId,
      },
    });
    ScrollToTittle(subtitleId);
  }

  useEffect(() => {
    dispatch({
      type: HymnActions.SET_CONTENT_EXPANDED_LIST,
      payload: null,
    });
  }, [expandedList.contentSelectedTitleId, dispatch]);

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
                fontWeight:
                  expandedList.contentSelectedSubtitleId === sub._id && "bold",
                fontSize: "15px",
              }}
            />
            {expandedList.contentSelectedSubtitleId === sub._id && (
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
