import { useContext } from "react";
import SearchBar from "../components/SearchBar";
import { AuthContext } from "../context/AuthContext";

function HomePage() {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="flex h-full">
      {/* TEXT CONTAINER */}
      <div className="flex-[3] h-full">
        <div className="h-full flex flex-col justify-center gap-12 pr-0 md:pr-12 lg:pr-24 sm:justify-start md:justify-center">
          <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
            Find Real Estate & Get Your Dream Place
          </h1>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos
            explicabo suscipit cum eius, iure est nulla animi consequatur
            facilis id pariatur fugit quos laudantium temporibus dolor ea
            repellat provident impedit!
          </p>
          
          <SearchBar />

          {/* BOXES */}
          <div className="hidden sm:flex justify-between gap-4">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">16+</h1>
              <h2 className="text-xl font-light text-gray-700">Years of Experience</h2>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">200</h1>
              <h2 className="text-xl font-light text-gray-700">Award Gained</h2>
            </div>
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold">2000+</h1>
              <h2 className="text-xl font-light text-gray-700">Property Ready</h2>
            </div>
          </div>
        </div>
      </div>

      {/* IMAGE CONTAINER */}
      <div className="hidden md:flex flex-[2] bg-[#fcf5f3] relative items-center">
  <img 
    src="/bg.png" 
    alt="Background" 
    // Adding z-[-1] or ensuring it stays within bounds
    className="absolute right-0 w-[105%] lg:w-[115%] max-w-none"
  />
</div>
    </div>
  );
}

export default HomePage;