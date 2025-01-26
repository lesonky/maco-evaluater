"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"
import { Message, useChat } from "ai/react"
import { ArrowUpIcon, CheckCircle, MapPin, Cloud, Briefcase, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { AutoResizeTextarea, AutoResizeTextareaRef } from "@/components/autoresize-textarea"
import { RestartButton } from "@/components/restart-button"
import { ConfettiEffect } from "@/components/confetti-effect"
import { motion } from "framer-motion"
import { ChatResponse } from "@/lib/types"
import { useExtractedInfo, getInitialExtractedInfo } from "@/hooks/use-extracted-info"
import { ExtractedInfoCard } from "@/components/extracted-info-card"
import Image from "next/image"
import { GOOGLE_LOGOS } from "@/public/google-logos"

export function ChatForm({ className, ...props }: React.ComponentProps<"form">) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { extractedInfo, updateExtractedInfo } = useExtractedInfo()
  const textareaRef = useRef<AutoResizeTextareaRef>(null)

  const { messages, input, setInput, append, reload, setMessages, isLoading } = useChat({
    api: "/api/chat",
    onResponse: (response) => {
      const reader = response.body?.getReader()
      return new Promise<void>(async (resolve) => {
        if (reader) {
          const decoder = new TextDecoder()
          let result = ""
          while (true) {
            const { done, value } = await reader.read()
            if (done) break
            result += decoder.decode(value)
          }
          try {
            const parsedResponse: ChatResponse = JSON.parse(result)
            setIsCompleted(parsedResponse.is_completed || false)
            if (parsedResponse.extracted_information) {
              updateExtractedInfo(parsedResponse.extracted_information)
            }
            setMessages(prevMessages => [...prevMessages, {
              id: `${Date.now()}-${Math.random()}`,
              content: JSON.stringify(parsedResponse),
              role: "assistant",
            }])
            console.log('Setting messages:', messages)
            setIsProcessing(false)
            setTimeout(() => {
              textareaRef.current?.focus()
            }, 100)
          } catch (error) {
            setMessages(prevMessages => [...prevMessages, {
              id: `${Date.now()}-${Math.random()}`,
              content: "I apologize, but I encountered an error processing the last message. Could you please try again?",
              role: "assistant",
            }])
            setIsProcessing(false)
          }
        }
        resolve()
      })
    },
    onError: () => {
      setIsProcessing(false)
    },
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (input.trim() && !isProcessing && !isLoading) {
      setIsProcessing(true)
      const message = input
      setInput("")
      try {
        const userMessage = {
          id: `${Date.now()}-${Math.random()}`,
          content: message,
          role: "user" as const
        }
        await append(userMessage)
      } catch (error) {
        console.error("Error submitting message:", error)
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    }
  }

  const handleRestart = useCallback(() => {
    setMessages([])
    setInput("")
    setIsProcessing(false)
    setIsCompleted(false)
    setShowConfetti(false)
    reload()
    updateExtractedInfo(getInitialExtractedInfo())
  }, [reload, setInput, setMessages, updateExtractedInfo, getInitialExtractedInfo])

  const handleComplete = async () => {
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(extractedInfo),
      })

      if (!response.ok) {
        throw new Error('Failed to submit data')
      }

      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
        handleRestart()
      }, 3000)
    } catch (error) {
      console.error('Error submitting data:', error)
      // 可以在这里添加错误提示
    }
  }

  const header = (
    <header className="m-auto flex max-w-2xl flex-col gap-6 text-center">
      <h2 className="text-3xl font-bold leading-tight tracking-tight text-primary">
        Google Enterprise Solutions Evaluator
      </h2>
      <p className="text-muted-foreground text-lg">
        Discover how Google's enterprise solutions can transform your business
      </p>
      <div className="flex justify-center items-center space-x-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-col items-center">
              <Image
                src={GOOGLE_LOGOS.maps}
                alt="Google Maps Platform"
                width={100}
                height={100}
                className="h-8 w-auto object-contain"
                priority
              />
              <span className="mt-2 text-sm font-medium">Google Maps Platform</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Location-based services and mapping solutions</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-col items-center">
              <Image
                src={GOOGLE_LOGOS.cloud}
                alt="Google Cloud"
                width={100}
                height={100}
                className="h-8 w-auto object-contain"
                priority
              />
              <span className="mt-2 text-sm font-medium">Google Cloud</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Cloud computing, data analytics, and machine learning</p>
          </TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex flex-col items-center">
              <Image
                src={GOOGLE_LOGOS.workspace}
                alt="Google Workspace"
                width={140}
                height={100}
                className="h-10 w-auto object-contain"
                priority
              />
              <span className="mt-2 text-sm font-medium">Workspace</span>
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Productivity and collaboration tools</p>
          </TooltipContent>
        </Tooltip>
      </div>
      <p className="text-muted-foreground text-sm mt-4">
        Start by describing your business needs or asking about Google solutions
      </p>
    </header>
  )

  const messageList = (
    <div className="my-4 flex h-fit min-h-full flex-col gap-4">
      {messages.map((message, index) => {
        if (message.role === "assistant") {
          let content: string
          try {
            const parsedContent: ChatResponse = JSON.parse(message.content)
            // Only show the response and next_question if they exist
            content = [parsedContent.response, parsedContent.next_question].filter(Boolean).join(" ")
          } catch (error) {
            console.error("Failed to parse message content:", error)
            content = "I apologize, but I encountered an error processing the last message. Could you please try again?"
          }
          return (
            <div
              key={index}
              className="max-w-[80%] rounded-xl px-4 py-2 text-sm self-start bg-secondary text-secondary-foreground"
            >
              {content}
            </div>
          )
        } else {
          return (
            <div
              key={index}
              className="max-w-[80%] rounded-xl px-4 py-2 text-sm self-end bg-primary text-primary-foreground"
            >
              {message.content}
            </div>
          )
        }
      })}
      {isProcessing && (
        <div className="max-w-[80%] rounded-xl px-4 py-2 text-sm self-start bg-secondary text-secondary-foreground">
          <Loader2 className="animate-spin" />
        </div>
      )}
    </div>
  )

  return (
    <div className="flex w-full h-[calc(100vh-4rem)]">
      <ExtractedInfoCard
        extractedInfo={extractedInfo}
        className="h-full rounded-none border-r"
      />
      <main
        className={cn(
          "ring-none flex h-full w-full flex-col items-stretch border-none",
          className,
        )}
        {...props}
      >
        <div className="flex-1 content-center overflow-y-auto px-6 relative">
          {messages.length ? messageList : header}
        </div>
        <div className="mx-6 mb-6 flex flex-col items-center">
          {isCompleted && (
            <div className="w-full text-center mb-4">
              <p className="text-sm text-muted-foreground mb-2">
                我们已收集到所有必要信息，感谢您的配合！
              </p>
              <Button
                onClick={handleComplete}
                className="bg-green-500 hover:bg-green-600 text-white"
              >
                <CheckCircle className="mr-2 h-4 w-4" /> 完成
              </Button>
            </div>
          )}
          <div className="w-full flex items-center">
            <motion.div
              className="flex-1"
              animate={
                isCompleted
                  ? {
                      scale: [1, 1.02, 1],
                      borderColor: ["#e2e8f0", "#22c55e", "#e2e8f0"],
                    }
                  : {}
              }
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            >
              <form
                onSubmit={handleSubmit}
                className="border-input bg-background focus-within:ring-ring/10 relative flex items-center rounded-[16px] border px-3 py-1.5 pr-8 text-sm focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-0"
              >
                <AutoResizeTextarea
                  ref={textareaRef}
                  onKeyDown={handleKeyDown}
                  onChange={(v) => setInput(v)}
                  value={input}
                  disabled={isProcessing || isLoading}
                  placeholder="请描述您的业务需求或询问关于 Google 解决方案的问题..."
                  className="placeholder:text-muted-foreground flex-1 bg-transparent focus:outline-none disabled:opacity-50"
                  rows={3}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      variant="ghost"
                      size="sm"
                      className="absolute bottom-1 right-1 size-6 rounded-full"
                      disabled={isProcessing || isLoading}
                    >
                      {isProcessing || isLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                      ) : (
                        <ArrowUpIcon size={16} />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent sideOffset={12}>发送</TooltipContent>
                </Tooltip>
              </form>
            </motion.div>
            {messages.length > 0 && <RestartButton onClick={handleRestart} />}
          </div>
        </div>
        {showConfetti && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50">
            <ConfettiEffect />
          </div>
        )}
      </main>
    </div>
  )
}

