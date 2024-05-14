import { useMemo, useEffect } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import hymns from "../../services/storage/hymns.json";
import Subtitles from "../../services/storage/subtitles.json";
import { Box, Divider } from "@mui/material";
import StyledContentComponents from "./styles";
import HymnActions from "../../../redux/actions/HymnActions";
import {
  resetContentValues,
  setSubtitleId,
} from "../../../redux/slice/contentSlice";

const { StyledSubList, StyledSubHymnsList } = StyledContentComponents;

function SubTitlesList({
  expandedList,
  handleHymnClick,
  ScrollToTittle,
  dispatch,
}) {
  const grouped = useMemo(() => {
    return hymns.filter((hymn) => hymn.title === expandedList.titleId);
  }, [expandedList.titleId]);

  const subtitles = useMemo(() => {
    return Subtitles.filter((sub) => sub.title === expandedList.titleId);
  }, [expandedList.titleId]);

  function handleSubTitleClick(subtitleId) {
    dispatch(
      setSubtitleId(expandedList.subtitleId === subtitleId ? "" : subtitleId)
    );
    ScrollToTittle(subtitleId);
  }

  // useEffect(() => {
  //   dispatch(resetContentValues());
  // }, [expandedList.titleId, dispatch]);

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
                fontWeight: expandedList.subtitleId === sub._id && "bold",
                fontSize: "15px",
              }}
            />
            {expandedList.subtitleId === sub._id && (
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
