import { debouncedAction } from './utils';

export const getIntro = debouncedAction(500, templateId => (
  {
    payload: {
      request: {
        method: 'get',
        url: `/ui-api/introductions/${templateId}`,
        withCredentials: true,
      },
    },
    type: 'GET_INTRO',
  }
));

export const giveConsent = () => (
  {
    type: 'GIVE_CONSENT',
  }
);

export const startTest = debouncedAction(500, templateId => (
  {
    payload: {
      request: {
        method: 'post',
        url: `/ui-api/tests/${templateId}`,
        withCredentials: true,
      },
    },
    type: 'START_TEST',
  }
));

export const categorizeItem = debouncedAction(10, toLeft => (
  {
    side: toLeft ? 'left' : 'right',
    type: 'CATEGORIZE_ITEM',
  }
));

export const startTask = () => (
  {
    type: 'START_TASK',
  }
);


export const sendResults = debouncedAction(1000, (testId, data) => (
  {
    payload: {
      request: {
        method: 'post',
        data,
        url: `/ui-api/tests/${testId}/results`,
        withCredentials: true,
      },
    },
    type: 'SEND_RESULTS',
  }
));
