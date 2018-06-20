import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
import breaks from 'remark-breaks';
import ReactMarkdown from 'react-markdown';
import { ConsentContainer, ConsentText, ConsentButtonContainer } from './styles';


const Consent = (props) => {
  const { obtainedConsent, consentData, pendingReq,
    getConsent, error, giveConsent } = props;
  const templateId = props.match.params.templateId;

  if (obtainedConsent) {
    return (<Redirect to={`/test/${templateId}`} />);
  }

  if (error) {
    return <div> Error {JSON.stringify(error)}</div>;
  }

  if (!consentData) {
    if (!pendingReq) {
      getConsent(templateId);
    }

    return <div> Waiting Consent Req </div>;
  }

  return (
    <ConsentContainer>
      <ConsentText>
        <ReactMarkdown
          plugins={[breaks]}
          source={consentData.text}
        />
      </ConsentText>
      <ConsentButtonContainer>
        <RaisedButton
          label={consentData.button}
          onClick={giveConsent}
          primary
        />
      </ConsentButtonContainer>
    </ConsentContainer>
  );
};

Consent.propTypes = {
  obtainedConsent: PropTypes.bool.isRequired,
  consentData: PropTypes.shape({
    text: PropTypes.string,
    button: PropTypes.string,
  }),
  pendingReq: PropTypes.bool.isRequired,
  getConsent: PropTypes.func.isRequired,
  giveConsent: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      templateId: PropTypes.string,
    }),
  }),
};

Consent.defaultProps = {
  consentData: null,
  match: { params: { templateId: null } },
};

export default Consent;
