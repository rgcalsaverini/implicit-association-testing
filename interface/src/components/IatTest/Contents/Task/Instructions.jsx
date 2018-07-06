import React from 'react';
import PropTypes from 'prop-types';
import constants from 'app_constants';
import { InstructionsContainer, Accent, Section } from './styles';

const pressSideText = (task, side, small) => {
  const groups = (side === 'left' ? task.left : task.right).join(' or ');
  const categText = task.left.length > 1 ? 'categories' : 'category';
  if (small) {
    return (
      <Section>
        Touch the {side} side of the screen if the item belongs to the {categText}
        <Accent> {groups} </Accent>
      </Section>
    );
  }
  const key = side === 'left' ? constants.leftKey : constants.rightKey;
  return (
    <Section>
      Press &quot;{key}&quot; if the item belongs to the {categText}
      <Accent> {groups} </Accent>
    </Section>
  );
};

const continueText = (small, onContinue) => {
  if (small) {
    return (
      <Section long onClick={() => onContinue()}>
        <Accent> Touch here to continue. </Accent>
      </Section>
    );
  }
  return (
    <Section long> Press <Accent> spacebar </Accent> to continue. </Section>
  );
}
const Instructions = (props) => {
  const { taskNumber, task, small, onContinue } = props;
  let firstLine;

  if (taskNumber < 1 && !small) {
    firstLine = (
      <Section long>
        Put a left finger on the key <Accent> &quot;{constants.leftKey}&quot;</Accent> and
        a right finger on the key <Accent>&quot;{constants.rightKey}&quot;</Accent>
      </Section>
    );
  }

  return (
    <InstructionsContainer
      small={small}

    >
      {firstLine}
      <Section hide={taskNumber > 0}>
      Items will appear on the middle of the screen.
      </Section>
      {pressSideText(task, 'left', small)}
      {pressSideText(task, 'right', small)}
      <Section long>
      If you make a mistake, a red <Accent red> X </Accent> will appear,
      just try again.
      </Section>
      <Section long>
      Go <Accent> as fast as you can </Accent> while being accurate.
      </Section>
      {continueText(small, onContinue)}
    </InstructionsContainer>
  );
};

Instructions.propTypes = {
  taskNumber: PropTypes.number.isRequired,
  onContinue: PropTypes.func.isRequired,
  small: PropTypes.bool,
};

Instructions.defaultProps = {
  small: false,
};

export default Instructions;
