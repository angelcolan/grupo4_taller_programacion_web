import Ghi from './ghi/main.js';
import './main.css'

import {scrollToId} from './utils.js';

Ghi.controller('Todos', function (scope) {
    scope.goToAbout = function () {
        scrollToId('about');
    }

    scope.goToServices = function () {
        scrollToId('services');
    }
})

Ghi.bootstrap()
