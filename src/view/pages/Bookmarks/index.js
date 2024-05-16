import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import HymnTitle from "../../components/hymnTitle/HymnTitle";
import { Box, Divider, Collapse } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TransitionGroup } from "react-transition-group";
import StyledComponents from "../../../utils/sharedStyles";
import { useDispatch, useSelector } from "react-redux";
import { removeHymn } from "../../../redux/slice/bookmarksSlice";

const { StyledBox, StyledList, StyledTypography } = StyledComponents;

function Bookmarks() {
  const savedHymns = useSelector((state) => state.bookmarks.savedHymns);
  const lg = useSelector((state) => state.settings.language);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleClick(id) {
    navigate(`/hymns/${id}`);
  }

  function handleDelete(id) {
    dispatch(removeHymn(id));
  }
  return (
    <StyledBox>
      {savedHymns?.length > 0 ? (
        <StyledList>
          <TransitionGroup>
            {savedHymns?.map(({ date, hymns }) => (
              <Collapse key={date}>
                <Box sx={{ paddingBottom: "20px" }}>
                  <Divider>{date}</Divider>
                  {hymns?.map((h, index) => (
                    <HymnTitle
                      title={h?.first_string}
                      number={h?.number}
                      id={h._id}
                      hymnsList={hymns}
                      index={index}
                      Icon={DeleteIcon}
                      BorderBottom={Divider}
                      onTitleClick={handleClick}
                      onIconClick={handleDelete}
                    />
                  ))}
                </Box>
              </Collapse>
            ))}
          </TransitionGroup>
        </StyledList>
      ) : (
        <StyledTypography>{lg.noData}</StyledTypography>
      )}
    </StyledBox>
  );
}

export default Bookmarks;
