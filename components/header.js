class DuckHeader extends HTMLElement {
  connectedCallback() {
    const currentPage = document.body.dataset.page || "";

    const navLinkClass = (page) => {
      const isActive = currentPage === page;

      return isActive
        ? "block text-sm font-semibold px-4 py-3 rounded-full bg-[#2f2f2f] text-white"
        : "block text-sm font-semibold px-4 py-3 rounded-full hover:bg-black/5 transition";
    };

    this.innerHTML = `
      <header class="sticky top-0 z-50 bg-[#f4efe8]/90 backdrop-blur border-b border-black/5">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-4">
          <a href="/index.html" class="flex items-center gap-3 min-w-0">
            <div class="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-black/10 bg-pink-200 shrink-0">
              <img src="/images/DDA-logo.jpg" alt="Blind Duck Dating logo" class="w-full h-full object-cover">
            </div>
            <div class="min-w-0">
              <div class="text-lg sm:text-xl md:text-3xl font-black tracking-tight leading-none truncate">DUCK DATING</div>
              <div class="text-lg sm:text-xl md:text-3xl font-black tracking-tight leading-none truncate">APPS</div>
            </div>
          </a>

          <!-- Desktop nav -->
          <nav class="hidden md:flex items-center gap-2">
            <a href="/index.html" class="${navLinkClass("home")}">WTF is this?</a>
            <a href="/events.html" class="${navLinkClass("events")}">Events Calendar</a>
            <a href="/jewel.html" class="${navLinkClass("jewel")}">Our Jewel</a>
            <a href="/faq.html" class="${navLinkClass("faq")}">DAQ's</a>
            <a href="/contact.html" class="${navLinkClass("contact")}">Stay in the loop</a>
          </nav>

          <!-- Mobile menu button -->
          <button
            id="menu-btn"
            class="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-black/10 bg-white/70 hover:bg-white transition shrink-0"
            aria-label="Open menu"
            aria-expanded="false"
            aria-controls="mobile-menu"
            type="button"
          >
            <svg id="menu-open-icon" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg id="menu-close-icon" xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 hidden pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6l12 12M18 6l-12 12" />
            </svg>
          </button>
        </div>

        <!-- Mobile nav -->
        <div
          id="mobile-menu"
          class="md:hidden hidden border-t border-black/5 px-4 sm:px-6 pb-4 pt-3"
        >
          <nav class="flex flex-col gap-2">
            <a href="/index.html" class="${navLinkClass("home")}">WTF is this?</a>
            <a href="/events.html" class="${navLinkClass("events")}">Events Calendar</a>
            <a href="/jewel.html" class="${navLinkClass("jewel")}">Our Jewel</a>
            <a href="/faq.html" class="${navLinkClass("faq")}">DAQ's</a>
            <a href="/contact.html" class="${navLinkClass("contact")}">Stay in the loop</a>
          </nav>
        </div>
      </header>
    `;

    const menuBtn = this.querySelector("#menu-btn");
    const mobileMenu = this.querySelector("#mobile-menu");
    const openIcon = this.querySelector("#menu-open-icon");
    const closeIcon = this.querySelector("#menu-close-icon");

    if (menuBtn && mobileMenu) {
      menuBtn.addEventListener("click", () => {
        const isHidden = mobileMenu.classList.contains("hidden");

        mobileMenu.classList.toggle("hidden");
        openIcon.classList.toggle("hidden");
        closeIcon.classList.toggle("hidden");
        menuBtn.setAttribute("aria-expanded", String(isHidden));
      });

      const mobileLinks = mobileMenu.querySelectorAll("a");
      mobileLinks.forEach((link) => {
        link.addEventListener("click", () => {
          mobileMenu.classList.add("hidden");
          openIcon.classList.remove("hidden");
          closeIcon.classList.add("hidden");
          menuBtn.setAttribute("aria-expanded", "false");
        });
      });
    }
  }
}

customElements.define("duck-header", DuckHeader);