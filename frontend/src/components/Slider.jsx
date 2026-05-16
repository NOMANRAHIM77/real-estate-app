import { useState } from "react";

function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  const changeSlide = (direction) => {
    if (direction === "left") {
      if (imageIndex === 0) {
        setImageIndex(images.length - 1);
      } else {
        setImageIndex(imageIndex - 1);
      }
    } else {
      if (imageIndex === images.length - 1) {
        setImageIndex(0);
      } else {
        setImageIndex(imageIndex + 1);
      }
    }
  };

  return (
    /* .slider */
    <div className="w-full h-[350px] sm:h-[280px] flex gap-5">
      
      {/* .fullSlider (Lightbox Modal Overlay) */}
      {imageIndex !== null && (
        <div className="fixed w-screen h-screen top-0 left-0 bg-black flex justify-between items-center z-[9999]">
          
          {/* Left Arrow Button */}
          <div className="flex-1 flex items-center justify-center cursor-pointer" onClick={() => changeSlide("left")}>
            <img 
              src="/arrow.png" 
              alt="Previous" 
              className="w-[50px] md:w-[30px] sm:w-5 object-contain" 
            />
          </div>
          
          {/* .imgContainer */}
          <div className="flex-[10] h-full max-h-screen flex items-center justify-center">
            <img 
              src={images[imageIndex]} 
              alt="Enlarged view" 
              className="w-full h-full object-cover" 
            />
          </div>
          
          {/* Right Arrow Button */}
          <div className="flex-1 flex items-center justify-center cursor-pointer" onClick={() => changeSlide("right")}>
            <img 
              src="/arrow.png" 
              alt="Next" 
              className="w-[50px] md:w-[30px] sm:w-5 object-contain rotate-180" 
            />
          </div>
          
          {/* .close */}
          <div 
            className="absolute top-0 right-0 color-white text-4xl font-bold p-[50px] cursor-pointer text-white select-none" 
            onClick={() => setImageIndex(null)}
          >
            X
          </div>
        </div>
      )}

      {/* .bigImage */}
      <div className="flex-[3] sm:flex-[2]">
        <img 
          src={images[0]} 
          alt="Main presentation" 
          className="w-full h-full object-cover rounded-xl cursor-pointer"
          onClick={() => setImageIndex(0)} 
        />
      </div>
      
      {/* .smallImages */}
      <div className="flex-1 flex flex-col justify-between gap-5 sm:gap-4">
        {images.slice(1).map((image, index) => (
          <img
            src={image}
            alt={`Thumbnail ${index + 1}`}
            key={index}
            className="w-full h-[100px] sm:h-20 object-cover rounded-xl cursor-pointer"
            onClick={() => setImageIndex(index + 1)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;