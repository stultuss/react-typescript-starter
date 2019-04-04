import * as React from 'react';
import './index.scss';

interface IProps {
}

class App extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div id={'home'}>
        <h3>Hello World!</h3>
        <div id={'img1'} className={'img'}/>
      </div>
    );
  }
}

export default App;