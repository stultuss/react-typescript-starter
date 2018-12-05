import * as React from 'react';
import { hot } from 'react-hot-loader'
import BaseComponent from './BaseComponent';

import '../public/styles/test.scss';

export interface Props {
    name: string;
    enthusiasmLevel?: number;
}

interface State {
    currentEnthusiasm: number;
}

class Hello extends BaseComponent<Props, State> {

    constructor(props: Props) {
        super(props);
    }

    render() {
        return (
            <div className={'test'}>
                Hello World, {(this.props as Props).name}!
                <div className={'img1'}/>
                <div className={'img2'}/>
                <div className={'img3'}/>
            </div>
        );
    }
}

export default hot(module)(Hello);