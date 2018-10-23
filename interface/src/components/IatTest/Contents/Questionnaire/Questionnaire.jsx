import React from 'react';
import constants from 'app_constants';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';

import { Redirect } from 'react-router-dom';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import { Container, QuestionTitle, QuestionBody, StepperContainer } from './styles';
import SelectOne from './SelectOne';
import Matrix from './Matrix';
import DragColumns from './DragColumns';
import GenFormatter from './utils';

const questionTypes = {
  select_one: SelectOne,
  matrix: Matrix,
  drag_columns: DragColumns,
};

const Questionnaire = (props) => {
  const { testData, pendingReq, testState, activeQuestion, getTest } = props;
  const { answers, setAnswer, changeQuestion, small, questionReady, questionnaireId } = props;
  const templateId = props.match.params.templateId;
  const questionnaire = testData.questionnaire[questionnaireId];
  const question = questionnaire[activeQuestion];
  const StringFormatter = GenFormatter({
    answers,
    questionnaireId,
    title: question.title,
  });


  if (testState !== constants.testStates.quest_1 && testState !== constants.testStates.quest_2) {
    return (<Redirect to={`/test/${templateId}`} />);
  }

  if (!testData) {
    if (!pendingReq) {
      getTest(templateId, small);
    }

    return <CircularProgress size={80} thickness={5} />;
  }

  return (
    <Container>
      <StepperContainer>
        <Stepper linear={false} activeStep={question.index}>
          {Object.keys(questionnaire).map(q => (
            <Step key={q}>
              <StepLabel />
            </Step>
          ))}
        </Stepper>
      </StepperContainer>
      <QuestionTitle>
        {question.index + 1}. {StringFormatter(question.title)}
      </QuestionTitle>
      <QuestionBody> {
        React.createElement(
          questionTypes[question.type],
          {
            data: question,
            onChange: setAnswer,
            value: answers[questionnaireId][activeQuestion],
            formatter: StringFormatter,
          },
        )
      } </QuestionBody>
      <div>
        <FlatButton
          label="Previous"
          icon={<i className="material-icons">navigate_before</i>}
          labelPosition="after"
          primary
          onClick={() => changeQuestion(-1)}
          disabled={question.index < 1}
        />
        <FlatButton
          label="Skip"
          secondary
          onClick={() => changeQuestion(1, true)}
        />
        <FlatButton
          label="Next"
          icon={<i className="material-icons" >navigate_next</i>}
          labelPosition="before"
          primary
          disabled={!questionReady}
          onClick={() => changeQuestion(1)}
        />
      </div>
    </Container>
  );
};

Questionnaire.propTypes = {
  testData: PropTypes.object,
  answers: PropTypes.object,
  pendingReq: PropTypes.bool,
  questionReady: PropTypes.bool.isRequired,
  small: PropTypes.bool,
  getTest: PropTypes.func.isRequired,
  changeQuestion: PropTypes.func.isRequired,
  testState: PropTypes.number.isRequired,
  questionnaireId: PropTypes.string.isRequired,
  activeQuestion: PropTypes.string.isRequired,
  setAnswer: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      templateId: PropTypes.string,
    }),
  }),
};

Questionnaire.defaultProps = {
  match: { params: { templateId: null } },
  pendingReq: false,
  answers: [],
  small: false,
};

export default Questionnaire;
