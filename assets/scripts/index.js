'use strict';

import React from 'react';
import {render} from 'react-dom';
import Musters from './components/musters.jsx';
import ActiveLink from './lib/active-link';

ActiveLink.init();

render( <Musters url='/musters/data'/> , document.getElementById('musters'));
