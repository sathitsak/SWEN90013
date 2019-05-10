import React from 'react';

var unimelb = require('../images/idea.jpg');

class LandingPage extends React.Component {

    render() {
        return (
            <div id="header" className="contrast-helper" style={ { backgroundImage: "url(" + unimelb + ")"}} >
                {/*<img src={ UniMelb } />*/}
                <header className="banner">
                    <div className="mid-align">
                        <h1>Software Engineering Projects</h1>
                        <p>Work with Australia's upcoming software engineers to build a system suited for your own
                            needs</p>
                    </div>
                </header>
            </div>


        )
    }
}

export default LandingPage;