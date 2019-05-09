import React from 'react'
import Typography from '@material-ui/core/Typography'; 

class TestText extends React.Component {
    render () {
        return (
            <Typography paragraph>
            Clicking on a button on the left will display the relevant information here.
            <br/>
            eg. clicking on 'view proposals' will display the view proposals page 
          </Typography>
        )
    }
}

export default TestText