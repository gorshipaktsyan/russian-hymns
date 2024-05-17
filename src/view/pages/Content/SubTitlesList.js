import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { Box, Divider } from "@mui/material";
import StyledContentComponents from "./styles";
import { setSubtitleId } from "../../../redux/slice/contentSlice";
import { useSelector } from "react-redux";
import filterBy from "../../../utils/filterBy";

const { StyledSubList, StyledSubHymnsList } = StyledContentComponents;

function SubTitlesList({
  expandedList,
  handleHymnClick,
  ScrollToTittle,
  dispatch,
}) {
  const hymns = useSelector((state) => state.hymns.hymns);
  const subtitles = useSelector((state) => state.subtitles.subtitles);
  const filteredSubtitles = filterBy(subtitles, "title", expandedList.titleId);
  function handleSubTitleClick(subtitleId) {
    dispatch(
      setSubtitleId(expandedList.subtitleId === subtitleId ? "" : subtitleId)
    );
    ScrollToTittle(subtitleId);
  }

  return (
    <StyledSubList>
      {filteredSubtitles.map((sub, index) => {
        const filteredHymnsBySub = filterBy(hymns, "subtitle", sub._id);
        return (
          <Box key={index}>
            <HymnTitle
              title={sub.name_upper}
              id={sub._id}
              hymnsList={filteredSubtitles}
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
                {filteredHymnsBySub.map((h, index) => (
                  <HymnTitle
                    title={h.first_string}
                    number={h.number}
                    id={h._id}
                    hymnsList={filteredSubtitles}
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
