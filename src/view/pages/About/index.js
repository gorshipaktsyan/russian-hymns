import StyledComponents from "../../../utils/sharedStyles";

const { InfoBox, StyledLink } = StyledComponents;

function About({ version = "1.0.0" }) {
  return (
    <InfoBox>
      <p>
        Эта программа представляет собой официальную электронную версию сборника
        гимнов, опубликованного "Коллектором библейской книги" в 2014 году.
        Гимны, включённые в настоящий сборник, отобраны из нескольких сборников
        гимнов и других книг, выпущенных служением "Живой поток" (Анахайм, США),
        и переведены с английского языка.
      </p>

      <p>
        По всем вопросам, связанным с программой, пожалуйста, пишите по адресу{" "}
        <StyledLink href="mailto:hymns@kbk.ru">hymns@kbk.ru</StyledLink>.
        Официальный сайт "Коллектора библейской книги" —{" "}
        <StyledLink href="http://kbk.ru">http://kbk.ru</StyledLink>.
      </p>

      <p>Версия программы: {version}</p>

      <p>&copy; "Коллектор библейской книги", 2015. Все права защищены.</p>
    </InfoBox>
  );
}

export default About;
