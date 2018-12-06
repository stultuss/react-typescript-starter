import * as React from 'react';
import BaseComponent from '../BaseComponent';

interface Props {}

interface State {}

class App extends BaseComponent<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div><h1>Hello World</h1></div>
        );
    }
}

export default App;