import { Divider, Slider, Switch } from "@mui/material";
import StyledComponents from "../../../utils/sharedStyles";
import SettingsStyledComponents from "./styles";
import { useSelector, useDispatch } from "react-redux";
import {
  changeFontSize,
  setIsEngSearchVisible,
  setIsAllowToUseArrows,
} from "../../../redux/slice/settingsSlice";

const { StyledBox } = StyledComponents;
const { StyledSetList, StyledSetListItem, StyledSetTpg, ArrowSetBox } =
  SettingsStyledComponents;

function Settings() {
  const fontSize = useSelector((state) => state.settings.fontSize);
  const isAllowToUseArrows = useSelector(
    (state) => state.settings.isAllowToUseArrows
  );
  const isEngSearchVisible = useSelector(
    (state) => state.settings.isEngSearchVisible
  );
  const isMobile = useSelector((state) => state.settings.isMobile);
  const lg = useSelector((state) => state.settings.language);
  const dispatch = useDispatch();

  function handleChangeFtSz(e) {
    const newValue = parseFloat(e.target.value);
    dispatch(changeFontSize(newValue));
  }

  function handleChangeArrows(e) {
    dispatch(setIsAllowToUseArrows(e.target.checked));
  }

  function handleChangeEngSearch(e) {
    dispatch(setIsEngSearchVisible(e.target.checked));
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
                  checked={isAllowToUseArrows}
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
              checked={isEngSearchVisible}
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
