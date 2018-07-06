import styled, { css } from 'styled-components';
import { spacing, colors, Card, FlexColCenter, FlexRow, TextHuge, TextBig, TextSmall } from 'base_styles';

export const Container = styled.div`
  ${FlexRow}
  align-self: flex-start;
  width: 100%;
  position: relative;
`;


const CellDesktop = css`
  ${FlexRow}
  justify-content: flex-start;
  width: calc(50% + 50px);
  left: ${props => (props.left ? '-50px' : '50%')};
  top: -50px;
  height: 100px;
`;


const CellMobile = css`
  ${FlexRow}
  justify-content: flex-start;
  width: 50%;
  left: ${props => (props.left ? '0px' : '50%')};
  top: 0px;
  height: calc(100vh - ${spacing.default * 3}px);
  z-index: 10;
  transition: background-color ease-in-out 200ms;
  background-color: rgba(ß, 0, 0, 0.0);

  &:active {
    transition: background-color ease-in-out 50ms;
    background-color: rgba(0, 0, 0, 0.15);
  }
`;

export const CellContainer = styled.div`
  ${props => (props.small ? CellMobile : CellDesktop)};
  position: absolute;
`;

export const GroupContainer = styled.div`
  ${FlexColCenter}
  ${props => (props.small ? TextBig : TextHuge)};
  flex-grow: 1;
  order: ${props => (!props.left && -1) || 2}
  padding: 0px ${spacing.default}px 0px ${spacing.default}px;
  align-items: ${props => (props.left ? 'flex-start' : 'flex-end')};
  justify-content: flex-start;
  margin-top: ${props => (props.small ? '20px' : '180px')};
  height: 100%;
`;

export const KeyContainer = styled.div`
  ${Card}
  ${FlexColCenter}
  ${props => (props.small ? 'display: none;' : '')};
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
