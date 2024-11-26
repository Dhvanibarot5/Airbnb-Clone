import React from "react";

function Header() {
  return (
    <section className="container mx-auto">
      <div className="flex justify-between items-center">
        <div>
          <img src="/logo.png" alt="logo" className="w-32" />
        </div>
        <div className="flex gap-4">
          <p className="text-lg font-semibold">Stays</p>
          <button className="text-lg ">Experiences</button>
        </div>
        <div className="relative">
          <div className="flex flex-row items-center gap-3">
            <div className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer">
              Airbnb Your Home
            </div>
            <i class="fa-solid fa-globe"></i>
            <div className="flex border rounded-3xl items-center gap-2 px-3 py-2">
              <i class="fa-solid fa-bars"></i>
              <img src="/placeholder.png" alt="" className="w-8 " />
            </div>
          </div>
        </div>
      </div>
      <div className="border-[1px] py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer flex justify-center items-center">
        <div className="flex items-center">
          <div className="text-sm font-semibold px-6 text-center">
            Where
            <p>Search destinations</p>
          </div>
          <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] text-center">
            Check in
            <p>Add dates</p>
          </div>
          <div className="text-sm font-semibold px-6 border-x-[1px] text-center">
            Check out
            <p>Add dates</p>
          </div>
          <div className="text-sm pl-6 flex flex-row items-center gap-3 pr-2 text-gray-600">
            <div className="hidden sm:block text-sm font-semibold px-6 text-center">
              Who
              <p>Add guests</p>
            </div>
            <button className="p-2 bg-rose-500 rounded-full text-white">Search</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Header;
