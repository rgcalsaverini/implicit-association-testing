import styled from 'styled-components';
import { colors, FlexCol, FlexRow } from 'base_styles';

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
  display: flex;
  flex-grow: 1;
  width: 100%;
  box-sizing: border-box;
`;

export const OtherField = styled.div`
  ${FlexCol}
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  height: ${props => (props.visible ? '45px' : '0px')};
  overflow: hidden;
  transition: all ease-in-out ${props => (props.visible ? '200ms' : '0ms')};
`;

export const MatrixRow = styled.div`
  ${FlexRow}
  justify-content: space-between;
  box-sizing: border-box;
  padding: 6px;
  &:hover {
    background: #F3F3F3;
  }
`;

export const MatrixRadioCell = styled.div`
  ${FlexRow}
  justify-content: center;
  align-items: center;
  width: 100px;
  text-align: center;

`;

export const MatrixLabelCell = styled.div`
  width: 20%;
`;

export const DragBoard = styled.div`
  ${FlexRow}
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding: 12px;
  flex-grow: 1;

`;

export const DragColumn = styled.div`
  ${FlexCol}
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${props => (props.active ? '#F0F0F0' : 'transparent')};
  border: 1px dashed #BBB;
  flex-grow: 1;
  padding: 12px;
  height: 100%;
  width: 50%;
  overflow: auto;
  border-radius: 3px;
`;

export const DragColumnMiddle = styled.div`
  ${FlexCol}
  height: 100%;
  width: 100px;
  margin: 40px -6px 0px -6px;
`;

export const DragItem = styled.div`
  ${FlexRow}
  border-radius: 6px;
  padding: 4px;
  margin: 4px;
  background-color: #deedf4;
  font-size: 18px;
`;

export const DragItemOrder = styled.div`
  ${FlexCol}
  margin-right: 8px;
  font-size: 14px;
  opacity: 0.7;
`;
