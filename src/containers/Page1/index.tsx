import * as React from 'react';
import {Link} from 'react-router-dom';
import BaseComponent from '../BaseComponent';

interface Props {}

interface State {}

class App extends BaseComponent<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h1>Page1</h1>
                <div>
                    <Link to={ '/home' }>back</Link>
                </div>
            </div>
        );
    }
}

export default App;