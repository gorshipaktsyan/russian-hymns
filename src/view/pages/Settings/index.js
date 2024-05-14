import { Divider, Slider, Switch } from "@mui/material";
import StyledComponents from "../../../utils/sharedStyles";
import SettingsStyledComponents from "./styles";
import { useSelector } from "react-redux";

const { StyledBox } = StyledComponents;
const { StyledSetList, StyledSetListItem, StyledSetTpg, ArrowSetBox } =
  SettingsStyledComponents;

function Settings({
  fontSize,
  setFontSize,
  useArrows,
  setUseArrows,
  englishSearch,
  setEnglishSearch,
}) {
  const isMobile = useSelector((state) => state.settings.isMobile);
  const lg = useSelector((state) => state.settings.language);

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
          <StyledSetTpg>{lg.settings.fontSize}</StyledSetTpg>
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
            <Divider sx={{ width: "350px", marginTop: "15px" }} />
            <StyledSetListItem>
              <StyledSetTpg>{lg.settings.arrows}</StyledSetTpg>
              <ArrowSetBox>
                <StyledSetTpg>{lg.settings.off}</StyledSetTpg>
                <Switch
                  checked={useArrows}
                  onChange={handleChangeArrows}
                ></Switch>
                <StyledSetTpg>{lg.settings.on}</StyledSetTpg>
              </ArrowSetBox>
            </StyledSetListItem>
          </>
        )}
        <Divider sx={{ width: "350px", marginTop: "15px" }} />
        <StyledSetListItem>
          <StyledSetTpg>{lg.settings.searchByEnglishNumber}</StyledSetTpg>
          <ArrowSetBox>
            <StyledSetTpg>{lg.settings.off}</StyledSetTpg>
            <Switch
              checked={englishSearch}
              onChange={handleChangeEngSearch}
            ></Switch>
            <StyledSetTpg>{lg.settings.on}</StyledSetTpg>
          </ArrowSetBox>
        </StyledSetListItem>
      </StyledSetList>
    </StyledBox>
  );
}

export default Settings;
