import { Link } from "react-router-dom";

function Card({ item }) {
  return (
    <div className="flex gap-5">
      
      <Link
        to={`/${item.id}`}
        className="hidden md:block flex-[2] h-[200px]"
      >
        <img
          src={item.images[0]}
          alt=""
          className="
            w-full
            h-full
            object-cover
            rounded-xl
          "
        />
      </Link>

      <div
        className="
          flex-[3]
          flex
          flex-col
          justify-between
          gap-3
        "
      >
        
        <h2
          className="
            text-[20px]
            font-semibold
            text-[#444]
            hover:text-black
            transition-all
            duration-300
            hover:scale-[1.01]
          "
        >
          <Link to={`/${item.id}`}>
            {item.title}
          </Link>
        </h2>

        <p
          className="
            flex
            items-center
            gap-1
            text-sm
            text-gray-500
          "
        >
          <img
            src="/pin.png"
            alt=""
            className="w-4 h-4"
          />

          <span>{item.address}</span>
        </p>

        <p
          className="
            text-[20px]
            font-light
            bg-[rgba(254,205,81,0.438)]
            px-2
            py-1
            rounded-md
            w-max
          "
        >
          $ {item.price}
        </p>

        <div
          className="
            flex
            items-center
            justify-between
            gap-3
          "
        >
          
          <div
            className="
              flex
              gap-5
              text-sm
              flex-wrap
            "
          >
            
            <div
              className="
                flex
                items-center
                gap-1
                bg-gray-100
                px-2
                py-1
                rounded-md
              "
            >
              <img
                src="/bed.png"
                alt=""
                className="w-4 h-4"
              />

              <span>{item.bedroom} bedroom</span>
            </div>

            <div
              className="
                flex
                items-center
                gap-1
                bg-gray-100
                px-2
                py-1
                rounded-md
              "
            >
              <img
                src="/bath.png"
                alt=""
                className="w-4 h-4"
              />

              <span>{item.bathroom} bathroom</span>
            </div>
          </div>

          <div className="flex gap-5">
            
            <div
              className="
                border
                border-gray-400
                px-2
                py-1
                rounded-md
                cursor-pointer
                flex
                items-center
                justify-center
                hover:bg-gray-200
                transition
              "
            >
              <img
                src="/save.png"
                alt=""
                className="w-4 h-4"
              />
            </div>

            <div
              className="
                border
                border-gray-400
                px-2
                py-1
                rounded-md
                cursor-pointer
                flex
                items-center
                justify-center
                hover:bg-gray-200
                transition
              "
            >
              <img
                src="/chat.png"
                alt=""
                className="w-4 h-4"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;