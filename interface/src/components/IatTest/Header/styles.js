import styled from 'styled-components';
import { spacing, colors, Card, FlexColCenter, FlexRow, TextHuge, TextSmall } from 'base_styles';

export const Container = styled.div`
  ${FlexRow}
  align-self: flex-start;
  width: 100%;
  position: relative;
`;

export const CellContainer = styled.div`
  ${FlexRow}
  justify-content: flex-start;
  width: calc(50% + 50px);
  left: ${props => (props.left ? '-50px' : '50%')};
  top: -50px;
  height: 100px;
  position: absolute;
`;

export const GroupContainer = styled.div`
  ${FlexColCenter}
  ${TextHuge}
  flex-grow: 1;
  order: ${props => (!props.left && -1) || 2}
  padding: 0px ${spacing.default}px 0px ${spacing.default}px;
  align-items: ${props => (props.left ? 'flex-start' : 'flex-end')};
  justify-content: flex-start;
  margin-top: 180px;
  height: 100%;
`;

export const KeyContainer = styled.div`
  ${Card}
  ${FlexColCenter}
  background-color: ${colors.primary};
  height: 100px;
  width: 100px;
`;
export const Key = styled.div`
  ${FlexColCenter}
  color: ${colors.textOnPrimary};
  order: ${props => (props.left && -1) || 2}
`;
export const KeySmall = styled.div`
  ${TextSmall}
`;

export const KeyBig = styled.div`
  font-size: 40px;
  font-weight: 700;
`;

export const InlineThin = styled.div`
  text-align: ${props => (props.left ? 'left' : 'right')};
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
`;
