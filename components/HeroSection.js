"use client"
import { useState, useEffect, useRef } from "react"
import { Pause, Play } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [videoLoadErrors, setVideoLoadErrors] = useState([])
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Your Cloudinary video URLs
  const videos = [
    "https://res.cloudinary.com/dhgjuexer/video/upload/v1743067036/video1_debxth.mp4",
    "https://res.cloudinary.com/dhgjuexer/video/upload/v1742981388/uhul1rkevhwxcl4vrltq.mp4",
    "https://res.cloudinary.com/dhgjuexer/video/upload/v1742981441/thkhilf34gmup5muzkcm.mp4",
  ]

  const videoRefs = useRef([])

  useEffect(() => {
    // Initialize video refs
    videoRefs.current = videoRefs.current.slice(0, videos.length)

    // Play the first video
    if (videoRefs.current[0] && !isPaused) {
      videoRefs.current[0].play().catch((err) => {
        console.log("Playback error:", err)
        setVideoLoadErrors((prev) => [...prev, 0])
      })
    }

    // Set up event listeners for video ending
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.addEventListener("ended", () => handleVideoEnd(index))

        // Add error handling for each video
        video.addEventListener("error", () => {
          console.log(`Error loading video ${index}`)
          setVideoLoadErrors((prev) => [...prev, index])
        })
      }
    })

    return () => {
      // Clean up event listeners
      videoRefs.current.forEach((video, index) => {
        if (video) {
          video.removeEventListener("ended", () => handleVideoEnd(index))
          video.removeEventListener("error", () => {})
        }
      })
    }
  }, [isPaused])

  const handleVideoEnd = (index) => {
    if (isPaused) return

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

    setCurrentVideo(nextIndex)

    // Play next video
    if (videoRefs.current[nextIndex] && !videoLoadErrors.includes(nextIndex)) {
      videoRefs.current[nextIndex].play().catch((err) => {
        console.log("Playback error:", err)
        setVideoLoadErrors((prev) => [...prev, nextIndex])
      })
    }
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
    if (isPaused) {
      videoRefs.current[currentVideo]?.play().catch((err) => console.log("Playback error:", err))
    } else {
      videoRefs.current[currentVideo]?.pause()
    }
  }

  // Filter out videos with load errors
  const workingVideos = videos.filter((_, index) => !videoLoadErrors.includes(index))

  return (
    <section className="relative w-full">
      {/* Responsive height - taller on desktop, shorter on mobile like Blakes.com */}
      <div className={`${isMobile ? "h-[70vh]" : "h-screen"} relative`}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          {videos.map((src, index) => (
            <video
              key={index}
              ref={(el) => (videoRefs.current[index] = el)}
              muted
              playsInline
              preload="auto"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentVideo ? "opacity-100" : "opacity-0"} ${isMobile ? "object-[center_top]" : "object-center"}`}
            >
              <source src={src} type="video/mp4" />
            </video>
          ))}

          {/* Fallback background if all videos fail to load */}
          {videoLoadErrors.length === videos.length && <div className="absolute inset-0 bg-[#012b51]"></div>}

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

        <div className="relative h-full flex items-end pb-16 md:pb-20 lg:pb-24 z-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            <div className={`max-w-xl text-white space-y-4 p-4 md:p-6 ${isMobile ? "mx-auto text-center" : ""}`}>
              <h1 className={`text-2xl md:text-3xl lg:text-4xl font-light leading-tight ${isMobile ? "mx-auto" : ""}`}>
                Saskatchewan's Trusted Leader in <span className="font-medium">Legal Services</span>
              </h1>
              <div className={`w-16 h-0.5 bg-white ${isMobile ? "mx-auto" : ""}`}></div>
              <p className="text-sm md:text-base lg:text-lg font-light max-w-lg">
                Providing efficient and affordable legal services with a commitment to excellence since 2018.
              </p>
              <button className="mt-4 md:mt-6 px-5 py-2 border border-white text-sm font-medium tracking-wide transition-all duration-300 hover:bg-white/20">
                Learn more
              </button>
            </div>
          </div>
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
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${originalIndex === currentVideo ? "bg-white w-6" : "bg-white/50"}`}
                    onClick={() => {
                      if (videoRefs.current[currentVideo]) {
                        videoRefs.current[currentVideo].pause()
                        videoRefs.current[currentVideo].currentTime = 0
                      }
                      setCurrentVideo(originalIndex)
                      if (videoRefs.current[originalIndex] && !isPaused) {
                        videoRefs.current[originalIndex].play().catch((err) => console.log("Playback error:", err))
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

