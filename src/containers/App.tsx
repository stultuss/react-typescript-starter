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
                    <Route path="/" exact component={ Home }/>
                    <Route path="/page1" component={ Page1 }/>
                    <Route path="/page2" component={ Page2 }/>
                    <Route component={ NotFound }/>
                </Switch>
            </div>
        );
    }
}

export default hot(module)(App);