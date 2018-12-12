import * as React from 'react';
import {Link, Route} from 'react-router-dom';
import BaseComponent from '../BaseComponent';

interface Props {
    match: any;
}

interface State {}

class App extends BaseComponent<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        console.log(this.props);
        const match = (this.props as any).match;
        return (
            <div>
                <h1>Page2</h1>
                <ul>
                    <li>
                        <Link to={`${match.url}/components`}>Components</Link>
                    </li>
                    <li>
                        <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                    </li>
                </ul>
                <Route path={`${match.path}/:id`} component={Topic} />
                <Route
                    exact
                    path={match.path}
                    render={() => <h3>Please select a topic.</h3>}
                />
                <div>
                    <Link to={ '/' }>back</Link>
                </div>
            </div>
        );
    }
}

const Topic = ({ match }) => <h3>Requested Param: {match.params.id}</h3>;

export default App;