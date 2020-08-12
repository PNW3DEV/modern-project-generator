import { motion } from "framer-motion"
import React, { ComponentProps, useEffect, useState } from "react"
import styled, { createGlobalStyle } from "styled-components"

const ToggleDebugButton = styled(motion.button).attrs(() => ({
  drag: true,
  dragMomentum: false,
  whileHover: { scale: 1.05 },
}))<{ debug?: boolean }>`
  position: fixed
  top: 0px
  right: 100px
  border: none
  cursor: pointer
  padding: 5px
  border-radius: 5px
  border: 2px solid orange
  background: orange
  color: #333
  z-index: 5000
`

const getDebugStyles = ({ debug, color }: ComponentProps<any>): string => {
  if (!debug) {
    return ""
  }
  return `
  background: rgba(211,211,211, 0.2) !important
  outline-style: solid !important
  outline-color: ${color} !important
  outline-width: thin !important

  `
}

const gridStyles = `
background-size: 10px 10px !important
background-image: linear-gradient(to right, lightgray 1px, transparent 1px), linear-gradient(to bottom, lightgray 1px, transparent 1px) !important
`

interface CSSDebuggerProps {
  debug?: boolean
  color?: string
  showGrid?: boolean
  buttonStyle?: React.CSSProperties
}

const CSSDebugger: React.FC<CSSDebuggerProps> = ({
  debug = false,
  showGrid = true,
  buttonStyle,
  color = "rgba(255, 0, 0, .75)",
}) => {
  const [isDebug, setIsDebug] = useState(debug)
  const GlobalStyle = createGlobalStyle<{
    debug: boolean
    showGrid?: boolean
    color?: string
  }>`
    html, * {
      ${(props: any) => getDebugStyles(props)}
    }

    html {
      ${(props: any) => props.debug && props.showGrid && gridStyles}
    }
  `

  useEffect(() => {
    setIsDebug(debug)
  }, [debug])

  const toggle = () => {
    setIsDebug((v) => !v)
  }

  return (
    <>
      <GlobalStyle debug={isDebug} showGrid={showGrid} color={color} />
      <ToggleDebugButton style={buttonStyle} debug={isDebug} onTap={toggle}>
        Debug CSS
      </ToggleDebugButton>
    </>
  )
}

export { CSSDebugger }
