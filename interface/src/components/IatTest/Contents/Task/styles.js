import styled, { css } from 'styled-components';
import { spacing, colors, FlexCenter, FlexColCenter, TextHuge } from 'base_styles';

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

export const Instructions = styled.div`
  ${FlexColCenter}
  // align-items: flex-start;
  padding: 36px;
  width: 100%;
  height: 100%;
  background-color: #FFF;
  position: absolute;
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
