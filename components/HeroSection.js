"use client"
import { useState, useEffect, useRef } from "react"
import { Pause, Play } from "lucide-react"
import { useMediaQuery } from "@/hooks/use-media-query"

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const [videoLoadErrors, setVideoLoadErrors] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Optimized Cloudinary URLs with transformations
  const videos = [
    // Format: auto, quality: 70%, width: responsive, codec: vp9 for better compression
    "https://res.cloudinary.com/dhgjuexer/video/upload/q_70,f_auto,w_1280,c_fill/v1743067036/video1_debxth.mp4",
    "https://res.cloudinary.com/dhgjuexer/video/upload/q_70,f_auto,w_1280,c_fill/v1742981388/uhul1rkevhwxcl4vrltq.mp4",
    "https://res.cloudinary.com/dhgjuexer/video/upload/q_70,f_auto,w_1280,c_fill/v1742981441/thkhilf34gmup5muzkcm.mp4",
  ]

  // Mobile-optimized versions (smaller, lower quality)
  const mobileVideos = [
    "https://res.cloudinary.com/dhgjuexer/video/upload/q_60,f_auto,w_640,c_fill/v1743067036/video1_debxth.mp4",
    "https://res.cloudinary.com/dhgjuexer/video/upload/q_60,f_auto,w_640,c_fill/v1742981388/uhul1rkevhwxcl4vrltq.mp4",
    "https://res.cloudinary.com/dhgjuexer/video/upload/q_60,f_auto,w_640,c_fill/v1742981441/thkhilf34gmup5muzkcm.mp4",
  ]

  // Use appropriate videos based on device
  const videoSources = isMobile ? mobileVideos : videos

  const videoRefs = useRef([])

  useEffect(() => {
    // Initialize video refs
    videoRefs.current = videoRefs.current.slice(0, videoSources.length)

    // Set up loading state
    setIsLoading(true)

    // Preload first video
    if (videoRefs.current[0]) {
      const firstVideo = videoRefs.current[0]

      // Listen for loadeddata event to know when video is ready to play
      const handleLoaded = () => {
        setIsLoading(false)
        if (!isPaused) {
          firstVideo.play().catch((err) => {
            console.log("Playback error:", err)
            setVideoLoadErrors((prev) => [...prev, 0])
          })
        }
      }

      firstVideo.addEventListener("loadeddata", handleLoaded)

      // Clean up
      return () => {
        firstVideo.removeEventListener("loadeddata", handleLoaded)
      }
    }
  }, [isPaused, videoSources])

  useEffect(() => {
    // Set up event listeners for video ending and errors
    videoRefs.current.forEach((video, index) => {
      if (video) {
        video.addEventListener("ended", () => handleVideoEnd(index))

        // Add error handling for each video
        video.addEventListener("error", () => {
          console.log(`Error loading video ${index}`)
          setVideoLoadErrors((prev) => [...prev, index])
          setIsLoading(false)
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
  }, [videoSources])

  const handleVideoEnd = (index) => {
    if (isPaused) return

    // Hide current video and reset
    if (videoRefs.current[index]) {
      videoRefs.current[index].pause()
      videoRefs.current[index].currentTime = 0
    }

    // Find next available video (skip ones with errors)
    let nextIndex = (index + 1) % videoSources.length
    while (videoLoadErrors.includes(nextIndex) && nextIndex !== index) {
      nextIndex = (nextIndex + 1) % videoSources.length
    }

    setCurrentVideo(nextIndex)
    setIsLoading(true)

    // Play next video
    if (videoRefs.current[nextIndex] && !videoLoadErrors.includes(nextIndex)) {
      const nextVideo = videoRefs.current[nextIndex]

      // Check if video is loaded enough to play
      if (nextVideo.readyState >= 3) {
        setIsLoading(false)
        nextVideo.play().catch((err) => {
          console.log("Playback error:", err)
          setVideoLoadErrors((prev) => [...prev, nextIndex])
        })
      } else {
        // Wait for video to load enough data
        const handleCanPlay = () => {
          setIsLoading(false)
          nextVideo.play().catch((err) => {
            console.log("Playback error:", err)
            setVideoLoadErrors((prev) => [...prev, nextIndex])
          })
          nextVideo.removeEventListener("canplay", handleCanPlay)
        }
        nextVideo.addEventListener("canplay", handleCanPlay)
      }
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
  const workingVideos = videoSources.filter((_, index) => !videoLoadErrors.includes(index))

  return (
    <section className="relative w-full">
      {/* Responsive height - taller on desktop, shorter on mobile like Blakes.com */}
      <div className={`${isMobile ? "h-[70vh]" : "h-screen"} relative`}>
        <div className="absolute inset-0 z-0 overflow-hidden bg-[#012b51]">
          {videoSources.map((src, index) => (
            <video
              key={index}
              ref={(el) => (videoRefs.current[index] = el)}
              muted
              playsInline
              preload="metadata"
              poster="/video-poster.jpg" // Add a poster image for better initial load
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${index === currentVideo ? "opacity-100" : "opacity-0"} ${isMobile ? "object-[center_top]" : "object-center"}`}
            >
              <source src={src} type="video/mp4" />
            </video>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 z-10">
              <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
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
                const originalIndex = videoSources.findIndex((v) => v === workingVideos[index])
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
                      setIsLoading(true)
                      if (videoRefs.current[originalIndex]) {
                        if (videoRefs.current[originalIndex].readyState >= 3) {
                          setIsLoading(false)
                          videoRefs.current[originalIndex].play().catch((err) => console.log("Playback error:", err))
                        } else {
                          const handleCanPlay = () => {
                            setIsLoading(false)
                            if (!isPaused) {
                              videoRefs.current[originalIndex]
                                .play()
                                .catch((err) => console.log("Playback error:", err))
                            }
                            videoRefs.current[originalIndex].removeEventListener("canplay", handleCanPlay)
                          }
                          videoRefs.current[originalIndex].addEventListener("canplay", handleCanPlay)
                        }
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

