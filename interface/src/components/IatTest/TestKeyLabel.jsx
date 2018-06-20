import React from 'react';
import PropTypes from 'prop-types';
import { InlineThin, GroupTitle, HeaderCell, KeyLabelContainer, Key, KeySmall, KeyBig } from './styles';

const TestKeyLabel = (props) => {
  const { keyVal, left, groups } = props;
  const orSep = <InlineThin left={left}> OR </InlineThin>;

  return (

    <HeaderCell left={left}>
      <GroupTitle left={left}>
        {groups.map((g, i) => (
          <div>
            {i > 0 ? orSep : undefined}
            {g}
          </div>
        ))}
      </GroupTitle>
      <KeyLabelContainer>
        <Key left={left}>
          <KeySmall> PRESS </KeySmall>
          <KeyBig> {keyVal.toUpperCase()} </KeyBig>
        </Key>
      </KeyLabelContainer>

    </HeaderCell>
  );
};

// <HeaderCell left={left}>
//   <GroupTitle left={left}>
//     {groups.map((g, i) => (
//       <div>
//         {i > 0 ? orSep : undefined}
//         {g}
//       </div>
//     ))}
//   </GroupTitle>
//   <KeyLabelContainer>
//     <Key left={left}>
//       <KeySmall> PRESS </KeySmall>
//       <KeyBig> {keyVal.toUpperCase()} </KeyBig>
//     </Key>
//   </KeyLabelContainer>
// </HeaderCell>


TestKeyLabel.propTypes = {
  keyVal: PropTypes.string.isRequired,
  left: PropTypes.bool,
  groups: PropTypes.arrayOf(PropTypes.string),
};

TestKeyLabel.defaultProps = {
  left: false,
  groups: [],
};
export default TestKeyLabel;
