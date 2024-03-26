import { Divider, Switch, Typography } from "@mui/material";
import StyledComponents from "../../../utils/sharedStyles";
import SettingsStyledComponents from "./styles";

const { StyledBox } = StyledComponents;
const {
  StyledSettingsList,
  StyledSettingsListItem,
  StyledOpButton,
  StyledSettingsTpg,
} = SettingsStyledComponents;
const minFontSize = 1.0;
const maxFontSize = 1.8;

function Settings({ fontSize, setFontSize, useArrows, setUseArrows }) {
  function handleClick(op) {
    op === "-"
      ? setFontSize((prevSize) => Math.max(prevSize - 0.1, minFontSize))
      : setFontSize((prevSize) => Math.min(prevSize + 0.1, maxFontSize));
  }

  function handleChange(e) {
    setUseArrows(e.target.checked);
  }

  return (
    <StyledBox>
      <StyledSettingsList>
        <StyledSettingsListItem>
          <StyledSettingsTpg>Шрифт</StyledSettingsTpg>
          <StyledOpButton onClick={() => handleClick("-")}>-</StyledOpButton>
          <StyledSettingsTpg>{Number(fontSize.toFixed(1))}</StyledSettingsTpg>
          <StyledOpButton onClick={() => handleClick("+")}>+</StyledOpButton>
        </StyledSettingsListItem>
        <Divider />
        <StyledSettingsListItem>
          <StyledSettingsTpg>Стрелки</StyledSettingsTpg>
          <StyledSettingsTpg>Выкл</StyledSettingsTpg>
          <Switch
            checked={useArrows}
            onChange={handleChange}
            inputProps={{ "aria-label": "controlled" }}
          ></Switch>
          <StyledSettingsTpg>Вкл</StyledSettingsTpg>
        </StyledSettingsListItem>
      </StyledSettingsList>
    </StyledBox>
  );
}

export default Settings;
