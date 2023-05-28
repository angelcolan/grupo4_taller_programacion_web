import AbstractPage from "./AbstractPage.js";
import "./components/Header.js";
import "./components/InfoTop.js";
import "./components/ServicesNumber.js";
import "./components/VideoServices.js";

export default class extends AbstractPage {
    constructor(params) {
        super(params);
    }

    async render() {
        return `
    <section class="container mx-auto ">
        <app-header></app-header>
        <app-info-top></app-info-top>
        <app-services-number></app-services-number>
    </section>
    <app-video-services></app-video-services>
    <section class="bg-[#102429]">
        <section class="flex justify-between uppercase border-t border-b border-[#1d363d] container mx-auto text-white">
            <div class="flex items-center font-['Anton'] justify-center basis-1/4 gap-6 ">
                <div class="text-7xl">
                    7K
                </div>
                <div class="text-center">
                    <div class="text-[#1486eb] tracking-widest">Autos</div>
                    <div class="text-2xl tracking-wide">Mejorados</div>
                </div>
            </div>
            <div
                class="flex items-center font-['Anton'] justify-center basis-1/4 gap-6 border-r border-l border-[#1d363d] py-8">
                <div class="text-7xl">
                    3k
                </div>
                <div class="text-center">
                    <div class="text-[#1486eb] tracking-widest">Motos</div>
                    <div class="text-2xl tracking-widel">Mejorados</div>
                </div>
            </div>
            <div class="flex items-center font-['Anton'] justify-center basis-1/4 gap-6">
                <div class="text-7xl">
                    5k
                </div>
                <div class="text-center">
                    <div class="text-[#1486eb] tracking-widest">Camionetas</div>
                    <div class="text-2xl tracking-wide">Mejorados</div>
                </div>
            </div>
            <div class="flex items-center font-['Anton'] justify-center basis-1/4 gap-6 border-l border-[#1d363d] py-8">
                <div class="text-7xl">
                    8k
                </div>
                <div class="text-center">
                    <div class="text-[#1486eb] tracking-widest">Camiones</div>
                    <div class="text-2xl tracking-wide">Mejorados</div>
                </div>
            </div>
        </section>
        <section class="flex relative z-30 container mx-auto justify-center flex-col items-center text-white">
            <div class="relative z-20 w-16 h-px my-16 bg-[#1386eb]"></div>
            <div class="grid w-full pt-1 border-t border-b border-[#1d363d] grid-cols-2 text-center">
                <div class="px-16 border-r border-[#1d363d]">
                    <div class="flex flex-col justify-center flex-1">
                        <div class="flex h-16 justify-center items-center uppercase font-['Anton'] text-2xl">
                            <h5>Mapisa Visión</h5>
                        </div>
                        <div class="flex-1 text-[#b4cfd6] py-8 border-y border-[#1d363d]">
                            Quisque fermentum erat enim. Cras nec nisi at ipsum elementum tincidunt et nec nisi. Vivamus pharetra orci non elit egestas, 
                            vitae iaculis risus eleifend. Morbi dui odio, efficitur id enim et, cursus ultricies tortor. Vivamus quis mi lorem. 
                            Nunc condimentum, mi non dictum suscipit.
                        </div>
                        <a href="" class="flex h-16 justify-center bg-transparent items-center uppercase font-bold">Reservar</a>
                    </div>
                </div>
                <div class="px-16">
                    <div class="flex flex-col justify-center flex-1">
                        <div class="flex h-16 justify-center items-center uppercase font-['Anton'] text-2xl">
                            <h5>Mapisa Misión</h5>
                        </div>
                        <div class="flex-1 text-[#b4cfd6] py-8 border-y border-[#1d363d]">
                            Quisque fermentum erat enim. Cras nec nisi at ipsum elementum tincidunt et nec nisi. Vivamus pharetra orci non elit egestas, 
                            vitae iaculis risus eleifend. Morbi dui odio, efficitur id enim et, cursus ultricies tortor. Vivamus quis mi lorem. 
                            Nunc condimentum, mi non dictum suscipit.
                        </div>
                        <a href="" class="flex h-16 justify-center bg-transparent items-center uppercase font-bold">Contactanos</a>
                    </div>
                </div>
            </div>
            <div class="relative z-20 w-16 h-px my-16 bg-[#1386eb]"></div>
        </section>
    </section>
    <section class="bg-[#ffffff]">
        <section class="flex relative z-30 container mx-auto justify-center flex-col items-center text-white">
            <div class="relative z-20 w-16 h-px my-16 bg-[#1386eb]"></div>
            <div class="flex w-4/6 max-w-4xl justify-between items-center flex-col pb-8 border-l border-r border-[#d9e6eb]">
                <div class="relative px-8 min-h-4em">
                    <h2 class="relative z-10 mb-0 text-center text-[#102429] font-['Anton'] text-5xl uppercase">Servicios Mapisa</h2>
                    <img src="./../img/svg/vector-brush-stroke.svg" alt="" class="absolute left-0 top-auto right-0 bottom-0 w-full object-cover rotate-180">
                </div>
            </div>
            <div class="relative flex z-30 w-full flex-col items-center content-center max-w-screen-xl">
                <div class="grid grid-cols-3">
                    <div class="pt-9 pb-5 px-9 border-t border-b border-[#d9e6eb]">
                        <div class="relative z-0 w-32 h-32 float-left mr-6 mb-4">
                            <div class="relative z-10 flex h-32 w-32 rounded-full content-center items-center bg-image-radial justify-center">
                                <img src="./../img/svg/icon-service-01.svg" alt="Servicio 01" class="object-contain h-16 w-16">
                            </div>
                        </div>
                        <div class="relative z-20 text-[#1386eb] font-bold uppercase mb-2">Servicio - 01</div>
                        <h5 class="text-[#102429] text-2xl font-bold uppercase font-['Anton'] mb-3">
                            Detalles en interior
                        </h5>
                        <p class="text-[#2e4a52] tracking-wider mb-4">
                            Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspendisse varius enim in eros elementum 
                            tristique. Duis cursus, mi quis viverra ornare consec tetur adipiscing elit.
                        </p>
                    </div>
                    <div class="pt-9 pb-5 px-9 border-t border-b border-r border-l border-[#d9e6eb]">
                        <div class="relative z-0 w-32 h-32 float-left mr-6 mb-4">
                            <div class="relative z-10 flex h-32 w-32 rounded-full content-center items-center bg-image-radial justify-center">
                                <img src="./../img/svg/icon-service-02.svg" alt="Servicio 01" class="object-contain h-16 w-16">
                            </div>
                        </div>
                        <div class="relative z-20 text-[#1386eb] font-bold uppercase mb-2">Servicio - 02</div>
                        <h5 class="text-[#102429] text-2xl font-bold uppercase font-['Anton'] mb-3">
                            Detalles en interior
                        </h5>
                        <p class="text-[#2e4a52] tracking-wider mb-4">
                            Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspendisse varius enim in eros elementum 
                            tristique. Duis cursus, mi quis viverra ornare consec tetur adipiscing elit.
                        </p>
                    </div>
                    <div class="pt-9 pb-5 px-9 border-t border-b border-[#d9e6eb]">
                        <div class="relative z-0 w-32 h-32 float-left mr-6 mb-4">
                            <div class="relative z-10 flex h-32 w-32 rounded-full content-center items-center bg-image-radial justify-center">
                                <img src="./../img/svg/icon-service-03.svg" alt="Servicio 01" class="object-contain h-16 w-16">
                            </div>
                        </div>
                        <div class="relative z-20 text-[#1386eb] font-bold uppercase mb-2">Servicio - 03</div>
                        <h5 class="text-[#102429] text-2xl font-bold uppercase font-['Anton'] mb-3">
                            Detalles en interior
                        </h5>
                        <p class="text-[#2e4a52] tracking-wider mb-4">
                            Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspendisse varius enim in eros elementum 
                            tristique. Duis cursus, mi quis viverra ornare consec tetur adipiscing elit.
                        </p>
                    </div>
                    <div class="pt-9 pb-5 px-9 border-t border-b border-[#d9e6eb]">
                        <div class="relative z-0 w-32 h-32 float-left mr-6 mb-4">
                            <div class="relative z-10 flex h-32 w-32 rounded-full content-center items-center bg-image-radial justify-center">
                                <img src="./../img/svg/icon-service-04.svg" alt="Servicio 01" class="object-contain h-16 w-16">
                            </div>
                        </div>
                        <div class="relative z-20 text-[#1386eb] font-bold uppercase mb-2">Servicio - 04</div>
                        <h5 class="text-[#102429] text-2xl font-bold uppercase font-['Anton'] mb-3">
                            Detalles en interior
                        </h5>
                        <p class="text-[#2e4a52] tracking-wider mb-4">
                            Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspendisse varius enim in eros elementum 
                            tristique. Duis cursus, mi quis viverra ornare consec tetur adipiscing elit.
                        </p>
                    </div>
                    <div class="pt-9 pb-5 px-9 border-t border-b border-r border-l border-[#d9e6eb]">
                        <div class="relative z-0 w-32 h-32 float-left mr-6 mb-4">
                            <div class="relative z-10 flex h-32 w-32 rounded-full content-center items-center bg-image-radial justify-center">
                                <img src="./../img/svg/icon-service-05.svg" alt="Servicio 01" class="object-contain h-16 w-16">
                            </div>
                        </div>
                        <div class="relative z-20 text-[#1386eb] font-bold uppercase mb-2">Servicio - 05</div>
                        <h5 class="text-[#102429] text-2xl font-bold uppercase font-['Anton'] mb-3">
                            Detalles en interior
                        </h5>
                        <p class="text-[#2e4a52] tracking-wider mb-4">
                            Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspendisse varius enim in eros elementum 
                            tristique. Duis cursus, mi quis viverra ornare consec tetur adipiscing elit.
                        </p>
                    </div>
                    <div class="pt-9 pb-5 px-9 border-t border-b border-[#d9e6eb]">
                        <div class="relative z-0 w-32 h-32 float-left mr-6 mb-4">
                            <div class="relative z-10 flex h-32 w-32 rounded-full content-center items-center bg-image-radial justify-center">
                                <img src="./../img/svg/icon-service-06.svg" alt="Servicio 01" class="object-contain h-16 w-16">
                            </div>
                        </div>
                        <div class="relative z-20 text-[#1386eb] font-bold uppercase mb-2">Servicio - 06</div>
                        <h5 class="text-[#102429] text-2xl font-bold uppercase font-['Anton'] mb-3">
                            Detalles en interior
                        </h5>
                        <p class="text-[#2e4a52] tracking-wider mb-4">
                            Lorem ipsum dolor sit amet, consec tetur adipiscing elit. Suspendisse varius enim in eros elementum 
                            tristique. Duis cursus, mi quis viverra ornare consec tetur adipiscing elit.
                        </p>
                    </div>
                </div>
            </div>
            <div class="relative px-8 min-h-4em flex w-2/3 max-w-4xl justify-between items-end flex-col border-l border-r border-[#d9e6eb] pt-8">
                <a href="" class="w-full bg-[#1386eb] h-16 items-center font-bold flex z-50 flex-nowrap justify-center content-center px-4 uppercase">Contactanos</a>
            </div>
            <div class="relative z-20 w-16 h-px my-16 bg-[#1386eb]"></div>
        </section>
    </section>
        `;
    }
}