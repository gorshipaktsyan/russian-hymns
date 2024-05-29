import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { TransitionGroup } from "react-transition-group";
import ListItem from "../../components/ListItem";
import { formatDataforBookmarks } from "../../../utils";
import { removeHymn } from "../../../redux/slice/bookmarksSlice";
import { StyledComponents } from "../../styles";
import { Box, Divider, Collapse } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

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

  const formattedData = formatDataforBookmarks(savedHymns, lg);
  return (
    <StyledBox>
      {formattedData.length > 0 ? (
        <StyledList>
          <TransitionGroup>
            {formattedData.map(({ date, hymns }) => (
              <Collapse key={date}>
                <Box sx={{ paddingBottom: "20px" }}>
                  <Divider>{date}</Divider>
                  {hymns.map((h, index) => (
                    <ListItem
                      key={h._id}
                      title={h?.first_string}
                      number={h?.number}
                      id={h._id}
                      list={hymns}
                      index={index}
                      Icon={DeleteIcon}
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
