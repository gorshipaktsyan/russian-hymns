import { useState, useMemo, useEffect } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import hymns from "../../services/storage/hymns.json";
import Subtitles from "../../services/storage/subtitles.json";
import { Box, Divider } from "@mui/material";
import StyledContentComponents from "./styles";

const { StyledSubList, StyledSubHymnsList } = StyledContentComponents;

function SubTitlesList({
  selectedTitle,
  handleHymnClick,
  ScrollToTittle,
  fontSize,
}) {
  const [expandedSub, setExpandedSub] = useState(null);
  const grouped = useMemo(() => {
    return hymns.filter((hymn) => hymn.title === selectedTitle);
  }, [selectedTitle]);
  const subtitles = useMemo(() => {
    return Subtitles.filter((sub) => sub.title === selectedTitle);
  }, [selectedTitle]);

  function handleSubTitleClick(subtitleId) {
    setExpandedSub((prevSubtitleId) =>
      prevSubtitleId === subtitleId ? null : subtitleId
    );
    ScrollToTittle(subtitleId);
  }

  useEffect(() => {
    setExpandedSub(false);
  }, [selectedTitle]);

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
                fontWeight: expandedSub === sub._id && "bold",
                fontSize: "15px",
              }}
            />
            {!!expandedSub && expandedSub === sub._id && (
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
