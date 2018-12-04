import * as React from 'react';
import * as ReactRom from 'react-dom';

import Hello from './containers/Hello';

ReactRom.render(
    <Hello name='fengjie'/>,
    document.getElementById('wrapper')
);