import { Box } from "@mui/material";
import HymnTitleStyledComponents from "./styles";
import addDivider from "../../../utils/addDivider";

const { StyledListItem, StyledDeletedIcon, StyledText } =
  HymnTitleStyledComponents;

function HymnTitle({
  title,
  number,
  id,
  hymnsList,
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
      {addDivider(BorderBottom, hymnsList, index)}
    </>
  );
}
export default HymnTitle;
