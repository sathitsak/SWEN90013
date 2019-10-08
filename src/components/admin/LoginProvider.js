import React from "react";

export const LoginContext = React.createContext();

export default class LoginProvider extends React.Component {
  state = {
    isAuthenticatedRoot: false,
    isAuthenticatedUser: false
  };

  render() {
    return (
      <LoginContext.Provider
        value={{
          state: this.state,
          authenticateRootUser: () =>
            this.setState({
              isAuthenticatedRoot: true
            }),
          authenticateUser: () =>
            this.setState({
              isAuthenticatedUser: true
            })
        }}
      >
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}
