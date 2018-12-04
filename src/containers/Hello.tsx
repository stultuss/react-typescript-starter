import * as React from 'react';
import BaseComponent from './BaseComponent';

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
            <div>
                Hello World, {(this.props as Props).name}!
            </div>
        );
    }
}

export default Hello;