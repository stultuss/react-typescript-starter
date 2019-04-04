import * as React from 'react';

interface IProps {
}

class App extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Admin Page</h1>
      </div>
    );
  }
}

export default App;