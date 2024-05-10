import React from "react";
import StyledComponents from "../../../utils/sharedStyles";

const { InfoBox, StyledLink } = StyledComponents;

function About({ language }) {
  return (
    <InfoBox className="infoBox">
      <p>{language.about.overview}</p>
      <p>{language.about.asteriskNote}</p>
      <p>{language.about.crossNote}</p>
      <p>{language.about.numbering}</p>
      <p>
        {language.about.contact}{" "}
        <StyledLink href="mailto:hymns@kbk.ru">hymns@kbk.ru</StyledLink>.{" "}
        {language.about.officialSite + " " + language.about.collectorBook} —{" "}
        <StyledLink href="http://kbk.ru">kbk.ru</StyledLink>.
      </p>
      <p>
        &copy; {language.about.collectorBook}, 2024.{" "}
        {language.about.rightsReserved}
      </p>
    </InfoBox>
  );
}

export default About;
