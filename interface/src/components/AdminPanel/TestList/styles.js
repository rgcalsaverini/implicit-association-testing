import styled from 'styled-components';
import { colors, FlexCol, FlexRow, TextSmall, other, TextBig, spacing } from 'base_styles';

export const Container = styled.div`
`;

export const Row = styled.div`
  ${FlexRow}
  width: 100%;
  box-sizing: border-box;
  border-width: 1px 1px 1px 12px;
  border-color: ${colors.primary};
  border-style: solid;
  border-radius: ${other.borderRad}px;
  height: 80px;
  margin: ${spacing.default}px 0px ${spacing.default}px 0px;
  padding: ${spacing.double}px ${spacing.double}px ${spacing.double}px 0px;
`;

export const GrowCol = styled.div`
  ${FlexCol}
  align-items: flex-start;
  flex-grow: 1;
  margin: 0px ${spacing.default}px 0px ${spacing.default}px;
`;

export const FixedCol = styled.div`
  ${FlexCol}
  box-sizing: border-box;
  width: 90px;
  margin: 0px ${spacing.default}px 0px ${spacing.default}px;
`;

export const Title = styled.div`
  ${TextBig}
  font-weight: bold;
`;

export const Number = styled.div`
  ${TextBig}
  font-weight: thin;
`;

export const Small = styled.div`
  ${TextSmall}
  opacity: 0.6;
  padding: 3px 0px 3px 0px;
`;
