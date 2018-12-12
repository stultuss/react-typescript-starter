import * as React from 'react';
import {hot} from 'react-hot-loader';
import {Switch} from 'react-router';
import {Link, Route} from 'react-router-dom';
import BaseComponent from './BaseComponent';

import '../public/styles/core.scss';

import Home from './Home';
import Page1 from './Page1';
import Page2 from './Page2';
import NotFound from './NotFound';

// App 入口
class App extends BaseComponent<any, any> {
    render() {
        const me = this;
        return (
            <div id={ 'App' }>
                <header>
                    <Link to={ '/' }>Home</Link>
                    <Link to={ '/page1' }>Page1</Link>
                    <Link to={ '/page2' }>Page2</Link>
                    <Link to={ '/page3' }>Page3</Link>
                </header>
                <Switch>
                    /** 这里用 exact，仅仅是担心 location 被 path='/'截胡了。 **/
                    <Route path="/" exact component={ Home } loadData={{ name: 'fengjie' }}/>
                    <Route path="/page1" component={ Page1 }/>
                    <Route path="/page2" component={ Page2 }/>
                    <Route component={ NotFound }/>
                </Switch>
            </div>
        );
    }
}

/**
 * strict 和 exact 的区别
 * 使用了strict: location 大于等于 path 才能匹配, eg: path='/one' location='/one/a'能匹配。
 * 使用了exact: location 约等于 path 才能匹配, eq: path='/one' location='/one'或者 '/one/'能匹配，所以说是约等于。
 * 使用了exact 和 strict: location = path 才能匹配
 */

export default hot(module)(App);