import { useEffect, useState } from "react";

const WashingPhase = () => {
          const [mix, setMix] = useState(0);
          const [impurities, setImpurities] = useState(
                    Array.from({ length: 10 }, () => ({
                              x: Math.random() * 80 + 10,
                              y: Math.random() * 40 + 10,
                    }))
          );

          useEffect(() => {
                    const interval = setInterval(() => {
                              setMix((prev) => prev + 0.05);

                              // Move impurities upward slowly (washing effect)
                              setImpurities((prev) =>
                                        prev.map((p) => ({
                                                  ...p,
                                                  y: p.y + Math.random() * 0.5, // move upward
                                        }))
                              );
                    }, 60);

                    return () => clearInterval(interval);
          }, []);

          return (
                    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">

                              <h2 className="text-cyan-400 text-lg mb-4">
                                        Washing Phase
                              </h2>

                              {/* BEAKER */}
                              <div className="relative w-48 h-64 border-2 border-cyan-400 rounded-b-3xl overflow-hidden shadow-[0_0_30px_cyan]">

                                        {/* BIODIESEL */}
                                        <div className="absolute bottom-0 w-full h-1/2 bg-yellow-400" />

                                        {/* WATER */}
                                        <div className="absolute top-0 w-full h-1/2 bg-blue-300/80" />

                                        {/* INTERFACE DISTURBANCE */}
                                        <div
                                                  className="absolute w-full h-2 bg-white/20"
                                                  style={{
                                                            top: "50%",
                                                            transform: `translateY(${Math.sin(mix * 2) * 3}px)`,
                                                  }}
                                        />

                                        {/* SWIRL FLOW PARTICLES */}
                                        {[...Array(12)].map((_, i) => (
                                                  <div
                                                            key={i}
                                                            className="absolute w-2 h-2 bg-white/80 rounded-full"
                                                            style={{
                                                                      left: `${50 + Math.sin(mix + i) * 30}%`,
                                                                      bottom: `${30 + Math.cos(mix + i) * 20}%`,
                                                                      transition: "all 0.1s linear",
                                                            }}
                                                  />
                                        ))}

                                        {/* IMPURITIES (MOVING UP) */}
                                        {impurities.map((p, i) => (
                                                  <div
                                                            key={i}
                                                            className="absolute w-2 h-2 bg-gray-400 rounded-full"
                                                            style={{
                                                                      left: `${p.x}%`,
                                                                      bottom: `${p.y}%`,
                                                                      opacity: 0.7,
                                                            }}
                                                  />
                                        ))}

                                        {/* WATER DROPLETS COMING FROM TOP */}
                                        {[...Array(5)].map((_, i) => (
                                                  <div
                                                            key={i}
                                                            className="absolute w-1 h-4 bg-blue-200 rounded-full"
                                                            style={{
                                                                      left: `${20 + i * 12}%`,
                                                                      top: `${(mix * 20 + i * 10) % 100}%`,
                                                                      opacity: 0.6,
                                                            }}
                                                  />
                                        ))}

                                        {/* LABELS */}
                                        <div className="absolute top-4 w-full text-center text-xs text-white">
                                                  Water
                                        </div>
                                        <div className="absolute bottom-4 w-full text-center text-xs text-white">
                                                  Biodiesel
                                        </div>
                              </div>

                              {/* TEXT */}
                              <div className="mt-6 text-cyan-300 text-sm text-center">
                                        Water Washing → Impurities Removed
                              </div>

                              <div className="text-xs text-gray-300 mt-2">
                                        Impurities migrate to water layer
                              </div>
                    </div>
          );
};

export default WashingPhase;