import { useEffect, useState } from "react";

const Separation = () => {
          const [drain, setDrain] = useState(0);
          const [valveOpen, setValveOpen] = useState(false);

          useEffect(() => {
                    setTimeout(() => setValveOpen(true), 1000);

                    let value = 0;
                    const interval = setInterval(() => {
                              value += 0.01;
                              if (value >= 1) {
                                        value = 1;
                                        clearInterval(interval);
                              }
                              setDrain(value);
                    }, 40);

                    return () => clearInterval(interval);
          }, []);

          return (
                    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

                              <h2 className="text-cyan-400 text-lg mb-4">
                                        Separation (Glycerol Removal)
                              </h2>

                              {/* MAIN BEAKER */}
                              <div className="relative w-48 h-64 border-2 border-cyan-400 rounded-b-3xl overflow-hidden shadow-[0_0_25px_cyan]">

                                        {/* BIODIESEL (MOVES DOWN) */}
                                        <div
                                                  className="absolute w-full bg-yellow-400"
                                                  style={{
                                                            height: "50%",
                                                            bottom: `${50 - drain * 50}%`,
                                                            transition: "all 0.2s linear",
                                                  }}
                                        >
                                                  {/* surface ripple */}
                                                  <div className="absolute top-0 w-full h-2 bg-white/20 animate-pulse" />
                                        </div>

                                        {/* GLYCEROL (DRAINING) */}
                                        <div
                                                  className="absolute w-full bg-amber-900"
                                                  style={{
                                                            height: `${50 - drain * 50}%`,
                                                            bottom: 0,
                                                            transition: "all 0.2s linear",
                                                  }}
                                        />

                                        {/* DYNAMIC LABEL */}
                                        <div
                                                  className="absolute w-full text-center text-sm"
                                                  style={{
                                                            bottom: `${50 - drain * 50 + 20}%`,
                                                            transition: "all 0.2s linear",
                                                  }}
                                        >
                                                  Biodiesel
                                        </div>
                              </div>

                              {/* VALVE */}
                              <div className="relative mt-2">
                                        <div
                                                  className={`w-10 h-4 rounded ${valveOpen ? "bg-red-500" : "bg-gray-500"
                                                            } transition-all`}
                                        />
                              </div>

                              {/* FLOW STREAM */}
                              {valveOpen && (
                                        <div
                                                  className="w-2 bg-amber-700 mt-1 rounded-full"
                                                  style={{
                                                            height: `${drain * 90}px`,
                                                            transition: "all 0.2s linear",
                                                  }}
                                        />
                              )}

                              {/* COLLECTION BEAKER */}
                              <div className="relative mt-4 w-32 h-32 border-2 border-cyan-400 rounded-b-2xl overflow-hidden shadow-[0_0_15px_cyan]">

                                        {/* FILLING GLYCEROL */}
                                        <div
                                                  className="absolute w-full bg-amber-900"
                                                  style={{
                                                            height: `${drain * 100}%`,
                                                            bottom: 0,
                                                            transition: "all 0.2s linear",
                                                  }}
                                        />

                                        {/* SURFACE EFFECT */}
                                        <div
                                                  className="absolute w-full h-2 bg-white/20 blur-sm"
                                                  style={{
                                                            bottom: `${drain * 100}%`,
                                                  }}
                                        />

                                        {/* LABEL */}
                                        {drain > 0.3 && (
                                                  <div className="absolute bottom-2 w-full text-center text-xs">
                                                            Glycerol Collected
                                                  </div>
                                        )}
                              </div>

                              {/* TEXT */}
                              <div className="mt-6 text-cyan-300 text-sm text-center">
                                        Glycerol Drained → Biodiesel Retained
                              </div>

                              <div className="text-xs text-gray-300 mt-2">
                                        ↓ Glycerol Collected in Beaker
                              </div>
                    </div>
          );
};

export default Separation;