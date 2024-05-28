import { useSelector } from "react-redux";
import ListItem from "../../components/ListItem";
import { setSubtitleId } from "../../../redux/slice/contentSlice";
import { filterArray } from "../../../utils/index";
import FirstStringList from "./FirstStringList";
import { Box, Divider } from "@mui/material";
import StyledContentComponents from "./styles";

const { StyledSubList } = StyledContentComponents;

function SubTitlesList({ expandedList, dispatch, scrollToContentTittle }) {
  const hymns = useSelector((state) => state.hymns.hymns);
  const subtitles = useSelector((state) => state.subtitles.subtitles);
  const filteredSubtitles = filterArray(
    subtitles,
    "title",
    expandedList.titleId
  );

  function handleSubTitleClick(subtitleId) {
    dispatch(
      setSubtitleId(expandedList.subtitleId === subtitleId ? "" : subtitleId)
    );
    scrollToContentTittle(subtitleId);
  }

  return (
    <StyledSubList>
      {filteredSubtitles.map((sub, index) => {
        return (
          <Box key={sub._id}>
            <ListItem
              title={sub.name_upper}
              id={sub._id}
              list={filteredSubtitles}
              index={index}
              BorderBottom={Divider}
              onTitleClick={handleSubTitleClick}
              style={{
                fontWeight: expandedList.subtitleId === sub._id && "bold",
                fontSize: "15px",
              }}
            />
            {expandedList.subtitleId === sub._id && (
              <FirstStringList
                firstStringList={filterArray(hymns, "subtitle", sub._id)}
                Divider={Divider}
                dispatch={dispatch}
              />
            )}
          </Box>
        );
      })}
    </StyledSubList>
  );
}

export default SubTitlesList;
