import React from 'react';
import PropTypes from 'prop-types';
import { Container, TopBar, Body, Section } from './styles';
import TestList from './TestList';
import EditTest from './EditTest';

const AdminPanel = (props) => {
  const { _ } = props;
  return (
    <Container>
      <TopBar>
        ADMIN
      </TopBar>
      <Body>
        <Section height={200}>
          A small set of graphs will be displayed here
        </Section>
        <Section>
          <TestList />
        </Section>
      </Body>
      <EditTest />
    </Container>
  );
};

AdminPanel.propTypes = {
};

AdminPanel.defaultProps = {
};

export default AdminPanel;
