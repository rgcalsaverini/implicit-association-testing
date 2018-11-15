import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';

// import { Redirect } from 'react-router-dom';
import { Container, ResultCard, ResultTitle, ButtonContainer } from './styles';

const Result = (props) => {
  const { resultData, getFinalInfo } = props;
  const inconclusive = 'It was not possible to determine a result.';
  const templateId = props.match.params.templateId;

  return (
    <Container>
      <ResultTitle> Results </ResultTitle>
      <ResultCard>
        {resultData.success ? resultData.text : inconclusive }
      </ResultCard>
      <ButtonContainer>
        <RaisedButton
          label={'Continue'}
          onClick={() => getFinalInfo(templateId)}
          primary
        />
      </ButtonContainer>
    </Container>

  );
};

Result.propTypes = {
  getFinalInfo: PropTypes.func.isRequired,
  resultData: PropTypes.shape({
    success: PropTypes.bool,
    text: PropTypes.string,
  }).isRequired,
};

Result.defaultProps = {
};

export default Result;
