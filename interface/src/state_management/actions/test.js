import { debouncedAction } from 'state_management/utils';

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

export const getTest = debouncedAction(500, (templateId, mobile) => ({
  payload: {
    request: {
      method: 'post',
      ...(typeof mobile === 'undefined' ? {} : { data: { mobile } }),
      url: `/ui-api/tests/${templateId}`,
      withCredentials: true,
    },
  },
  type: 'GET_TEST',
}));

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

export const giveConsent = () => (
  {
    type: 'GIVE_CONSENT',
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

export const setAnswer = (answer, ready) => (
  {
    type: 'SET_ANSWER',
    answer,
    ready,
  }
);

export const changeQuestion = (value, discardAnswer = false) => (
  {
    type: 'CHANGE_QUESTION_CLICK',
    value,
    discardAnswer,
  }
);

export const getFinalInfo = debouncedAction(500, templateId => (
  {
    payload: {
      request: {
        method: 'get',
        url: `/ui-api/final-info/${templateId}`,
        withCredentials: true,
      },
    },
    type: 'GET_FINAL_INFO',
  }
));

export const closePopup = popupId => (
  {
    type: 'CLOSE_POPUP',
    popupId,
  }
);
