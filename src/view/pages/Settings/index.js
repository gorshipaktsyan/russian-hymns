import { Divider, Slider } from "@mui/material";
import StyledComponents from "../../../utils/sharedStyles";
import SettingsStyledComponents from "./styles";

const { StyledBox } = StyledComponents;
const { StyledSetList, StyledSetListItem, StyledSetTpg } =
  SettingsStyledComponents;

function Settings({ fontSize, setFontSize }) {
  function handleChangeFtSz(e) {
    const newValue = parseFloat(e.target.value);
    setFontSize(newValue);
  }
  return (
    <StyledBox onTouchStart={(e) => e.stopPropagation()}>
      <StyledSetList>
        <StyledSetListItem>
          <StyledSetTpg>Размер шрифта</StyledSetTpg>
          <Slider
            aria-label="Font size"
            value={fontSize && fontSize}
            onChange={handleChangeFtSz}
            step={0.1}
            marks
            min={1}
            max={1.8}
          />
        </StyledSetListItem>
        <Divider />
      </StyledSetList>
    </StyledBox>
  );
}

export default Settings;
