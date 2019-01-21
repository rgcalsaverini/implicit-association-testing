import styled from 'styled-components';
import { FixedFill, FlexCenter, shadow } from 'base_styles';

export const Container = styled.div`
  ${FixedFill}
  ${FlexCenter}
  font-family: 'Roboto', sans-serif;
`;

export const Card = styled.div`
  ${FlexCenter}
  box-shadow: ${shadow.s1};
  background-color: #F0F0F0;
`;

export const Message = styled.div`
  padding: 20px;
`;
