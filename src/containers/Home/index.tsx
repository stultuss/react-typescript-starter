import * as React from 'react';
import BaseComponent from '../BaseComponent';
import './index.scss';

interface Props {
}

interface State {
}

class App extends BaseComponent<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div id={ 'home' }>
                <h1>Hello World</h1>
                <div id={ 'img1' } className={ 'img' }/>
                <div id={ 'img2' } className={ 'img' }/>
            </div>
        );
    }
}

export default App;