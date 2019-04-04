import * as React from 'react';
import {Route} from 'react-router-dom';

class Status extends React.Component<{ code, children }, any> {
  render() {
    const me = this;
    return (
      <Route render={({staticContext}) => {
        if (staticContext) {
          staticContext.statusCode = me.props.code;
        }
        return me.props.children;
      }}/>
    );
  }
}

class NotFound extends React.Component<any, any> {
  render() {
    return (
      <Status code={404}>
        <div>
          <h1>抱歉，页面消失了!</h1>
        </div>
      </Status>
    );
  }
}

export default NotFound;
