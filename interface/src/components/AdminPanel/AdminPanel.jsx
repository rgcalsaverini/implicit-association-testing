import React from 'react';
import { Container, TopBar, Body, Section } from './styles';
import TestList from './TestList';
import EditTest from './EditTest';

const AdminPanel = () => (
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

export default AdminPanel;
