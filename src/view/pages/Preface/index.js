import { useSelector } from 'react-redux';

import { StyledComponents } from '../../styles';

const { InfoBox } = StyledComponents;
function Preface() {
  const lg = useSelector((state) => state.settings.language);

  return (
    <InfoBox>
      <p>
        <em>{lg.preface.preface}</em>
      </p>

      <p>{lg.preface.introduction}</p>

      <ol>
        {lg.preface.goals.map((goal, index) => (
          <li key={index}>{goal}</li>
        ))}
      </ol>

      <p>{lg.preface.churchExistence}</p>

      <p>{lg.preface.inclusion}</p>

      <p>{lg.preface.hymnSelection}</p>

      <p>{lg.preface.lordRestoration}</p>

      <p>{lg.preface.forSatisfaction}</p>

      <p>{lg.preface.hymnDivisions}</p>

      <p>{lg.preface.index}</p>

      <p>{lg.preface.melodies}</p>

      <p>{lg.preface.attention}</p>

      <p>{lg.preface.continuousFlow}</p>

      <p>{lg.preface.distractions}</p>

      <p>{lg.preface.gratitudeToPublishers}</p>

      <p> {lg.preface.permissions}</p>

      <p> {lg.preface.gratitudeToBrothersAndSisters}</p>

      <p> {lg.preface.usage}</p>

      <p> {lg.preface.encouragement}</p>
      <p>
        {lg.preface.authors} —<br /> {lg.preface.names}
      </p>

      <p>
        {lg.preface.location}
        <br />
        {lg.preface.date}
      </p>
    </InfoBox>
  );
}

export default Preface;
