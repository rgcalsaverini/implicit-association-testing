import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from 'material-ui/CircularProgress';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import { Container, Row, GrowCol, FixedCol, Title, Small, Number } from './styles';

const TestList = (props) => {
  const { testList, getTestList, pendingReq, setTestEdit } = props;

  if (testList === null) {
    if (!pendingReq) {
      getTestList();
    }
    return <CircularProgress size={80} thickness={5} />;
  }

  return (
    <Container>
      {testList.map(row => (
        <Row key={row.id}>
          <FixedCol>
            <IconMenu
              iconButtonElement={<IconButton><i className="material-icons"> menu </i> </IconButton>}
              anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
              targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            >
              <MenuItem disabled primaryText="View dashboard" />
              <MenuItem disabled primaryText="Download data" />
              <MenuItem primaryText="Edit" onClick={() => setTestEdit(row.id)} />
              <MenuItem disabled primaryText="Delete" />
            </IconMenu>
          </FixedCol>
          <GrowCol>
            <Title> {row.name} </Title>
            <Small> /test/{row.id} </Small>
          </GrowCol>
          <FixedCol>
            <Number> {row.today} </Number>
            <Small> started today </Small>
          </FixedCol>
          <FixedCol>
            <Number> {row.finished} </Number>
            <Small> finished </Small>
          </FixedCol>
          <FixedCol>
            <Number> {row.started} </Number>
            <Small> started </Small>
          </FixedCol>
        </Row>
      ))}
    </Container>
  );
};

TestList.propTypes = {
  testList: PropTypes.arrayOf(PropTypes.shape({
    started: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    today: PropTypes.number.isRequired,
    finished: PropTypes.number.isRequired,
  })),
  getTestList: PropTypes.func.isRequired,
  setTestEdit: PropTypes.func.isRequired,
  pendingReq: PropTypes.bool,
};

TestList.defaultProps = {
  pendingReq: false,
  testList: null,
};

export default TestList;
