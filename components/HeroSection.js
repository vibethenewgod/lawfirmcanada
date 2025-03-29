"use client"
import { useState, useEffect, useRef } from "react"
import { Pause, Play, ChevronDown } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [videoLoadErrors, setVideoLoadErrors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Back to three videos with direct paths to public folder
  const videos = ["/video1.mp4", "/video2.mp4", "/video3.mp4"]

  const videoRefs = useRef([])

  useEffect(() => {
    console.log("Initializing videos...")

    // Initialize video refs
    videoRefs.current = videoRefs.current.slice(0, videos.length)

    // Set up event listeners for video ending and errors
    videoRefs.current.forEach((video, index) => {
      if (video) {
        console.log(`Setting up listeners for video ${index}`)

        video.addEventListener("ended", () => {
          console.log(`Video ${index} ended`)
          handleVideoEnd(index)
        })

        // Add error handling for each video
        video.addEventListener("error", (e) => {
          console.error(`Error loading video ${index}:`, e)
          setVideoLoadErrors((prev) => [...prev, index])
        })

        // Add loaded data listener
        video.addEventListener("loadeddata", () => {
          console.log(`Video ${index} loaded data`)
          setIsLoading(false)
        })
      }
    })

    // Try to play the first video
    if (videoRefs.current[0]) {
      console.log("Attempting to play first video...")
      setIsLoading(true)

      // Use a timeout to ensure the video element is fully initialized
      setTimeout(() => {
        videoRefs.current[0]
          .play()
          .then(() => {
            console.log("First video playing successfully")
            setIsLoading(false)
          })
          .catch((err) => {
            console.error("Error playing first video:", err)
            setVideoLoadErrors((prev) => [...prev, 0])
            setIsLoading(false)
          })
      }, 100)
    }

    return () => {
      // Clean up event listeners
      videoRefs.current.forEach((video, index) => {
        if (video) {
          video.removeEventListener("ended", () => handleVideoEnd(index))
          video.removeEventListener("error", () => {})
          video.removeEventListener("loadeddata", () => {})
        }
      })
    }
  }, [])

  const handleVideoEnd = (index) => {
    if (isPaused) return

    console.log(`Handling end of video ${index}`)

    // Hide current video and reset
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause()
      videoRefs.current[index].currentTime = 0
    }

    // Find next available video (skip ones with errors)
    let nextIndex = (index + 1) % videos.length
    while (videoLoadErrors.includes(nextIndex) && nextIndex !== index) {
      nextIndex = (nextIndex + 1) % videos.length
    }

    console.log(`Switching to video ${nextIndex}`)
    setCurrentVideo(nextIndex)
    setIsLoading(true)

    // Play next video
    if (videoRefs.current[nextIndex] && !videoLoadErrors.includes(nextIndex)) {
      console.log(`Attempting to play video ${nextIndex}`)
      videoRefs.current[nextIndex]
        .play()
        .then(() => {
          console.log(`Video ${nextIndex} playing successfully`)
          setIsLoading(false)
        })
        .catch((err) => {
          console.error(`Error playing video ${nextIndex}:`, err)
          setVideoLoadErrors((prev) => [...prev, nextIndex])
          setIsLoading(false)
        })
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
    if (isPaused) {
      console.log(`Resuming video ${currentVideo}`)
      videoRefs.current[currentVideo]?.play().catch((err) => console.error("Error resuming video:", err))
    } else {
      console.log(`Pausing video ${currentVideo}`)
      videoRefs.current[currentVideo]?.pause()
    }
  }

  // Filter out videos with load errors
  const workingVideos = videos.filter((_, index) => !videoLoadErrors.includes(index))

  return (
    <section className="relative w-full">
      {/* Always full height on all devices */}
      <div className="h-screen relative">
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#012b51]">
          {videos.map((src, index) => (
            <video
              key={index}
              ref={(el) => (videoRefs.current[index] = el)}
              muted
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                index === currentVideo ? "opacity-100" : "opacity-0"
              }`}
            >
              <source src={src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}

          {/* Fallback background if all videos fail to load */}
          {videoLoadErrors.length === videos.length && (
            <div className="absolute inset-0 bg-[#012b51] flex items-center justify-center">
              <p className="text-white text-lg">Unable to load videos</p>
            </div>
          )}

          {/* Complex gradient overlay */}
          <div
            className="absolute inset-0 z-10"
            style={{
              background: `
                linear-gradient(to right, rgba(0, 0, 0, 0.6) 10%, rgba(0, 0, 0, 0) 50%), 
                linear-gradient(to bottom, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.4) 20%, rgba(0, 0, 0, 0.4) 80%, rgba(0, 0, 0, 0.6) 100%)`,
              pointerEvents: "none",
            }}
          ></div>
        </div>

        {/* Content positioned at bottom left on mobile/tablet, unchanged on desktop */}
        <div className="relative h-full z-20">
          {isMobile ? (
            // Mobile/tablet view - bottom left positioning
            <div className="absolute bottom-0 left-0 w-full pb-16 px-6">
              <div className="max-w-xl text-white space-y-4">
                <h1 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight">
                  Saskatchewan's Trusted Leader in <span className="font-medium">Legal Services</span>
                </h1>
                <div className="w-16 h-0.5 bg-white"></div>
                <p className="text-sm md:text-base lg:text-lg font-light max-w-lg">
                  Providing efficient and affordable legal services with a commitment to excellence since 2018.
                </p>
                <button className="mt-4 md:mt-6 px-5 py-2 border border-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white/20">
                  Learn more
                </button>
              </div>

              {/* Mobile/tablet only scroll down button */}
              <div className="absolute bottom-4 right-6">
                <button className="w-8 h-8 flex items-center justify-center text-white">
                  <ChevronDown size={20} />
                </button>
              </div>
            </div>
          ) : (
            // Desktop view - unchanged from original
            <div className="h-full flex items-end pb-16 md:pb-20 lg:pb-24">
              <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="max-w-xl text-white space-y-4 p-4 md:p-6">
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-light leading-tight">
                    Saskatchewan's Trusted Leader in <span className="font-medium">Legal Services</span>
                  </h1>
                  <div className="w-16 h-0.5 bg-white"></div>
                  <p className="text-sm md:text-base lg:text-lg font-light max-w-lg">
                    Providing efficient and affordable legal services with a commitment to excellence since 2018.
                  </p>
                  <button className="mt-4 md:mt-6 px-5 py-2 border border-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white/20">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Video controls - hidden on mobile or if no working videos */}
        {!isMobile && workingVideos.length > 0 && (
          <>
            <div className="absolute bottom-8 right-8 z-20">
              <button
                className="w-10 h-10 border border-white bg-black/30 text-white flex items-center justify-center transition-all duration-300 hover:bg-white/20 rounded-full"
                onClick={togglePause}
              >
                {isPaused ? <Play size={16} /> : <Pause size={16} />}
              </button>
            </div>

            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
              {workingVideos.map((_, index) => {
                const originalIndex = videos.findIndex((v) => v === workingVideos[index])
                return (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      originalIndex === currentVideo ? "bg-white w-6" : "bg-white/50"
                    }`}
                    onClick={() => {
                      if (videoRefs.current[currentVideo]) {
                        videoRefs.current[currentVideo].pause()
                        videoRefs.current[currentVideo].currentTime = 0
                      }
                      setCurrentVideo(originalIndex)
                      if (videoRefs.current[originalIndex] && !isPaused) {
                        videoRefs.current[originalIndex]
                          .play()
                          .catch((err) => console.error("Error playing video on click:", err))
                      }
                    }}
                  />
                )
              })}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

