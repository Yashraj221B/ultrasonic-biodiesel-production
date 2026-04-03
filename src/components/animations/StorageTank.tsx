import { useEffect, useState } from "react";

const StorageTank = () => {
          const [level, setLevel] = useState(0);

          useEffect(() => {
                    const interval = setInterval(() => {
                              setLevel((prev) => (prev < 100 ? prev + 0.5 : prev));
                    }, 50);

                    return () => clearInterval(interval);
          }, []);

          return (
                    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

                              <h2 className="text-green-400 text-lg mb-6">
                                        Storage Tank
                              </h2>

                              {/* PIPE */}
                              <div className="w-2 h-20 bg-gray-400 mb-1 rounded" />

                              {/* FLOWING LIQUID */}
                              <div
                                        className="w-2 bg-yellow-400 mb-2 rounded transition-all"
                                        style={{ height: `${level * 0.8}px` }}
                              />

                              {/* TANK */}
                              <div className="relative w-56 h-64 border-2 border-green-400 rounded-lg overflow-hidden shadow-[0_0_40px_green]">

                                        {/* LIQUID LEVEL */}
                                        <div
                                                  className="absolute bottom-0 w-full bg-gradient-to-t from-yellow-500 via-yellow-300 to-yellow-200 transition-all duration-500"
                                                  style={{ height: `${level}%` }}
                                        />

                                        {/* SHINE EFFECT */}
                                        <div
                                                  className="absolute w-12 h-full bg-white/20 blur-md"
                                                  style={{
                                                            left: `${(level % 100)}%`,
                                                  }}
                                        />

                                        {/* TANK LABEL */}
                                        <div className="absolute top-3 w-full text-center text-sm text-white">
                                                  Biodiesel Storage
                                        </div>

                                        {/* LEVEL TEXT */}
                                        <div className="absolute bottom-3 w-full text-center text-xs text-white">
                                                  {Math.round(level)}% Filled
                                        </div>
                              </div>

                              {/* TEXT */}
                              <div className="mt-6 text-green-300 text-sm text-center">
                                        Final Fuel Stored Safely
                              </div>

                              <div className="text-xs text-gray-300 mt-2">
                                        Ready for Use / Distribution
                              </div>
                    </div>
          );
};

export default StorageTank;