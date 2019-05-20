import React from 'react';

class textfield extends React.Component {
    render() {

        return (
            <div>
                <label for="f-password">Password (required): </label>
                <input
                    aria-required="true"
                    data-error="Please enter your password."
                    id="f-password"
                    password="f[password]"
                    type="text"
                />
            </div>
        );
    }

}

export default textfield;