import React from 'react';
// import PropTypes from 'prop-types';
// import { Redirect } from 'react-router-dom';
import { Container, ResultCard } from './styles';

// const resultText = (resultData) => {
//   const level = resultData.classification;
//   const winner = resultData.winner_name;
//   const looser = resultData.looser_name;
//   const text = resultData.text;
//   return text.replace('$LEVEL', level).replace('$WINNER', winner).replace('$LOSER', looser);
//   // return `Your data suggest a ${level} automatic preference for ${winner} over ${looser}`;
// };

const Result = (props) => {
  const { resultData } = props;
  const inconclusive = 'It was not possible to determine a result.';

  return (
    <Container>
      <ResultCard>
        {resultData.success ? resultData.text : inconclusive }
      </ResultCard>
    </Container>

  );
};

Result.propTypes = {
  // obtainedConsent: PropTypes.bool.isRequired,
  // introData: PropTypes.shape({
  //   text: PropTypes.string,
  //   button: PropTypes.string,
  // }),
  // pendingReq: PropTypes.bool.isRequired,
  // getIntro: PropTypes.func.isRequired,
  // giveConsent: PropTypes.func.isRequired,
  // match: PropTypes.shape({
  //   params: PropTypes.shape({
  //     templateId: PropTypes.string,
  //   }),
  // }),
};

Result.defaultProps = {
  // introData: null,
  // match: { params: { templateId: null } },
};

export default Result;
