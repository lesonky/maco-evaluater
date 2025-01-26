"use client"

import React, { useCallback, useEffect, useRef } from "react"
import confetti from "canvas-confetti"

export function ConfettiEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const shootConfetti = useCallback(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const myConfetti = confetti.create(canvas, { resize: true })
      myConfetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.5 }, // Start from the middle of the screen
      })
    }
  }, [])

  useEffect(() => {
    shootConfetti()
  }, [shootConfetti])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ width: "100vw", height: "100vh" }}
    />
  )
}

