import React from "react";

export const LoginContext = React.createContext();

export default class LoginProvider extends React.Component {
  state = {
    isAuthenticatedRoot: false,
    isAuthenticatedUser: false,
    userName:""
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
            }),
          updateUserName: (name) =>
            this.setState({
              userName: name
            })
        }}
      >
        {this.props.children}
      </LoginContext.Provider>
    );
  }
}
