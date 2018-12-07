import * as React from 'react';
import {Route} from 'react-router-dom';
import BaseComponent from './BaseComponent';

class Status extends BaseComponent<{code, children}, any> {
    render() {
        const me = this;
        return (
            <Route render={({staticContext}) => {
                if (staticContext) {
                    staticContext.statusCode = me.props.code;
                }
                return  me.props.children;
            }}/>
        );
    }
}

class NotFound extends BaseComponent<any, any> {
    render() {
        return (
            <Status code={ 404 }>
                <div>
                    <h1>抱歉，页面消失了</h1>
                    <img src={require('../public/img/1.svg')} width={100} height={100} />
                    <img src={require('../public/img/2.jpg')} width={100} height={100} />
                </div>
            </Status>
        );
    }
}

export default NotFound;
