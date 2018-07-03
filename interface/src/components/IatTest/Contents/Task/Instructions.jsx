import React from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import constants from 'app_constants';
import { InstructionsContainer, Accent, Section } from './styles';


const Instructions = (props) => {
  const { categText, taskNumber, task } = props;

  return (
    <InstructionsContainer>
      <Section long hide={taskNumber > 0}>
      Put a left finger on the key <Accent> &quot;{constants.leftKey}&quot;</Accent> and
      a right finger on the key <Accent>&quot;{constants.rightKey}&quot;</Accent>
      </Section>
      <Section hide={taskNumber > 0}>
      Items will appear on the middle of the screen.
      </Section>
      <Section>
      Press &quot;{constants.leftKey}&quot; if the item belongs to the {categText}
        <Accent> {task.left.join(' or ')} </Accent> or
      </Section>
      <Section>
      press &quot;{constants.rightKey}&quot; if it belongs to the {categText}
        <Accent> {task.right.join(' or ')} </Accent>
      </Section>
      <Section long>
      If you make a mistake, a red <Accent red> X </Accent> will appear,
      just try again.
      </Section>
      <Section long>
      Go <Accent> as fast as you can </Accent> while being accurate.
      </Section>
      <Section long>
      Press <Accent> spacebar </Accent> to continue.
      </Section>
    </InstructionsContainer>
  );
};

Instructions.propTypes = {
  categText: PropTypes.string.isRequired,
  taskNumber: PropTypes.number.isRequired,
};

Instructions.defaultProps = { };

export default Instructions;
