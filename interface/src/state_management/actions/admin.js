import { debouncedAction } from 'state_management/utils';

export const getUserId = debouncedAction(500, () => (
  {
    payload: {
      request: {
        method: 'get',
        url: '/ui-api/user',
        withCredentials: true,
      },
    },
    type: 'GET_USER_ID',
  }
));

export const getTestList = debouncedAction(500, () => (
  {
    payload: {
      request: {
        method: 'get',
        url: '/ui-api/templates',
        withCredentials: true,
      },
    },
    type: 'GET_TEST_LIST',
    admin: true,
  }
));

export const setTestEdit = (templateId = null) => (
  {
    type: 'SET_TEST_EDIT',
    templateId,
    admin: true,
  }
);

export const getTestConfigs = debouncedAction(500, templateId => (
  {
    payload: {
      request: {
        method: 'get',
        url: `/ui-api/templates/${templateId}`,
        withCredentials: true,
      },
    },
    type: 'GET_TEST_CONFIGS',
    admin: true,
  }
));

export const saveTestConfigs = debouncedAction(500, (templateId, data) => (
  {
    payload: {
      request: {
        data: { update: data },
        method: 'post',
        url: `/ui-api/templates/${templateId}`,
        withCredentials: true,
      },
    },
    type: 'SAVE_TEST_CONFIGS',
    admin: true,
  }
));
