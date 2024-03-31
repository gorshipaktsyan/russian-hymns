import { Box, Divider, Slider, Switch, Typography } from "@mui/material";
import StyledComponents from "../../../utils/sharedStyles";
import SettingsStyledComponents from "./styles";

const { StyledBox } = StyledComponents;
const { StyledSetList, StyledSetListItem, StyledSetTpg, ArrowSetBox } =
  SettingsStyledComponents;

function Settings({ fontSize, setFontSize, useArrows, setUseArrows }) {
  function handleChangeFtSz(e) {
    const newValue = parseFloat(e.target.value);
    setFontSize(newValue);
  }

  function handleChange(e) {
    setUseArrows(e.target.checked);
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
        <StyledSetListItem>
          <StyledSetTpg>Стрелки</StyledSetTpg>
          <ArrowSetBox>
            <StyledSetTpg>Выкл</StyledSetTpg>
            <Switch checked={useArrows} onChange={handleChange}></Switch>
            <StyledSetTpg>Вкл</StyledSetTpg>
          </ArrowSetBox>
        </StyledSetListItem>
      </StyledSetList>
    </StyledBox>
  );
}

export default Settings;
