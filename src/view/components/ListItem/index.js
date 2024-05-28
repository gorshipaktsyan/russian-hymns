import { Box } from "@mui/material";
import ListItemStyledComponents from "./styles";
import Divider from "./Divider";

const { StyledListItem, StyledDeletedIcon, StyledText } =
  ListItemStyledComponents;

function ListItem({
  title,
  number,
  id,
  list,
  index,
  Icon,
  onIconClick,
  onTitleClick,
  style,
}) {
  return (
    <>
      <Box
        id={id}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <StyledListItem onClick={() => onTitleClick(id)}>
          <StyledText style={style}>{title}</StyledText>
          <StyledText>{number}</StyledText>
        </StyledListItem>
        {Icon && (
          <StyledDeletedIcon as={Icon} onClick={() => onIconClick(id)} />
        )}
      </Box>
      <Divider lastIndex={list.length - 1} index={index} />
    </>
  );
}
export default ListItem;
