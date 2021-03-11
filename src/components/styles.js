import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Image = styled.img`
  display: ${(props) => (props.display ? 'block' : 'none')};
  width: 6em;
  height: 6em;
`;

export const Card = styled.div`
  height: 14rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
  &:hover {
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2);
  }
  cursor: pointer;
`;

export const StyledLinkComponent = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export const StyledBadge = styled.span`
  background: ${(props) => (props.primary ? props.primary : 'blue')};
  color: white;
  cursor: pointer;
`;

export const ProgressBar = styled.div`
  width: ${(props) => (props.value ? `${props.value}%` : '0%')};
`;
