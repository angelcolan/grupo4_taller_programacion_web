import Pau from './pau/main.js';
import './main.css'
import axios from 'axios';
import swal from 'sweetalert';

import {scrollToId} from './utils.js';
import CountCar from "./components/count.car";
import appStore from './shared/data-access/app-store/index';
import ListServices from "./components/list.services";

Pau.controller('Home', async function (scope) {
    scope.prices = [
        {
            id: 1,
            description: 'Cars',
            selected: true,
            plains: [
                {
                    name: 'Basico',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    price: 'S/ 200',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Standar',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    price: 'S/ 250',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Premiun',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    price: 'S/ 300',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Ultimate',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt.',
                    price: 'S/ 320',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                }
            ]
        },
        {
            id: 2,
            description: 'Suvs',
            selected: false,
            plains: [
                {
                    name: 'Basico',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 1.',
                    price: 'S/ 120',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Standar',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 2.',
                    price: 'S/ 150',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Premiun',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 3.',
                    price: 'S/ 290',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Ultimate',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 4.',
                    price: 'S/ 310',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                }
            ]
        },
        {
            id: 3,
            description: 'Trucks',
            selected: false,
            plains: [
                {
                    name: 'Basico',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 5.',
                    price: 'S/ 100',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Standar',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 6.',
                    price: 'S/ 130',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Premiun',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 7.',
                    price: 'S/ 160',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Ultimate',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 8.',
                    price: 'S/ 190',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                }
            ]
        },
        {
            id: 4,
            description: 'Bikes',
            selected: false,
            plains: [
                {
                    name: 'Basico',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 9.',
                    price: 'S/ 50',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Standar',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 10.',
                    price: 'S/ 60',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Premiun',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 11.',
                    price: 'S/ 70',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                },
                {
                    name: 'Ultimate',
                    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt 12.',
                    price: 'S/ 80',
                    features: [
                        'Pellentesque iaculis lorem',
                        'Nulla dictum lectus sed',
                        'Nullam non massa magna',
                    ]
                }
            ]
        }
    ];
    scope.plainsPriceSelected = scope.prices[0].plains;

    const url = `http://localhost/tpw_final/api/service`;
    const response = await axios.get(url);

    if (response.status == 200) {
        appStore.dispatch('populateListServices', response.data.data)
        const listServices = new ListServices();
        listServices.render();
    }

    scope.goToAbout = function () {
        scrollToId('about');
    }

    scope.goToServices = function () {
        scrollToId('services');
    }

    scope.goToPricing = function () {
        scrollToId('pricing');
    }

    scope.goToContact = function () {
        scrollToId('contact');
    }

    scope.selectPrice = function (event) {
        for (let i = 0; i < scope.prices.length; i++) {
            scope.prices[i].selected = false;
        }
        scope.prices[event.scope.$index].selected = true;
        scope.plainsPriceSelected = scope.prices[event.scope.$index].plains;
    }

    scope.addServiceToCar = function (event) {
        const service = scope.prices[event.scope.$index];
        appStore.dispatch('addServiceToCar', {
            id: service.id,
            description: service.description
        })
    }

    const myForm = document.getElementById("myForm")
    myForm.addEventListener("submit", async function (e) {
        e.preventDefault();
        const contact = e.target;
        var formData = new FormData(contact);
        const formProps = Object.fromEntries(formData);

        if (!formProps.fullname.length) {
            swal("Uups!", "Necesitamos tus nombres para contactarte!", "error");
            return false;
        }

        if (!formProps.phone.length) {
            swal("Uups!", "Necesitamos tu número de celular para ofrecerte promociones!", "error");
            return false;
        }

        if (!formProps.email.length) {
            swal("Uups!", "Necesitamos tu correo  ofrecerte promociones!", "error");
            return false;
        }

        const submitForm = document.getElementById("submitForm")
        submitForm.disabled = true;
        submitForm.innerText = 'Enviando....';

        const url = `http://localhost/tpw_final/api/contact`;
        const response = await axios.post(url, formProps);

        if (response.status == 200) {
            swal("Muy bien!", "Te enviamos un mensaje para poder orientarte!", "success");
            myForm.reset();
        } else {
            swal("Uups!", "Ocurrio un error al registrar tus datos, intenta nuevamente en un momento!", "error");
        }
        submitForm.disabled = false;
        submitForm.innerText = 'Suscríbete';
    });

})

Pau.bootstrap()
