import React from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import { Container, Text } from './styles';

const FinalInfo = (props) => {
  const { finalInfo } = props;

  return (
    <Container>
      <Text>
        <ReactMarkdown
          plugins={[breaks]}
          source={finalInfo}
        />
      </Text>
    </Container>
  );
};

FinalInfo.propTypes = {
  finalInfo: PropTypes.string.isRequired,
};

FinalInfo.defaultProps = {
};

export default FinalInfo;
