import { useDispatch, useSelector } from "react-redux";
import SubTitlesList from "./SubTitlesList";
import { StyledComponents, scrollToContentTittle } from "../../../utils";
import ListItem from "../../components/ListItem";
import { setTitleId } from "../../../redux/slice/contentSlice";
import { Box } from "@mui/material";

const { StyledList, StyledBox } = StyledComponents;

function TitlesList() {
  const { titleId, subtitleId } = useSelector((state) => state.content);
  const titles = useSelector((state) => state.titles.titles);
  const dispatch = useDispatch();

  function handleTitleClick(id) {
    dispatch(setTitleId(titleId === id ? "" : id));
    scrollToContentTittle(id);
  }

  return (
    <StyledBox>
      <StyledList>
        {titles.map((title, index) => (
          <Box key={index}>
            <ListItem
              title={title?.name}
              id={title._id}
              list={titles}
              index={index}
              onTitleClick={handleTitleClick}
              style={{
                fontWeight: titleId === title._id && "bold",
              }}
            />
            {titleId === title._id && (
              <SubTitlesList
                titleId={titleId}
                subtitleId={subtitleId}
                dispatch={dispatch}
                scrollToContentTittle={scrollToContentTittle}
              />
            )}
          </Box>
        ))}
      </StyledList>
    </StyledBox>
  );
}

export default TitlesList;
