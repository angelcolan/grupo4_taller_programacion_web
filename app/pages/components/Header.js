// Marcado HTML del componente
const template = document.createElement("template");
template.innerHTML = /* html */`
<header class="flex justify-between py-8 items-center border-b border-[#b4d0d6]">
<div class="text-4xl text-center font-extrabold flex font-['Anton'] items-center">
    <div class="w-6 h-16 border-t border-l border-b border-[#102429]"></div>
    <div class="uppercase tracking-wides px-1 text-[#333333]">Mapisa</div>
    <div class="w-6 h-16 border-t border-r border-b border-[#102429]"></div>
</div>
<div class="flex justify-between space-x-8 font-extrabold uppercase items-center">
    <p class="cursor-pointer">Nosotros</p>
    <p class="cursor-pointer">Servicios</p>
    <p class="cursor-pointer">Galeria</p>
    <p class="cursor-pointer">Precios</p>
    <p class="cursor-pointer">Contacto</p>
    <div class="flex cursor-pointer">
        <div class="bg-[#1486eb] px-10 py-5 text-white">
            Reservar
        </div>
        <div class="bg-[#102429] px-6 py-5">
            <img src="./../img/svg/icon-bag-light.svg" alt="Carrito de compras" class="h-5">
        </div>
    </div>
</div>
</header>`;

class Header extends HTMLElement {

  connectedCallback() {
    const html = template.content.cloneNode((true));
    this.appendChild(html);
  }
}

customElements.define("app-header", Header);

export default Header;
