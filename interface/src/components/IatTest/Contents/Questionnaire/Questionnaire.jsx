import React from 'react';
import constants from 'app_constants';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import CircularProgress from 'material-ui/CircularProgress';
import { GenFormatter, FilterQuestions } from 'utils';
import { Redirect } from 'react-router-dom';
import { Step, Stepper, StepLabel } from 'material-ui/Stepper';
import Dialog from 'components/Dialog';
import { Container, QuestionTitle, QuestionBody, StepperContainer } from './styles';
import SelectOne from './SelectOne';
import Matrix from './Matrix';
import DragColumns from './DragColumns';

const questionTypes = {
  select_one: SelectOne,
  matrix: Matrix,
  drag_columns: DragColumns,
};

const Questionnaire = (props) => {
  const { testData, pendingReq, testState, activeQuestion } = props;
  const { answers, setAnswer, changeQuestion, small, questionReady } = props;
  const { closePopup, questionnaireId, closedPopups, getTest } = props;
  const templateId = props.match.params.templateId;
  const questionnaire = testData.questionnaire[questionnaireId];
  const question = questionnaire[activeQuestion];
  const templateVars = { answers };
  const StringFormatter = GenFormatter(templateVars);
  const popups = testData.popup_messages;
  const popupIds = {'start': `before_q_${questionnaireId}`}
  let popupMessage = null;

  if (popups[popupIds.start] && !closedPopups.includes(popupIds.start)) {
    popupMessage = (
      <Dialog open onClose={() => closePopup(popupIds.start)}>
        {popups[popupIds.start]}
      </Dialog>);
  }

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
      {popupMessage}
      <StepperContainer>
        <Stepper linear={false} activeStep={question.index}>
          {FilterQuestions(Object.values(questionnaire), templateVars).map(q => (
            <Step key={q.id}>
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
        {testData.can_skip_questions ? (
          <FlatButton
            label="Skip"
            secondary
            onClick={() => changeQuestion(1, true)}
          />
        ) : (
          []
        )}
        <FlatButton
          label="Next"
          icon={<i className="material-icons" >navigate_next</i>}
          labelPosition="before"
          primary
          disabled={!questionReady[activeQuestion]}
          onClick={() => changeQuestion(1)}
        />
      </div>
    </Container>
  );
};

Questionnaire.propTypes = {
  activeQuestion: PropTypes.string.isRequired,
  answers: PropTypes.object,
  changeQuestion: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  closedPopups: PropTypes.arrayOf(PropTypes.string),
  getTest: PropTypes.func.isRequired,
  pendingReq: PropTypes.bool,
  questionnaireId: PropTypes.string.isRequired,
  questionReady: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      templateId: PropTypes.string,
    }),
  }),
  setAnswer: PropTypes.func.isRequired,
  small: PropTypes.bool,
  testData: PropTypes.object.isRequired,
  testState: PropTypes.number.isRequired,

};

Questionnaire.defaultProps = {
  answers: [],
  closedPopups: [],
  match: { params: { templateId: null } },
  pendingReq: false,
  small: false,
};

export default Questionnaire;
