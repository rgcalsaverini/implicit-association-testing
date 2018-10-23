import styled from 'styled-components';
import { colors, FlexCol, FlexRow } from 'base_styles';

export const Container = styled.div`
  ${FlexCol}
  height: 100%;
  overflow: hidden;
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
  overflow-x: auto;
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

export const MatrixContainer = styled.div`
  // background: rgba(255, 0, 0, .2);
  width: 100%;
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
  flex-grow: 1;
  text-align: center;
  padding: 0px 4px 0px 4px;
  flex: 1;
  overflow: hidden;
  min-width: 80px;
`;

export const MatrixLabelCell = styled.div`
  width: 33%;
  max-width: 400px;
  min-width: 150px;
  overflow: hidden;
  word-break: break-all;
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
  box-sizing: border-box;
  align-items: flex-start;
  justify-content: flex-start;
  background-color: ${props => (props.active ? '#F5F5F5' : 'transparent')};
  border: 1px ${props => (props.active ? 'solid' : 'dashed')} #BBB;
  flex-grow: 1;
  padding: 12px;
  height: 100%;
  width: 50%;
  overflow: auto;
  border-radius: 3px;
`;

export const DragColumnMiddle = styled.div`
  ${FlexCol}
  box-sizing: border-box;
  height: calc(100% - 40px);
  width: 100px;
  margin: 40px -6px 0px -6px;
  z-index: 99;
`;

export const DragItem = styled.div`
  ${FlexRow}
  box-sizing: border-box;
  border-radius: 6px;
  padding: 4px;
  margin: 4px;
  background-color: #deedf4;
  font-size: 18px;
  opacity: ${props => (props.dragging ? '0.66' : '1')};
`;

export const DragItemOrder = styled.div`
  ${FlexCol}
  box-sizing: border-box;
  margin-right: 8px;
  font-size: 14px;
  opacity: 0.7;
`;
