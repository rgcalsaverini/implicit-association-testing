import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TestContentsRaw from './TestContents';
import ConsentRaw from './Consent';
import TestRaw from './Test';
import { getConsent, giveConsent, startTest } from '../../../actions';

const TestContentsState = state => ({
  testStarted: state.testReducer.testStarted,
  testData: state.testReducer.testData,
  taskNumber: state.testReducer.testData,
  error: state.testReducer.error,
});

const TestContentsDispatch = {};

const TestState = state => ({
  testStarted: state.testReducer.testStarted,
  pendingReq: state.testReducer.pendingReq,
  testData: state.testReducer.testData,
  error: state.testReducer.error,
});

const TestDispatch = {
  startTest,
};

const ConsentState = state => ({
  consentData: state.testReducer.consentData,
  obtainedConsent: state.testReducer.obtainedConsent,
  pendingReq: state.testReducer.pendingReq,
  error: state.testReducer.error,
});

const ConsentDispatch = {
  getConsent,
  giveConsent,
};

export const Test = withRouter(connect(
  TestState,
  TestDispatch,
)(TestRaw));

export const Consent = withRouter(connect(
  ConsentState,
  ConsentDispatch,
)(ConsentRaw));

export const TestContents = withRouter(connect(
  TestContentsState,
  TestContentsDispatch,
)(TestContentsRaw));
