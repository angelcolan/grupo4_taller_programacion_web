// Marcado HTML del componente
const template = document.createElement("template");
template.innerHTML = /* html */`
<section class="wrapper-main relative mx-16 flex justify-center">
            <div class="flex justify-between absolute inset-x-0 top-0">
                <div class="flex justify-center flex-wrap items-center border-b border-[#b4cfd6]">
                    <img src="./../img/svg/icon-phone-dark.svg" alt="Telefono" class="border-r border-[#b4cfd6] p-7">
                    <img src="./../img/svg/icon-mail-dark.svg" alt="Email" class="border-r border-[#b4cfd6] p-7">
                    <img src="./../img/svg/icon-pin-dark.svg" alt="Ubicación" class="border-r border-[#b4cfd6] p-7">
                    <img src="./../img/svg/icon-clock-dark.svg" alt="Horarios" class="p-7">
                </div>
            </div>
            <div class="absolute flex w-2/6 bg-[#1486eb] h-full justify-between items-center space-x-16 z-10">
                <div class="w-60 bg-[#0f2429] h-4/5 -ml-center-wrapper"></div>
                <div class="w-60 bg-[#0f2429] h-4/5 -mr-center-wrapper"></div>
            </div>
            <div
                class="relative z-50 text-[#b4cfd6] font-['Anton'] overflow-hidden w-full text-center flex-row justify-center items-center bg-[#d8e7eb] mt-36 mb-36">
                <div class="flex absolute z-0 justify-center top-0 bottom-0 w-full">
                    <div class="flex font-size-40dvw items-center">M</div>
                    <div class="flex font-size-40dvw items-center">A</div>
                    <div class="flex font-size-40dvw items-center">P</div>
                    <div class="flex font-size-40dvw items-center">I</div>
                    <div class="flex font-size-40dvw items-center">S</div>
                    <div class="flex font-size-40dvw items-center">A</div>
                </div>
                <h1 class="z-10 relative text-[#102429] text-[270px]">MAPISA</h1>
            </div>
            <img src="./../img/car-image-hero.webp" alt="Car"
                class="absolute z-50 top-auto bottom-0 left-auto right-0 w-2/3">
            <div class="flex justify-between absolute inset-x-0 bottom-0">
                <div class="flex justify-center flex-wrap items-center border-t border-[#b4cfd6] py-6">
                    <span class="font-bold mr-1">Lun - Dom:</span>08:00 am - 09:00 pm
                </div>
                <div class="flex border-t border-[#b4cfd6] py-6 px-6">
                    <img src="./../img/svg/icon-arrow-down-dark.svg" alt="Telefono" class="h-5">
                </div>
            </div>
        </section>`;

class InfoTop extends HTMLElement {

  connectedCallback() {
    const html = template.content.cloneNode((true));
    this.appendChild(html);
  }
}

customElements.define("app-info-top", InfoTop);

export default InfoTop;
