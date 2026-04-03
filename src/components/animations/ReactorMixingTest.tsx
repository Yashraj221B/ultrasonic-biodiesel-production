import { motion } from "framer-motion";

export default function ReactorMixingTest() {
          return (
                    <div className="flex justify-center items-center h-[350px]">

                              {/* Beaker */}
                              <div className="relative w-40 h-60 border-2 border-cyan-400 rounded-b-3xl overflow-hidden shadow-lg">

                                        {/* Oil Layer */}
                                        <motion.div
                                                  className="absolute bottom-0 w-full bg-yellow-400"
                                                  animate={{
                                                            height: ["40%", "55%", "45%", "50%"],
                                                  }}
                                                  transition={{
                                                            duration: 3,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                  }}
                                        />

                                        {/* Mixing Layer */}
                                        <motion.div
                                                  className="absolute bottom-0 w-full bg-blue-300 opacity-40"
                                                  animate={{
                                                            y: [0, -20, 0],
                                                  }}
                                                  transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            ease: "easeInOut",
                                                  }}
                                        />

                                        {/* Bubbles */}
                                        {[...Array(6)].map((_, i) => (
                                                  <motion.div
                                                            key={i}
                                                            className="absolute w-2 h-2 bg-white rounded-full"
                                                            style={{
                                                                      left: `${20 + i * 10}%`,
                                                                      bottom: "10%",
                                                            }}
                                                            animate={{
                                                                      y: [-10, -120],
                                                                      opacity: [1, 0],
                                                            }}
                                                            transition={{
                                                                      duration: 2 + i * 0.3,
                                                                      repeat: Infinity,
                                                                      delay: i * 0.3,
                                                            }}
                                                  />
                                        ))}

                              </div>
                    </div>
          );
}