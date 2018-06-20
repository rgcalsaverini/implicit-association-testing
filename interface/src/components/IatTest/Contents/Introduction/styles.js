import styled from 'styled-components';
import { spacing, FlexCol } from 'base_styles';


export const Container = styled.div`
  ${FlexCol}
  height: 100%;
  overflow-x: hidden;
  width: 100%;
  align-items: center;
`;

export const Text = styled.div`
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${spacing.double}px;
  flex-grow: 1;
  width: 100%;
`;
