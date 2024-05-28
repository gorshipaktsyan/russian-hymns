import { useSelector } from "react-redux";
import ListItem from "../../components/ListItem";
import { setSubtitleId } from "../../../redux/slice/contentSlice";
import FirstStringList from "./FirstStringList";
import { Box } from "@mui/material";
import StyledContentComponents from "./styles";

const { StyledSubList } = StyledContentComponents;

function SubTitlesList({
  titleId,
  subtitleId,
  dispatch,
  scrollToContentTittle,
}) {
  const hymns = useSelector((state) => state.hymns.hymns);
  const subtitles = useSelector((state) => state.subtitles.subtitles);
  const filteredSubtitles = subtitles.filter((sub) => sub.title === titleId);

  function handleSubTitleClick(id) {
    dispatch(setSubtitleId(subtitleId === id ? "" : id));
    scrollToContentTittle(id);
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
              onTitleClick={handleSubTitleClick}
              style={{
                fontWeight: subtitleId === sub._id && "bold",
                fontSize: "15px",
              }}
            />
            {subtitleId === sub._id && (
              <FirstStringList
                firstStringList={hymns.filter((h) => h.subtitle === sub._id)}
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
