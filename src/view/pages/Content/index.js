import { useDispatch, useSelector } from "react-redux";
import SubTitlesList from "./SubTitlesList";
import { StyledComponents, scrollToContentTittle } from "../../../utils/index";
import ListItem from "../../components/ListItem";
import { setTitleId } from "../../../redux/slice/contentSlice";
import { Box, Divider } from "@mui/material";

const { StyledList, StyledBox } = StyledComponents;

function TitlesList() {
  const expandedList = useSelector(
    (state) => state.content.contentExpandedList
  );
  const titles = useSelector((state) => state.titles.titles);
  const dispatch = useDispatch();

  function handleTitleClick(id) {
    dispatch(setTitleId(expandedList.titleId === id ? "" : id));
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
              BorderBottom={Divider}
              onTitleClick={handleTitleClick}
              style={{
                fontWeight: expandedList.titleId === title._id && "bold",
              }}
            />
            {expandedList.titleId === title._id && (
              <SubTitlesList
                expandedList={expandedList}
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
