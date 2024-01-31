import { Box } from "@mui/material";
import HymnTitleStyledComponents from "./styles";

const { StyledListItem, StyledDeletedIcon, StyledText } =
  HymnTitleStyledComponents;

function addDivider(BorderBottom, hymnsList, index) {
  if (BorderBottom && index !== hymnsList.length - 1) {
    const lastIndex = hymnsList.length - 1;
    return <BorderBottom key={lastIndex} />;
  }
  return null;
}

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
}) {
  return (
    <>
      <Box
        key={id}
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <StyledListItem onClick={() => onTitleClick(id)}>
          <StyledText>{title}</StyledText>
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
