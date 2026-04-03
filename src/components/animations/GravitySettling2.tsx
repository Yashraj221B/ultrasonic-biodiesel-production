import { useEffect, useState } from "react";

const GravitySettling2 = () => {
          const [settle, setSettle] = useState(0);

          useEffect(() => {
                    const interval = setInterval(() => {
                              setSettle((prev) => (prev < 100 ? prev + 0.3 : prev));
                    }, 50);

                    return () => clearInterval(interval);
          }, []);

          return (
                    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

                              <h2 className="text-cyan-400 text-lg mb-4">
                                        Gravity Settling (2)
                              </h2>

                              {/* BEAKER */}
                              <div className="relative w-48 h-64 border-2 border-cyan-400 rounded-b-3xl overflow-hidden shadow-[0_0_30px_cyan]">

                                        {/* TOP LAYER - BIODIESEL */}
                                        <div
                                                  className="absolute top-0 w-full bg-yellow-400 transition-all duration-500"
                                                  style={{
                                                            height: `${50 + settle * 0.2}%`,
                                                  }}
                                        />

                                        {/* BOTTOM LAYER - WASTEWATER */}
                                        <div
                                                  className="absolute bottom-0 w-full bg-blue-500 transition-all duration-500"
                                                  style={{
                                                            height: `${50 - settle * 0.2}%`,
                                                  }}
                                        />

                                        {/* INTERFACE LINE */}
                                        <div
                                                  className="absolute w-full h-1 bg-white/30"
                                                  style={{
                                                            top: `${50 - settle * 0.2}%`,
                                                  }}
                                        />

                                        {/* PARTICLES SETTLING DOWN */}
                                        {[...Array(10)].map((_, i) => (
                                                  <div
                                                            key={i}
                                                            className="absolute w-2 h-2 bg-gray-300 rounded-full"
                                                            style={{
                                                                      left: `${10 + i * 8}%`,
                                                                      top: `${30 + (settle * 0.5 + i * 5) % 50}%`,
                                                                      opacity: 0.6,
                                                            }}
                                                  />
                                        ))}

                                        {/* LABELS */}
                                        <div className="absolute top-4 w-full text-center text-xs text-white">
                                                  Pure Biodiesel (Top Layer)
                                        </div>

                                        <div className="absolute bottom-4 w-full text-center text-xs text-white">
                                                  Wastewater (Bottom Layer)
                                        </div>
                              </div>

                              {/* TEXT */}
                              <div className="mt-6 text-cyan-300 text-sm text-center">
                                        Final Separation → Biodiesel Purified
                              </div>

                              <div className="text-xs text-gray-300 mt-2">
                                        Wastewater + Methanol removed
                              </div>
                    </div>
          );
};

export default GravitySettling2;