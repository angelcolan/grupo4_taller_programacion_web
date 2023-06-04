import Pau from './pau/main.js';
import './main.css'

import {scrollToId} from './utils.js';

Pau.controller('Todos', function (scope) {
    scope.goToAbout = function () {
        scrollToId('about');
    }

    scope.goToServices = function () {
        scrollToId('services');
    }

    scope.goToPricing = function () {
        scrollToId('pricing');
    }
})

Pau.bootstrap()
