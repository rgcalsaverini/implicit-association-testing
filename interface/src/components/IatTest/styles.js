import styled from 'styled-components';
import { colors, FlexCol, FlexRow, FlexCenter, Card, FixedFill } from 'base_styles';

const maxWidth = 930;
const maxHeight = 600;

export const Container = styled.div`
  ${FlexCenter}
  ${FixedFill}
  background-color: #0b2e51;
  font-family: 'Roboto', sans-serif;
`;

export const ImgBg = styled.div`
  ${FixedFill}
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(/poly.svg);
  opacity: 0.07
  z-index: -1;
`;

export const LogoIff = styled.img`
  padding-right: calc(15% + 80px);
  height: 50px;
`;

export const LogoIffHeader = styled.img`
  display: ${props => (props.hide ? 'none' : 'block')};
  width: 100%;
  max-width: 250px;
`;

export const LowerCell = styled.div`
  ${FlexCol}
  height: ${props => (props.small ? '100%' : '80%')};
  width: 100%;
  justify-content: flex-start;
`;

export const Inner = styled.div`
  ${FlexCol}
  ${Card}
  ${props => (props.small ? 'border-radius: 0px;' : '')}
  background-color: #FFF;
  border-top: 8px solid ${colors.primary};
  width: ${props => (props.small ? '100%' : 'calc(100% - 100px)')};
  max-width: ${maxWidth}px;
  height: 100%;
  max-height: ${props => (props.small ? '100%' : `${maxHeight}px`)};
`;

export const Footer = styled.div`
  opacity: 0.7;
  font-size: 18px;
  font-weight: 300;
  font-style: italic;
`;

export const TopContainer = styled.div`
  ${FlexRow}
  display: ${props => (props.small ? 'none' : 'flex')};
  width: 100%;
  height: 20%;
  max-width: ${maxWidth}px;
  justify-content: center;
`;
export const TitleContainer = styled.div`
  ${FlexCol}
  justify-content: center;
  padding-bottom: 20px;
  height: 100%;
  min-height: 80px;
  overflow: hidden;
  font-size: 32px;
  font-weight: 700;
  letter-spacing: 6px;
  color: #FFF;
  letter-spacing: 3px;
`;

export const Subtitle = styled.div`
  letter-spacing: normal;
  font-size: 18px;
  font-weight: 300;
  text-transform: uppercase;
  color: ${colors.ligth};
`;
