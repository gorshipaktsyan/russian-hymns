import HymnStyledComponents from "../pages/Hymn/styles";

const { StyledFooter, ArrowLeftMobWrapper, ArrowRightMobWrapper } =
  HymnStyledComponents;
function Footer({
  handleRightSwipe,
  handleLeftSwipe,
  ArrowMobileLeftIcon,
  ArrowMobileRightIcon,
}) {
  return (
    <StyledFooter>
      <>
        <ArrowLeftMobWrapper onClick={handleRightSwipe}>
          <ArrowMobileLeftIcon />
        </ArrowLeftMobWrapper>
        <ArrowRightMobWrapper onClick={handleLeftSwipe}>
          <ArrowMobileRightIcon />
        </ArrowRightMobWrapper>
      </>
    </StyledFooter>
  );
}
export default Footer;
