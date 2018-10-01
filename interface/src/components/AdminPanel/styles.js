import styled from 'styled-components';
import { colors, FlexCol, FlexRow, TextBig, Card, FixedFill, shadow, spacing } from 'base_styles';

const maxWidth = 930;
const barHeight = 60;

export const Container = styled.div`
  ${FlexRow}
  ${FixedFill}
  font-family: 'Roboto', sans-serif;
  justify-content: center;
  background-color: #F0F0F0;
`;

export const TopBar = styled.div`
  ${FlexCol}
  ${FixedFill}
  ${TextBig}
  color: white;
  background-color: ${colors.primary};
  justify-content: center;
  height: ${barHeight}px;
  box-shadow: ${shadow.s1};
`;

export const Body = styled.div`
  ${FlexCol}
  justify-content: flex-start;
  flex-grow: 1;
  max-width: ${maxWidth}px;
  width: 100%;
  box-sizing: border-box;
  height: calc(100% - ${barHeight}px);
  align-items: flex-start;
  background-color: white;
  padding: ${spacing.double}px;
  margin-top: 60px;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Section = styled.div`
  width: 100%;
  height: ${props => (props.height ? `${props.height}px` : 'auto')}
  // border-bottom: 1px solid ${colors.dark};
  padding: ${spacing.default}px;
  box-sizing: border-box;
`;
