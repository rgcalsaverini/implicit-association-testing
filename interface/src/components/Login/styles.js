import styled from 'styled-components';
import { FixedFill, FlexCenter, shadow, TextBig, TextSmall, spacing } from 'base_styles';

export const Container = styled.div`
  ${FixedFill}
  ${FlexCenter}
  font-family: 'Roboto', sans-serif;
`;

export const Card = styled.div`
  ${FlexCenter}
  max-width: 500px;
  width: 100%;
  // height: 180px;
  box-shadow: ${shadow.s1};
  background-color: #F0F0F0;
`;

export const UserId = styled.div`
  ${TextBig}
  font-weight: bold;
  padding: ${spacing.double}px;
`;

export const Title = styled.div`
  // ${TextSmall}
  opacity: 0.6;
  font-weight: thin;
  padding: ${spacing.double}px;
`;
