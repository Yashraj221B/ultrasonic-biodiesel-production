import { useEffect, useState } from "react";

const GravitySettling1 = () => {
          const [separation, setSeparation] = useState(0);

          useEffect(() => {
                    let value = 0;
                    const interval = setInterval(() => {
                              value += 0.01;
                              if (value >= 1) {
                                        value = 1;
                                        clearInterval(interval);
                              }
                              setSeparation(value);
                    }, 40);

                    return () => clearInterval(interval);
          }, []);

          return (
                    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

                              <h2 className="text-cyan-400 text-lg mb-4">
                                        Gravity Settling (1)
                              </h2>

                              {/* Beaker */}
                              <div className="relative w-48 h-64 border-2 border-cyan-400 rounded-b-3xl overflow-hidden shadow-[0_0_25px_cyan]">

                                        {/* TOP LAYER - BIODIESEL */}
                                        <div
                                                  className="absolute w-full bg-yellow-400"
                                                  style={{
                                                            height: `${50 + separation * 10}%`,
                                                            bottom: `${50 - separation * 10}%`,
                                                            transition: "all 0.3s ease",
                                                  }}
                                        >
                                                  {/* Surface wave */}
                                                  <div className="absolute top-0 w-full h-2 bg-white/20 animate-pulse" />
                                        </div>

                                        {/* BOTTOM LAYER - GLYCEROL */}
                                        <div
                                                  className="absolute w-full bg-amber-900"
                                                  style={{
                                                            height: `${50 + separation * 10}%`,
                                                            bottom: 0,
                                                            transition: "all 0.3s ease",
                                                  }}
                                        >
                                                  {/* subtle movement */}
                                                  <div className="absolute w-full h-full opacity-20 animate-pulse bg-white blur-sm" />
                                        </div>

                                        {/* INTERFACE (MOVING LINE) */}
                                        <div
                                                  className="absolute w-full h-2 bg-white/30 blur-sm"
                                                  style={{
                                                            bottom: `${50 - separation * 10}%`,
                                                            animation: "pulse 2s infinite",
                                                  }}
                                        />

                                        {/* FLOATING PARTICLES */}
                                        {[...Array(10)].map((_, i) => {
                                                  const isLight = i % 2 === 0; // alternate particles

                                                  return (
                                                            <div
                                                                      key={i}
                                                                      className="absolute w-2 h-2 bg-white/70 rounded-full"
                                                                      style={{
                                                                                left: `${10 + i * 8}%`,
                                                                                bottom: isLight
                                                                                          ? `${40 + separation * 20 + Math.sin(i + separation * 3) * 5}%` // upward
                                                                                          : `${20 - separation * 15 + Math.sin(i + separation * 3) * 5}%`, // downward
                                                                                opacity: 1 - separation * 0.7,
                                                                                transition: "all 0.3s linear",
                                                                      }}
                                                            />
                                                  );
                                        })}
                                        {/* LABELS */}
                                        {separation > 0.5 && (
                                                  <>
                                                            <div className="absolute top-6 w-full text-center text-sm">
                                                                      Biodiesel (Top Layer)
                                                            </div>
                                                            <div className="absolute bottom-6 w-full text-center text-sm">
                                                                      Glycerol (Bottom Layer)
                                                            </div>
                                                  </>
                                        )}
                              </div>

                              {/* OUTPUT TEXT */}
                              <div className="mt-6 text-cyan-300 text-sm text-center">
                                        Phase Separation → Two Outputs Formed
                              </div>

                              <div className="flex gap-16 mt-3 text-xs text-gray-300">
                                        <div>↑ Raw Biodiesel</div>
                                        <div>↓ Glycerol</div>
                              </div>
                    </div>
          );
};

export default GravitySettling1;