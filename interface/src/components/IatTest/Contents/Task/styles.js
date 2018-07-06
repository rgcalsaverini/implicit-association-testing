import styled, { css } from 'styled-components';
import { spacing, colors, FlexCenter, FlexColCenter, TextHuge, FlexRow } from 'base_styles';

export const Container = styled.div`
  width: 100%;
  height: 500px;
  flex-grow: 1;
`;

export const Anchor = styled.div`
  position: relative;
  top: 160px;
  width: 100%;
  height: calc(100% - 170px);
`;

export const MistakeContainer = styled.div`
  ${FlexCenter}
  height: ${props => (props.show ? '100' : '10')}px;
  left: 0px;
  opacity: ${props => (props.show ? '1' : '0')};
  padding-top: ${props => (props.show ? '0px' : '50px')};
  position: absolute;
  transition: all ease-in-out 100ms;
  width: 100%;
`;

const itemTransition = 'top ease-in-out 100ms, left ease-in-out 80ms, opacity ease-in-out 8ms 40ms';

const baseItem = css`
  opacity: ${props => (props.hide || props.hideTo ? '0' : '1')};
  transition: ${props => (props.hideTo ? itemTransition : 'none')};
  top: ${props => (props.hideTo ? '-400' : '0')}px;
  left: 0px;
  ${props => (props.hideTo === 'left' ? 'left: -400px;' : '')}
  ${props => (props.hideTo === 'right' ? 'left: 400px;' : '')}
  position: relative;
`;

export const Item = styled.div`
  ${FlexCenter}
  ${TextHuge}
  ${baseItem}
  color: ${colors.dark}
  font-weight: 700;
  height: 100%;
  position: absolute;
  width: 100%;
`;

export const ItemImage = styled.img`
  ${baseItem}
  max-width: 300px;
  max-height: 225px;
`;

export const InstructionsContainer = styled.div`
    ${FlexColCenter}
    padding: 36px;
    width: 100%;
    top: ${props => (props.small ? '10px' : '0px')};
    bottom: ${props => (props.small ? '40px' : '0px')};
    background-color: #FFF;
    position: ${props => (props.small ? 'fixed' : 'absolute')};
    z-index: 11;
`;

export const TableContainer = styled.div`
    ${FlexRow}
    width: 100%;
    height: 100%;
    overflow-x: auto;
`;

export const TableRow = styled.div`
  box-sizing: border-box;
  padding: ${spacing.default}px;
  height: 60px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #AAA;
  width: 100%;
`;

export const TableImage = styled.img`
  height: 100%;
  max-height: 50px;
  padding: ${spacing.default}px;
`;

export const TableText = styled.span`
  padding: ${spacing.default}px;
`;

export const GroupCol = styled.div`
    ${FlexColCenter}
    font-weight: 700;
`;

export const ItemCol = styled.div`
    ${FlexColCenter}
    box-sizing: border-box;
    align-items: flex-start;
    flex-grow: 1;
`;

export const Section = styled.div`
  font-size: 18px;
  padding: ${props => (props.long ? 2 : 0.33) * spacing.default}px;
  display: ${props => (props.hide ? 'none' : 'block')};
`;

export const Accent = styled.span`
  color: ${props => (props.red ? colors.red : colors.primary)};
  font-weight: 700;
  font-size: 20px;
`;
