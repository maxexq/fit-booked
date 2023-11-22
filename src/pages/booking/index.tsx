// * External components ------------------------------------------------

import { useState } from "react";

// * Components ---------------------------------------------------------

// type IBookingProps = {};

const Booking = () => {
  const [booking, setBooking] = useState("");
  const [useHowlong, setHowlong] = useState("");

  const equipments = [
    {
      id: 1,
      name: "T1",
      status: "available",
    },
    {
      id: 1,
      name: "B1",
      status: "available",
    },
    {
      id: 2,
      name: "B2",
      status: "available",
    },
    {
      id: 3,
      name: "T2",
      status: "unavaliable",
    },
    {
      id: 4,
      name: "B3",
      status: "available",
    },
    {
      id: 5,
      name: "T3",
      status: "reserved",
    },
  ];

  const howlong = [
    {
      id: 1,
      name: "30 min",
    },
    {
      id: 2,
      name: "1 hour",
    },
    {
      id: 3,
      name: "1.5 hours",
    },
    {
      id: 4,
      name: "2 hours",
    },
  ];

  const handleBooking = (equipment: string) => {
    if (booking === equipment) {
      setBooking("");
    } else setBooking(equipment);
  };

  const handleSelectHowlong = (howlong: string) => {
    if (useHowlong === howlong) {
      setHowlong("");
    } else setHowlong(howlong);
  };

  return (
    <div className="min-h-screen min-w-full text-black flex flex-col gap-6">
      <div className="text-left text-4xl">
        <h2 className="font-light">Select</h2>
        <h2 className="font-semibold">Equipment</h2>
      </div>

      <div className="flex gap-4 overflow-scroll p-4">
        {equipments.map((eq, index) => {
          return (
            <button
              key={index}
              disabled={eq.status === "reserved" || eq.status === "unavaliable"}
              onClick={() => handleBooking(eq.name)}
              className={`${
                eq.status === "unavaliable" ? "opacity-30" : ""
              } rounded-full w-16 bg-[#7f8283]/50 h-48 border backdrop-blur ${
                booking === eq.name ? "border-[#e7fe55] " : "border-white"
              }  p-2 flex flex-col justify-between items-center shadow-md`}
            >
              <div
                className={`rounded-full w-12 h-12 ${
                  booking === eq.name ? "bg-[#e7fe55] " : "bg-white"
                } font-medium flex justify-center items-center`}
              >
                <h2>{eq.name}</h2>
              </div>
              <div className="-rotate-90">
                <h2 className="text-white">
                  {eq.status === "unavaliable" ? "1.30 m left" : eq.status}
                </h2>
              </div>
              <div
                className={`rounded-full w-6 h-6 ${
                  booking === eq.name ? "bg-[#e7fe55]" : "bg-white"
                }  flex justify-center items-center`}
              >
                {booking === eq.name ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-4 h-4"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4.5 12.75l6 6 9-13.5"
                    />
                  </svg>
                ) : null}
              </div>
            </button>
          );
        })}
      </div>

      <div className="text-left text-lg flex flex-col gap-4">
        <h2>
          How <span className="font-semibold">long?</span>
        </h2>

        <div className="flex gap-4 overflow-scroll p-4">
          {howlong.map((hl, index) => {
            return (
              <button
                onClick={() => handleSelectHowlong(hl.name)}
                key={index}
                className={`rounded-full border ${
                  useHowlong === hl.name
                    ? "border-[#e7fe55] bg-[#e7fe55]/25 text-black backdrop-opacity-30"
                    : "border-white text-gray-400"
                }  min-w-[120px] p-4`}
              >
                {hl.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Booking;
