import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Container, Card, Title, UserId } from './styles';

const Login = (props) => {
  const { userId, getUserId, pendingReq } = props;
  let content = <CircularProgress size={80} thickness={5} />;;
  if (userId === null) {
    if (!pendingReq) {
      getUserId();
    }
  } else {
    content = [
      <Title> Enable the following user ID to login: </Title>,
      <UserId> {userId} </UserId>,
    ]
  }

  return (
    <Container>
      <Card>
        {content}
      </Card>
    </Container>
  );
};

Login.propTypes = {
  pendingReq: PropTypes.bool,
};

Login.defaultProps = {
};

export default Login;
