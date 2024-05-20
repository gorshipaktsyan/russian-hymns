import { useNavigate } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import SubTitlesList from "./SubTitlesList";
import { StyledComponents, scrollToContentTittle } from "../../../utils/index";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { useDispatch, useSelector } from "react-redux";
import { setTitleId } from "../../../redux/slice/contentSlice";
import { setCurrentNumber } from "../../../redux/slice/currentNumberSlice";

const { StyledList, StyledBox } = StyledComponents;

function TitlesList() {
  const expandedList = useSelector(
    (state) => state.content.contentExpandedList
  );
  const titles = useSelector((state) => state.titles.titles);
  const fontSize = useSelector((state) => state.settings.fontSize);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleTitleClick(id) {
    dispatch(setTitleId(expandedList.titleId === id ? "" : id));
    scrollToContentTittle(id);
  }

  function handleHymnClick(id) {
    dispatch(setCurrentNumber([id]));
    navigate(`/hymns/${id}`);
  }

  return (
    <StyledBox>
      <StyledList>
        {titles.map((title, index) => (
          <Box key={index}>
            <HymnTitle
              title={title?.name}
              id={title._id}
              hymnsList={titles}
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
                handleHymnClick={handleHymnClick}
                fontSize={fontSize}
                dispatch={dispatch}
              />
            )}
          </Box>
        ))}
      </StyledList>
    </StyledBox>
  );
}

export default TitlesList;
