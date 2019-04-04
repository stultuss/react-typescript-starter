import * as React from 'react';

interface IProps {
  sec?: number;
}

interface IState {
  sec?: number;
}

class Loading extends React.Component<IProps, IState> {

  private _timer;

  constructor(props: IProps) {
    super(props);

    this.state ={
      sec: props.sec,
    };
  }

  componentDidMount() {
    this.reduce();
  }

  componentWillUnmount(): void {
    this._timer && clearTimeout(this._timer);
  }

  reduce()  {
    this._timer = setTimeout(() => {
      const sec = this.state.sec - 1;
      if (sec > 0) {
        this.setState({
          sec: sec,
        });
        this.reduce();
      }
    }, 1000)
  }

  render() {
    return (
      <div>Loading...{this.state.sec}</div>
    );
  }
}

export default Loading;