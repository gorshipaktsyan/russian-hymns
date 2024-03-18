import React from "react";
import StyledComponents from "../../../utils/sharedStyles";

const { InfoBox, StyledLink } = StyledComponents;

function About() {
  return (
    <InfoBox className="infoBox">
      <p>
        Эта приложения представляет собой официальную электронную версию
        сборника гимнов, опубликованного «Коллектором библейской книги» в 2014
        году. Гимны, включённые в настоящий сборник, отобраны из нескольких
        сборников гимнов и других книг, выпущенных служением «Живой поток»
        (Анахайм, США), и переведены с английского языка.
      </p>
      <p>
        * Все гимны, помеченные звёздочкой, были первоначально написаны на
        английском языке Уитнессом Ли и редакционным отделом служения «Живой
        поток» (США).
      </p>
      <p>
        † Все гимны, помеченные крестиком, представляют собой сочинения
        различных авторов, переведённые на английский язык Уитнессом Ли и
        редакционным отделом служения «Живой поток» (США).
      </p>
      <p>
        Перед текстом каждого гимна указана размерность гимна и номер
        соответствующего гимна в английском сборнике, опубликованном служением
        «Живой поток» (номер указан в скобках).
      </p>
      <p>
        По всем вопросам, связанные с приложением, пожалуйста, пишите по адресу{" "}
        <StyledLink href="mailto:hymns@kbk.ru">hymns@kbk.ru</StyledLink>.{" "}
        Официальный сайт «Коллектора библейской книги» —{" "}
        <StyledLink href="http://kbk.ru">kbk.ru</StyledLink>.
      </p>
      <p>&copy; «Коллектор библейской книги», 2024. Все права защищены.</p>
    </InfoBox>
  );
}

export default About;
