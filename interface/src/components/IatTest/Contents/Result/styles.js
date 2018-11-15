import styled from 'styled-components';
import { colors, FlexCenter, Card, TextHuge, spacing } from 'base_styles';


export const Container = styled.div`
  ${FlexCenter}
  height: 100%;
  overflow-x: hidden;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: ${spacing.double * 2}px;
`;

export const ResultCard = styled.div`
  ${FlexCenter}
  ${Card}
  padding: 36px;
  font-size: 24px;
  font-weight: 300;
  margin: 12px;
  wdith: 100%;
  color: ${colors.dark}
  background-color: rgba(0, 0, 0, .1);
`;

export const ResultTitle = styled.div`
  ${TextHuge}
  align-self: flex-start;
`;

export const ButtonContainer = styled.div`
  align-self: flex-end;
`;
