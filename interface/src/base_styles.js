import styled, { css } from 'styled-components';

export const spacing = {
  default: 8,
  double: 16,
};

export const other = {
  borderRad: 6,
};

export const shadow = {
  s1: '0 4px 6px 0 rgba(0,0,0,.2)',
};

export const colors = {
  primary: '#0075B2',
  secondary: '#50514F',
  light: '#E6F2F7',
  dark: '#50514F',
  textOnPrimary: '#FFF',
  red: '#F00',
};

/* Flex containers */
export const FlexCol = css`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

export const FlexRow = css`
  ${FlexCol}
  flex-direction: row;
`;

export const FlexColCenter = css`
  ${FlexCol}
  justify-content: center;
`;

export const FlexCenter = css`
  ${FlexCol}
  align-items: center;
  justify-content: center;
`;

/* Other */
export const Card = css`
  border-radius: ${other.borderRad}px;
  box-sizing: border-box;
  box-shadow: ${shadow.s1};
  padding: ${spacing.default}px;
`;

export const FixedFill = css`
  bottom: 0px;
  left: 0px;
  position: fixed;
  right: 0px;
  top: 0px;
`;

export const TextHuge = css`
  fontSize: 32px;
`;

export const TextBig = css`
  fontSize: 24px;
`;

export const TextSmall = css`
  fontSize: 12px;
`;

export const Nothing = styled.span`
  width: 0px;
  height: 0px;
  display: none;
  opacity: 0;
`;
