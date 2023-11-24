import { useEffect, useReducer, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:3001");

import { useForm, SubmitHandler } from "react-hook-form";
import { getAllEquiment } from "@/services/equipment";
import { useQuery } from "@tanstack/react-query";

type Reservation = {
  userId: string;
  equipmentName: string;
  date: Date | string;
  duration: number;
};

type Equipment = {
  _id: string;
  name: string;
  status: string;
  remainDuration: number;
  reservationStatus: string;
};

// Define reducer function to handle state transitions
const dataReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_RESERVATIONS":
      return { ...state, reservations: action.payload };
    case "UPDATE_EQUIPMENT":
      return { ...state, equipment: action.payload };
    default:
      return state;
  }
};

const ReservationForm = () => {
  const {
    // register,
    handleSubmit,
    // watch,
    reset,
    setValue,
    // formState: { errors },
  } = useForm<Reservation>({
    defaultValues: {
      userId: "user123",
      equipmentName: "",
      date: new Date(),
      duration: 0,
    },
  });

  const [useEquipment, setEquipment] = useState<Equipment[]>([]);
  const [booking, setBooking] = useState("");
  const [useHowlong, setHowlong] = useState(0);

  const [state, dispatch] = useReducer(dataReducer, {
    reservations: [],
    equipment: [],
  });

  useEffect(() => {
    socket.on("connect", () => {
      console.log("connect: " + socket.id);
    });

    getAllEquiment().then((equipment) =>
      dispatch({ type: "UPDATE_EQUIPMENT", payload: equipment })
    );

    // Listen for real-time updates on equipment status
    socket.on("equipment", (updatedEquipment) => {
      console.log(`have updated equipment`);
      dispatch({ type: "UPDATE_EQUIPMENT", payload: updatedEquipment });
      setEquipment(updatedEquipment);
    });

    socket.on("disconnect", () => {
      console.log("disconnect");
    });
    return () => {
      socket.off();
    };
  }, []);

  // const { isLoading, data } = useQuery<Equipment[]>({
  //   queryKey: ["equipment"],
  //   queryFn: async () => {
  //     const { data } = await getAllEquiment();
  //     setEquipment(data);
  //     return data;
  //   },
  //   refetchOnWindowFocus: false,
  // });

  const onSubmit: SubmitHandler<Reservation> = async (data) => {
    try {
      // Validate form data here

      // Send reservation request to the server
      const response = await fetch("http://localhost:3001/api/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const res = await response.json();

      // Reset form and emit socket event for real-time updates
      reset({
        userId: "user123",
        equipmentName: "",
        date: "",
        duration: 0,
      });
      socket.emit("reservation", res);
    } catch (error) {
      console.error(error);
    }
  };

  const equipments = [
    {
      name: "T1",
      status: "available",
      remainDuration: 20,
      reservationStatus: "not reserved",
    },
    {
      name: "T2",
      status: "available",
      remainDuration: 20,
      reservationStatus: "not reserved",
    },
    {
      name: "T3",
      status: "available",
      remainDuration: 20,
      reservationStatus: "not reserved",
    },
  ];

  const howlong = [
    {
      id: 1,
      name: "30 min",
      duration: 30,
    },
    {
      id: 2,
      name: "1 hour",
      duration: 60,
    },
    {
      id: 3,
      name: "1.5 hours",
      duration: 90,
    },
    {
      id: 4,
      name: "2 hours",
      duration: 120,
    },
  ];

  const handleBooking = (equipment: string) => {
    if (booking === equipment) {
      setBooking("");
      setValue("equipmentName", "");
    } else {
      setBooking(equipment);
      setValue("equipmentName", equipment);
    }
  };

  const handleSelectHowlong = (howlong: number) => {
    if (useHowlong === howlong) {
      setHowlong(0);
      setValue("duration", 0);
    } else {
      setHowlong(howlong);
      setValue("duration", howlong);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form fields */}

      <div className="min-h-screen min-w-full text-black flex flex-col gap-6">
        <div className="text-left text-4xl">
          <h2 className="font-light">Select</h2>
          <h2 className="font-semibold">Equipment</h2>
        </div>

        <div className="flex gap-4 overflow-scroll p-4">
          {state?.equipment?.map((eq, index) => {
            return (
              <button
                type="button"
                key={index}
                disabled={eq.status === "in use"}
                onClick={() => handleBooking(eq.name)}
                className={`${
                  eq.status === "in use" ? "opacity-30" : ""
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
                    {eq.status === "in use"
                      ? eq.remainDuration
                      : booking === eq.name
                        ? "Selected"
                        : eq.status}
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
                  type="button"
                  onClick={() => handleSelectHowlong(hl.duration)}
                  key={index}
                  className={`rounded-full border ${
                    useHowlong === hl.duration
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

      <button
        className="rounded-full border p-4 border-[#e7fe55] bg-[#e7fe55]/25 min-w-[120px] text-black backdrop-opacity-30"
        type="submit"
      >
        Submit Reservation
      </button>
    </form>
  );
};

export default ReservationForm;
