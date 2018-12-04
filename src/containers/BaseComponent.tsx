import {Component} from 'react';

class BaseComponent<P, S> extends Component<P, S> {

  getClassName() {
    return this.constructor.name
  }

}

export default BaseComponent;