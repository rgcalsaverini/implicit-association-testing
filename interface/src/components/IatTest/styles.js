import styled from 'styled-components';
import { spacing, other, shadow, colors } from '../../base_styles';

// const accent = '#247BA0';
// const accent = '#F25F5C';

export const Container = styled.div`
  font-family: 'Roboto', sans-serif;
  background-color: ${colors.light};
  bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: center;
  left: 0px;
  position: fixed;
  right: 0px;
  top: 0px;
`;

export const Inner = styled.div`
  align-items: center;
  background-color: #FFF;
  border-top: 8px solid ${colors.primary};
  // border-top: ${props => (props.started ? '0px' : '8px')} solid ${colors.primary};
  border-radius: ${other.borderRad}px;
  box-shadow: ${shadow.s1};
  box-sizing: border-box;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  height: 100%;
  margin: 0px;
  padding: ${spacing.default}px;
  max-height: 680px;
  max-width: 1100px;
  width: 100%;
`;

export const Header = styled.div`
  align-self: flex-start;
  justify-content: space-between;
  display: flex;
  flex-direction: row;
  width: 100%;
  position: relative;
`;

export const HeaderCell = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: center;
  width: calc(50% + 50px);
  left: ${props => (props.left ? '-50px' : '50%')};
  top: -50px;
  height: 100px;
  position: absolute;
`;

export const GroupTitle = styled.div`
  flex-grow: 1;
  font-size: 32px;
  order: ${props => (!props.left && -1) || 2}
  padding: 0px ${spacing.default}px 0px ${spacing.default}px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: ${props => (props.left ? 'flex-start' : 'flex-end')};
  justify-content: flex-start;
  margin-top: 180px;
  height: 100%;
`;

export const KeyLabelContainer = styled.div`
  box-shadow: ${shadow.s1};
  border-radius: ${other.borderRad}px;
  box-sizing: border-box;
  background-color: ${colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100px;
  width: 100px;
`;
export const Key = styled.div`
  align-items: center;
  box-sizing: border-box;
  color: ${colors.textOnPrimary};
  display: flex;
  flex-direction: column;
  justify-content: center;
  order: ${props => (props.left && -1) || 2}
`;
export const KeySmall = styled.div`
  font-size: 12px;
`;

export const KeyBig = styled.div`
  font-size: 35px;
  font-weight: 700;
`;

export const Footer = styled.div`
  opacity: 0.7;
  font-size: 18px;
  font-weight: 300;
  font-style: italic;
`;

export const InlineThin = styled.div`
  text-align: ${props => (props.left ? 'left' : 'right')};
  font-size: 20px;
  font-weight: 300;
  font-style: italic;
`;
