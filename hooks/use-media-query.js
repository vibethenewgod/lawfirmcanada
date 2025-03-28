"use client"
import { useState, useEffect } from "react"

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false)

  useEffect(() => {
    // Default to true on server to avoid layout shift
    if (typeof window === "undefined") {
      return setMatches(false)
    }

    const media = window.matchMedia(query)
    if (media.matches !== matches) {
      setMatches(media.matches)
    }

    const listener = () => {
      setMatches(media.matches)
    }

    media.addEventListener("change", listener)
    return () => media.removeEventListener("change", listener)
  }, [matches, query])

  return matches
}

