import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import CircularProgress from 'material-ui/CircularProgress';
import Avatar from 'material-ui/Avatar';
import { Redirect, Switch } from 'react-router-dom';
import { Container, Card, Message } from './styles';

const TestList = (props) => {
  const { getTestList, availableTests, pendingReq } = props;
  let content = <CircularProgress size={80} thickness={5} />;

  if (availableTests === null) {
    if (!pendingReq) {
      getTestList();
    }
  } else if (availableTests.length > 1) {
    content = (
      <List>
        <Subheader>Available tests</Subheader>
        {availableTests.map(test => (
          <ListItem
            key={test.id}
            primaryText={test.name}
            secondaryText={test.description}
            leftAvatar={<Avatar src="testico.svg" />}
            onClick={() => props.history.push(`/test/${test.id}`)}
          />))}
      </List>
    );
  } else if (availableTests.length === 1) {
    content = (
      <Switch>
        <Redirect to={`/test/${availableTests[0].id}`} />
      </Switch>
    );
  } else {
    content = <Message> No tests available </Message>;
  }

  return (
    <Container>
      <Card>
        {content}
      </Card>
    </Container>
  );
};

TestList.propTypes = {
  pendingReq: PropTypes.bool.isRequired,
  availableTests: PropTypes.arrayOf(PropTypes.object),
  getTestList: PropTypes.func.isRequired,
};

TestList.defaultProps = {
  availableTests: null,
};

export default TestList;
