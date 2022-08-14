import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Congrats from './Congrats'

const Snake = props => {
  const ref = useRef(null)
  const [snakeHeadPosition, setSnakeHeadPosition] = useState(17)
  const [isLose, setIsLose] = useState(false)
  const [delay, setDelay] = useState(500)
  const [foodPosition, setFoodPosition] = useState(0)
  const [snakePosition, setSnakePosition] = useState([16,17])
  const direction = useRef('Right')
  const fieldSize = useRef(15)

  useEffect(() => {
    let pos = 0
    while (pos === 0 || snakePosition.includes(pos)) {
      pos = Math.round(Math.random() * (fieldSize.current*fieldSize.current))
    }

    switch(snakePosition.length) {
      case 5:
        setDelay(400)
        break
      case 10:
        setDelay(300)
        break
      case 15:
        setDelay(250)
        break
      case 20:
        setDelay(200)
        break
      case 25:
        setDelay(150)
        break
      case 30:
        setDelay(100)
        break
    }
    setFoodPosition(pos)
  }, [snakePosition.length])

  useEffect(() => {
    const intervalId = setInterval(() => {
      move()
    }, delay)
    if (isLose) clearInterval(intervalId)
    return () => clearInterval(intervalId)
  })

  useEffect(() => {
    if (snakePosition.slice(0, snakePosition.length - 1).includes(snakeHeadPosition)) {
      setIsLose(true)
    }
  })

  useEffect(() => {
    window.addEventListener('keydown', keyDown)

    return () => window.removeEventListener('keydown', keyDown)
  })

  function keyDown(e) {
    if (e.code === 'ArrowUp') {
      if (direction.current === 'Down') return
      direction.current = 'Up'
      move('ArrowUp')
    }

    if (e.code === 'ArrowDown') {
      if (direction.current === 'Up') return
      direction.current = 'Down'
      move()
    }

    if (e.code === 'ArrowLeft') {
      if (direction.current === 'Right') return
      direction.current = 'Left'
      move()
    }

    if (e.code === 'ArrowRight') {
      if (direction.current === 'Left') return
      direction.current = 'Right'
      move()
    }
  }

  function move() {
    let length = ref.current.children.length
    const innerLength = ref.current.children[0].children.length
    const horizontalLine = snakeHeadPosition / innerLength > Math.floor(snakeHeadPosition / innerLength) ? Math.floor(snakeHeadPosition / innerLength) : snakeHeadPosition / innerLength - 1
    const verticalLine = getVerticalLinePosition(horizontalLine, length, snakeHeadPosition)
    const copySnakePosition = snakePosition.slice()
    switch (direction.current) {
      case 'Up': {
        if (innerLength - (innerLength - (verticalLine + 1)) === copySnakePosition.at(-1)) {
          if (copySnakePosition.at(-1) + (length * innerLength - length) === foodPosition) {
            copySnakePosition.push(copySnakePosition.at(-1) + (length * innerLength - length))
          } else {
            copySnakePosition.shift()
            copySnakePosition.push(copySnakePosition.at(-1) + (length * innerLength - length))
          }
        } else if (copySnakePosition.at(-1) - innerLength === foodPosition) {
          copySnakePosition.push(copySnakePosition.at(-1) - innerLength)
        } else {
          copySnakePosition.shift()
          copySnakePosition.push(copySnakePosition.at(-1) - innerLength)
        }
        break
      }
      case 'Down':{
        if (length * innerLength - (innerLength - (verticalLine + 1))  === copySnakePosition.at(-1)) {
          if (copySnakePosition.at(-1) - (length * innerLength - length) === foodPosition) {
            copySnakePosition.push(copySnakePosition.at(-1) - (length * innerLength - length))
          } else {
            copySnakePosition.shift()
            copySnakePosition.push(copySnakePosition.at(-1) - (length * innerLength - length))
          }
        } else if (copySnakePosition.at(-1) + innerLength === foodPosition) {
          copySnakePosition.push(copySnakePosition.at(-1) + innerLength)
        } else {
          copySnakePosition.shift()
          copySnakePosition.push(copySnakePosition.at(-1) + innerLength)
        }
        break
      }
      case 'Left':{
        if ((horizontalLine + 1) * innerLength - innerLength + 1 === copySnakePosition.at(-1)) {
          if (copySnakePosition.at(-1) + innerLength - 1 === foodPosition) {
            copySnakePosition.push(copySnakePosition.at(-1) + innerLength - 1)
          } else {
            copySnakePosition.shift()
            copySnakePosition.push(copySnakePosition.at(-1) + innerLength - 1)
          }
        } else if (copySnakePosition.at(-1) - 1 === foodPosition) {
          copySnakePosition.push(copySnakePosition.at(-1) - 1)
        } else {
          copySnakePosition.shift()
          copySnakePosition.push(copySnakePosition.at(-1) - 1)
        }
        break
      }
      case 'Right':{
        if ((horizontalLine + 1) * innerLength === copySnakePosition.at(-1)) {
          if (copySnakePosition.at(-1) - innerLength + 1 === foodPosition) {
            copySnakePosition.push(copySnakePosition.at(-1) - innerLength + 1)
          } else {
            copySnakePosition.shift()
            copySnakePosition.push(copySnakePosition.at(-1) - innerLength + 1)
          }
        } else if (copySnakePosition.at(-1) + 1 === foodPosition) {
            copySnakePosition.push(copySnakePosition.at(-1) + 1)
        } else {
          copySnakePosition.shift()
          copySnakePosition.push(copySnakePosition.at(-1) + 1)
        }
        break
      }
    }
    setSnakeHeadPosition(copySnakePosition.at(-1))
    setSnakePosition(copySnakePosition)
  }

  function getVerticalLinePosition(horizontalLine, length, position) {
    const firstNumberInLine = horizontalLine * length + 1
    const lastNumberInLine = (horizontalLine + 1) * length
    const verticalLine = (lastNumberInLine - firstNumberInLine) - (lastNumberInLine - position)
    return verticalLine
  }

  function reset() {
    setSnakeHeadPosition(17)
    setIsLose(false)
    setDelay(500)
    setFoodPosition(0)
    setSnakePosition([16,17])
    direction.current = 'Right'
  }

  return (
    <div className={props.className}>
      {isLose
        ? <Congrats reset={reset} length={snakePosition.length}/>
        : null
      }
      <Container>
        <Table  >
          <tbody ref={ref}>
            {Array.from({length: fieldSize.current}, (tr, index) => <TR key={index}>
              {Array.from({length: fieldSize.current}, (td, TdIndex) => <TD key={index * fieldSize.current + TdIndex} snakePosition={snakePosition} foodPosition={foodPosition} pos={index * fieldSize.current + TdIndex + 1}> {index * fieldSize.current + TdIndex + 1} </TD> )}
            </TR>) }
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

Snake.propTypes = {
    className: PropTypes.string,
}

const Table = styled.table`
  width: 100%;
  height: 100%;
`

const TR = styled.tr`
`

const TD = styled.td`
  width: 5px;
  height: 5px;
  background-color: ${props => props.snakePosition.includes(props.pos) ? 'red' : props.foodPosition === props.pos ? 'yellow' : 'white'};
  color: rgba(0,0,0,0);
`

const Container = styled.div`
  background-color: #006f83
`

export default styled(Snake)`
height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
