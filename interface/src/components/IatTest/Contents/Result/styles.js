import styled from 'styled-components';
import { colors, FlexCenter, Card } from 'base_styles';


export const Container = styled.div`
  ${FlexCenter}
  height: 100%;
  overflow-x: hidden;
  width: 100%;
  align-items: center;
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
