import {Component} from 'react';

class RootRouter<P, S> extends Component<P, S> {

    getClassName() {
        return this.constructor.name;
    }

}

export default RootRouter;