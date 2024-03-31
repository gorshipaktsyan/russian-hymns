import { Box } from "@mui/material";

function Footer({
  handleRightSwipe,
  handleLeftSwipe,
  ArrowMobileLeftIcon,
  ArrowMobileRightIcon,
}) {
  return (
    <Box
      sx={{
        backgroundColor: "grey",
        height: "50px",
        display: "flex",
        justifyContent: "space-between",
        position: "fixed",
        bottom: "0px",
        width: "100%",
        opacity: "0.5",
        alignItems: "center",
      }}
    >
      <>
        <ArrowMobileLeftIcon onClick={handleRightSwipe} />
        <ArrowMobileRightIcon onClick={handleLeftSwipe} />
      </>
    </Box>
  );
}
export default Footer;
