import React from "react";

function HeroSecNavbar() {
  return (
    <section className="container mx-auto">
      <div className="flex items-center gap-4">
        <div className="text-center">
          <i class="fa-solid fa-water-ladder"></i>
          <p>Amazing pools</p>
        </div>
        <div className="text-center">
          <i class="fa-solid fa-ticket"></i>
          <p>Icons</p>
        </div>
        <div className="text-center">
        <i class="fa-solid fa-house-chimney-window"></i>
          <p>Farms</p>
        </div>
        <div className="text-center">
          <i class="fa-solid fa-ticket"></i>
          <p>Icons</p>
        </div>
      </div>
    </section>
  );
}

export default HeroSecNavbar;
