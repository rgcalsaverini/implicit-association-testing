import styled from 'styled-components';
import { colors, FlexCol } from 'base_styles';

export const Container = styled.div`
  ${FlexCol}
  height: 100%;
  overflow-x: hidden;
  width: 100%;
  align-items: center;
`;

export const StepperContainer = styled.div`
  width: 90%;
  margin: 10px
`;
export const QuestionTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  width: 100%;
  padding-left: 24px;
  margin: 12px;
  color: ${colors.primary}
`;

export const QuestionBody = styled.div`
  flex-grow: 1;
  width: 100%;
  padding-left: 24px;
`;
