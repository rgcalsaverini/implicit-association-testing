import styled from 'styled-components';
import { colors, FlexCol, FlexRow, TextSmall, other, TextBig, shadow, spacing } from 'base_styles';

export const TabContainer = styled.div`
  width: 100%;
  height: 600px;
  max-height: 60vh;
  overflow-x: hidden;
  overflow-y: auto;
`;
export const TextArea = styled.textarea`
  width: calc(100% - 10px);
  height: calc(100% - 20px);
  outline: none;
  border: none;
  resize: none;
`

// <textarea name="Text1" cols="40" rows="5"></textarea>
