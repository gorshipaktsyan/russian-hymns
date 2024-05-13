import { useNavigate } from "react-router-dom";
import { Box, Divider } from "@mui/material";
import SubTitlesList from "./SubTitlesList";
import StyledComponents from "../../../utils/sharedStyles";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import titles from "../../services/storage/titles.json";
import { useDispatch, useSelector } from "react-redux";
import HymnActions from "../../../redux/actions/HymnActions";

const { StyledList, StyledBox } = StyledComponents;

function TitlesList({ fontSize }) {
  const expandedList = useSelector((state) => state.hymns.contentExpandedList);
  console.log(expandedList);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  function ScrollToTittle(id) {
    const element = document.getElementById(id);
    setTimeout(
      () =>
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        }),
      100
    );
  }
  function handleTitleClick(id) {
    dispatch({
      type: HymnActions.SET_CONTENT_EXPANDED_LIST,
      payload: {
        contentSelectedTitleId:
          expandedList.contentSelectedTitleId === id ? "" : id,
      },
    });
    ScrollToTittle(id);
  }

  function handleHymnClick(id) {
    dispatch({
      type: HymnActions.SET_CURRENT_NUMBER,
      payload: [id],
    });
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
                fontWeight:
                  expandedList.contentSelectedTitleId === title._id && "bold",
              }}
            />
            {expandedList.contentSelectedTitleId === title._id && (
              <SubTitlesList
                expandedList={expandedList}
                handleHymnClick={handleHymnClick}
                ScrollToTittle={ScrollToTittle}
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
