import Component from "../pau/component";
import store from '../shared/data-access/app-store/index';

export default class ListServices extends Component {
    constructor() {
        super({
            store,
            element: document.querySelector('#list-services')
        });
    }

    render() {
        let self = this;

        self.element.innerHTML = `
            <div class="-mr-[1px] -ml-[1px] grid grid-cols-1 gap-x-[1px] gap-y-[1px] border-t border-b border-[#d8e7eb] bg-[#d8e7eb] lg:grid-cols-3">
                ${store.state.services.map(service => {
                    return `
                    <div class="px-[0em] pt-[2em] pb-[1em] bg-white lg:px-[2em]">
                        <div class="relative z-0 w-[8em] h-[8em] mr-[1.5em] mb-[1em] float-left">
                            <div class="relative z-10 flex w-[8em] h-[8em] p-[2em] justify-center items-center border-solid\tborder-2 border[#e4f0fc] rounded-[50%] bg-image-radial">
                                <img src="./../img/svg/icon-service-01.svg" alt="Servicio 01" class="object-contain h-[4em] w-[4em] max-w-[100%]">
                            </div>
                        </div>
                        <div class="relative z-20 mb-[0.625em] text-[#1386eb] text-[0.8em] font-bold tracking-[0.25ch] uppercase">Servicio ${service.service_id}</div>
                        <h5 class="mb-[10px] text-[1.25em] font-['Anton'] mt-0 pt-[0.03125ch] uppercase font-semibold leading-[1.295]">${service.service_name}</h5>
                        <p class="mb-[1em] text-[#2e4a52]">${service.service_description}</p>
                    </div>
                    `
                }).join('')}
            </div>
        `;

    }
}
