import { Divider, Slider, Switch } from "@mui/material";
import StyledComponents from "../../../utils/sharedStyles";
import SettingsStyledComponents from "./styles";

const { StyledBox } = StyledComponents;
const { StyledSetList, StyledSetListItem, StyledSetTpg, ArrowSetBox } =
  SettingsStyledComponents;

function Settings({
  fontSize,
  setFontSize,
  useArrows,
  setUseArrows,
  isMobile,
  englishSearch,
  setEnglishSearch,
}) {
  function handleChangeFtSz(e) {
    const newValue = parseFloat(e.target.value);

    setFontSize(newValue);
  }
  function handleChangeArrows(e) {
    setUseArrows(e.target.checked);
  }
  function handleChangeEngSearch(e) {
    setEnglishSearch(e.target.checked);
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
        {isMobile && (
          <>
            <Divider sx={{ width: "350px", marginTop: '15px' }} />
            <StyledSetListItem>
              <StyledSetTpg>Стрелки</StyledSetTpg>
              <ArrowSetBox>
                <StyledSetTpg>Выкл</StyledSetTpg>
                <Switch
                  checked={useArrows}
                  onChange={handleChangeArrows}
                ></Switch>
                <StyledSetTpg>Вкл</StyledSetTpg>
              </ArrowSetBox>
            </StyledSetListItem>
          </>
        )}
        <Divider sx={{ width: "350px", marginTop: '15px' }} />
        <StyledSetListItem>
          <StyledSetTpg>Поиск по английскому номеру </StyledSetTpg>
          <ArrowSetBox>
            <StyledSetTpg>Выкл</StyledSetTpg>
            <Switch
              checked={englishSearch}
              onChange={handleChangeEngSearch}
            ></Switch>
            <StyledSetTpg>Вкл</StyledSetTpg>
          </ArrowSetBox>
        </StyledSetListItem>
      </StyledSetList>
    </StyledBox>
  );
}

export default Settings;
