import styled from 'styled-components';
import { spacing } from '../../../base_styles';


export const ConsentContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-x: hidden;
  width: 100%;
  align-items: center;
`;

export const ConsentText = styled.div`
  box-sizing: border-box;
  font-family: 'Roboto', sans-serif;
  overflow-x: hidden;
  overflow-y: auto;
  padding: ${spacing.double}px;
  flex-grow: 1;
  width: 100%;
`;

export const ConsentButtonContainer = styled.div`
`;
