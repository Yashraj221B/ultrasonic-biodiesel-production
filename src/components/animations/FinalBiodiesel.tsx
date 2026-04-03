import { useEffect, useState } from "react";

const FinalBiodiesel = () => {
          const [shine, setShine] = useState(0);

          useEffect(() => {
                    const interval = setInterval(() => {
                              setShine((prev) => prev + 1);
                    }, 50);

                    return () => clearInterval(interval);
          }, []);

          return (
                    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

                              <h2 className="text-green-400 text-lg mb-4">
                                        Final Biodiesel (FAME)
                              </h2>

                              {/* BEAKER */}
                              <div className="relative w-48 h-64 border-2 border-green-400 rounded-b-3xl overflow-hidden shadow-[0_0_35px_green]">

                                        {/* PURE BIODIESEL */}
                                        <div className="absolute bottom-0 w-full h-full bg-gradient-to-t from-yellow-500 via-yellow-300 to-yellow-200" />

                                        {/* SHINE EFFECT */}
                                        <div
                                                  className="absolute w-10 h-full bg-white/20 blur-md"
                                                  style={{
                                                            left: `${(shine % 100)}%`,
                                                            transition: "left 0.1s linear",
                                                  }}
                                        />

                                        {/* GLOW PARTICLES */}
                                        {[...Array(6)].map((_, i) => (
                                                  <div
                                                            key={i}
                                                            className="absolute w-2 h-2 bg-yellow-100 rounded-full animate-pulse"
                                                            style={{
                                                                      left: `${20 + i * 10}%`,
                                                                      bottom: `${20 + Math.sin(shine * 0.05 + i) * 10}%`,
                                                            }}
                                                  />
                                        ))}

                                        {/* LABEL */}
                                        <div className="absolute bottom-4 w-full text-center text-sm text-white">
                                                  Pure Biodiesel
                                        </div>
                              </div>

                              {/* TEXT */}
                              <div className="mt-6 text-green-300 text-sm text-center">
                                        High Purity Fuel (FAME)
                              </div>

                              <div className="text-xs text-gray-300 mt-2">
                                        Purity: 95–99%
                              </div>
                    </div>
          );
};

export default FinalBiodiesel;