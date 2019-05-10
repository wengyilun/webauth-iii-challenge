import React from 'react';
import axios from 'axios';
import styled from "styled-components";

const CenterContainer = styled.div`
  width: 100%;
  margin:0 auto;
  text-align: center;
`;

export default function(Component) {
  return class Authenticated extends React.Component {
    render() {
      const token = localStorage.getItem('token');
      const notLoggedIn = <CenterContainer><h3>Please login to see the users</h3></CenterContainer>;

      return <>{token ? <Component {...this.props} /> : notLoggedIn}</>;
    }
  };
}
