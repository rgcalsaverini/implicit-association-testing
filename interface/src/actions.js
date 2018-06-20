export const getConsent = templateId => (
  {
    payload: {
      request: {
        method: 'get',
        url: `/ui-api/consents/${templateId}`,
        withCredentials: true,
      },
    },
    type: 'GET_CONSENT',
  }
);

export const giveConsent = () => (
  {
    type: 'GIVE_CONSENT',
  }
);

export const startTest = templateId => (
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
);
