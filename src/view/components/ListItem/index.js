import { Box } from "@mui/material";
import ListItemStyledComponents from "./styles";
import addDivider from "../../../utils/addDivider";

const { StyledListItem, StyledDeletedIcon, StyledText } =
  ListItemStyledComponents;

function ListItem({
  title,
  number,
  id,
  list,
  index,
  Icon,
  BorderBottom,
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
      {addDivider(BorderBottom, list, index)}
    </>
  );
}
export default ListItem;
