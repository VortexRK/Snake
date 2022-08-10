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

  useEffect(() => {
    let pos = 0
    while (pos === 0 || snakePosition.includes(pos)) {
      pos = Math.round(Math.random() * 25)
    }
    if (snakePosition.length === 15) {
      setDelay(300)
    } else if (snakePosition.length === 7) {
      setDelay(400)
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
    const number = (horizontalLine + 1) * length - position
    switch (number) {
      case 4: {
        return 0
      }
      case 3: {
        return 1
      }
      case 2: {
        return 2
      }
      case 1: {
        return 3
      }
      case 0: {
        return 4
      }
    }
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
        ? <Congrats reset={reset}/>
        : null
      }
      <Container>
        <Table  >
          <tbody ref={ref}>
            <TR>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={1}>1</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={2}>2</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={3}>3</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={4}>4</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={5}>5</TD>
            </TR>
            <TR>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={6}>6</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={7}>7</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={8}>8</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={9}>9</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={10}>10</TD>
            </TR>
            <TR>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={11}>11</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={12}>12</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={13}>13</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={14}>14</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={15}>15</TD>
            </TR>
            <TR>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={16}>16</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={17}>17</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={18}>18</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={19}>19</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={20}>20</TD>
            </TR>
            <TR>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={21}>21</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={22}>22</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={23}>23</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={24}>24</TD>
              <TD snakePosition={snakePosition} foodPosition={foodPosition} pos={25}>25</TD>
            </TR>
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
  width: 50px;
  height: 50px;
  background-color: ${props => props.snakePosition.includes(props.pos) ? 'red' : props.foodPosition === props.pos ? 'yellow' : 'white'};
`

const Container = styled.div`
  width: 700px;
  height: 700px;
  background-color: #006f83
`

export default styled(Snake)`
height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`
