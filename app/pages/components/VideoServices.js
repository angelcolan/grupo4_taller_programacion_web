// Marcado HTML del componente
const template = document.createElement("template");
template.innerHTML = /* html */`
<section class="flex justify-between uppercase border-t border-[#b4cfd6]">
            <div class="flex items-center font-['Anton'] justify-center basis-1/4 gap-6 ">
                <div class="text-7xl">
                    01
                </div>
                <div class="text-center">
                    <div class="text-[#1486eb] tracking-widest">Calidad</div>
                    <div class="text-2xl tracking-wide">Garantizada</div>
                </div>
            </div>
            <div
                class="flex items-center font-['Anton'] justify-center basis-1/4 gap-6 border-r border-l border-[#b4cfd6] py-8">
                <div class="text-7xl">
                    02
                </div>
                <div class="text-center">
                    <div class="text-[#1486eb] tracking-widest">Ambiente</div>
                    <div class="text-2xl tracking-widel">Amigable</div>
                </div>
            </div>
            <div class="flex items-center font-['Anton'] justify-center basis-1/4 gap-6">
                <div class="text-7xl">
                    03
                </div>
                <div class="text-center">
                    <div class="text-[#1486eb] tracking-widest">Procesos</div>
                    <div class="text-2xl tracking-wide">Rapidos</div>
                </div>
            </div>
            <div class="flex items-center font-['Anton'] justify-center basis-1/4 gap-6 border-l border-[#b4cfd6] py-8">
                <div class="text-7xl">
                    04
                </div>
                <div class="text-center">
                    <div class="text-[#1486eb] tracking-widest">Alta</div>
                    <div class="text-2xl tracking-wide">Disponbilidad</div>
                </div>
            </div>
        </section>`;

class ServicesNumber extends HTMLElement {

  connectedCallback() {
    const html = template.content.cloneNode((true));
    this.appendChild(html);
  }
}

customElements.define("app-services-number", ServicesNumber);

export default ServicesNumber;
