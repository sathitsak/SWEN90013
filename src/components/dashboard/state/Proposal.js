import React, { useState } from "react";

export const ProposalContext = React.createContext([undefined, () => {}]);

export const ProposalProvider = props => {
  const [state, setState] = useState(undefined); // [], [{ ... }, {...}]

  return (
    <ProposalContext.Provider value={[state, setState]}>
      {props.children}
    </ProposalContext.Provider>
  );
};
