import React from 'react';
import PropTypes from 'prop-types';
import constants from 'app_constants';
import { CellContainer, GroupContainer, InlineThin, KeyContainer, Key, KeySmall, KeyBig } from './styles';

const Cell = (props) => {
  const { left, testData, taskNumber } = props;
  const groups = testData.tasks[taskNumber][left ? 'left' : 'right'];
  const orSep = <InlineThin left={left}> OR </InlineThin>;
  const keyVal = left ? constants.leftKey : constants.rightKey;

  return (
    <CellContainer left={left}>
      <GroupContainer left={left}>
        {groups.map((g, i) => (
          <div key={g}>
            {i > 0 ? orSep : undefined}
            {g}
          </div>
        ))}
      </GroupContainer>
      <KeyContainer>
        <Key left={left}>
          <KeySmall> PRESS </KeySmall>
          <KeyBig> {keyVal} </KeyBig>
        </Key>
      </KeyContainer>
    </CellContainer>
  );
};

Cell.propTypes = {
  left: PropTypes.bool,
};

Cell.defaultProps = {
  left: false,
};

export default Cell;
