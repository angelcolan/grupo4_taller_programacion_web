// Marcado HTML del componente
const template = document.createElement("template");
template.innerHTML = /* html */`
<section class="relative z-10 flex w-full bg-[#102429] flex-col items-center content-center">
        <div class="bg-img-video relative z-10 flex container items-center justify-center py-32">
            <a href="#" class="relative z-30 w-32 h-32 flex items-center justify-center bg-[#1386eb]">
                <img src="./../img/svg/icon-play-light.svg" alt="Play video" class="h-8 w-8">
            </a>
            <div class="absolute top-2/4 bottom-2/4 z-10 w-full h-px bg-white opacity-20"></div>
            <div class="absolute left-2/4 top-0 right-2/4 bottom-0 z-10 w-px h-full bg-white opacity-20"></div>
        </div>
        <div class="absolute z-0 left-0 right-0 top-0 bottom-auto bg-[#d8e7eb] h-32"></div>
    </section>`;

class VideoServices extends HTMLElement {

  connectedCallback() {
    const html = template.content.cloneNode((true));
    this.appendChild(html);
  }
}

customElements.define("app-video-services", VideoServices);

export default VideoServices;
