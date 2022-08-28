import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Congrats from './Congrats'

const Snake = props => {
  const ref = useRef(null)
  const [snakeHeadPosition, setSnakeHeadPosition] = useState(2)
  const [inputState, setInputState] = useState('')
  const [fieldSize, setFieldSize] = useState(10)
  const [isLose, setIsLose] = useState(false)
  const [difficulty, setDifficulty] = useState('Medium')
  const [delay, setDelay] = useState(null)
  const [foodPosition, setFoodPosition] = useState(0)
  const [snakePosition, setSnakePosition] = useState([1,2])
  const direction = useRef('Right')

  useEffect(() => {
    let pos = 0
    if (fieldSize * fieldSize === snakePosition.length) {
      setIsLose(true)
    } else {
      while (pos === 0 || snakePosition.includes(pos)) {
        pos = Math.round(Math.random() * (fieldSize * fieldSize))
      }

      setDelayBySnakeLength()
      setFoodPosition(pos)
    }
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
  }, [snakePosition, snakeHeadPosition])

  useEffect(() => {
    reset()
  }, [fieldSize, difficulty])

  useEffect(() => {
    window.addEventListener('keydown', keyDown)

    return () => window.removeEventListener('keydown', keyDown)
  })

  function keyDown(e) {
    if (e.code === 'ArrowUp') {
      if (direction.current === 'Down') return
      direction.current = 'Up'
      move()
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
    const horizontalLine = snakeHeadPosition / fieldSize > Math.floor(snakeHeadPosition / fieldSize) ? Math.floor(snakeHeadPosition / fieldSize) : snakeHeadPosition / fieldSize - 1
    const verticalLine = getVerticalLinePosition(horizontalLine, fieldSize, snakeHeadPosition)
    const copySnakePosition = snakePosition.slice()
    switch (direction.current) {
      case 'Up': {
        if ((verticalLine + 1) === copySnakePosition.at(-1)) {
          if (copySnakePosition.at(-1) + (fieldSize * fieldSize - fieldSize) === foodPosition) {
            copySnakePosition.push(copySnakePosition.at(-1) + (fieldSize * fieldSize - fieldSize))
          } else {
            copySnakePosition.shift()
            copySnakePosition.push(copySnakePosition.at(-1) + (fieldSize * fieldSize - fieldSize))
          }
        } else if (copySnakePosition.at(-1) - fieldSize === foodPosition) {
          copySnakePosition.push(copySnakePosition.at(-1) - fieldSize)
        } else {
          copySnakePosition.shift()
          copySnakePosition.push(copySnakePosition.at(-1) - fieldSize)
        }
        break
      }
      case 'Down': {
        if (fieldSize * fieldSize - (fieldSize - (verticalLine + 1))  === copySnakePosition.at(-1)) {
          if (copySnakePosition.at(-1) - (fieldSize * fieldSize - fieldSize) === foodPosition) {
            copySnakePosition.push(copySnakePosition.at(-1) - (fieldSize * fieldSize - fieldSize))
          } else {
            copySnakePosition.shift()
            copySnakePosition.push(copySnakePosition.at(-1) - (fieldSize * fieldSize - fieldSize))
          }
        } else if (copySnakePosition.at(-1) + fieldSize === foodPosition) {
          copySnakePosition.push(copySnakePosition.at(-1) + fieldSize)
        } else {
          copySnakePosition.shift()
          copySnakePosition.push(copySnakePosition.at(-1) + fieldSize)
        }
        break
      }
      case 'Left': {
        if (horizontalLine * fieldSize + 1 === copySnakePosition.at(-1)) {
          if (copySnakePosition.at(-1) + fieldSize - 1 === foodPosition) {
            copySnakePosition.push(copySnakePosition.at(-1) + fieldSize - 1)
          } else {
            copySnakePosition.shift()
            copySnakePosition.push(copySnakePosition.at(-1) + fieldSize - 1)
          }
        } else if (copySnakePosition.at(-1) - 1 === foodPosition) {
          copySnakePosition.push(copySnakePosition.at(-1) - 1)
        } else {
          copySnakePosition.shift()
          copySnakePosition.push(copySnakePosition.at(-1) - 1)
        }
        break
      }
      case 'Right': {
        if ((horizontalLine + 1) * fieldSize === copySnakePosition.at(-1)) {
          if (copySnakePosition.at(-1) - fieldSize + 1 === foodPosition) {
            copySnakePosition.push(copySnakePosition.at(-1) - fieldSize + 1)
          } else {
            copySnakePosition.shift()
            copySnakePosition.push(copySnakePosition.at(-1) - fieldSize + 1)
          }
        } else if (copySnakePosition.at(-1) + 1 === foodPosition) {
            copySnakePosition.push(copySnakePosition.at(-1) + 1)
        } else {
          copySnakePosition.shift()
          copySnakePosition.push(copySnakePosition.at(-1) + 1)
        }
        break
      }
      default:
        break
    }
    setSnakeHeadPosition(copySnakePosition.at(-1))
    setSnakePosition(copySnakePosition)
  }

  function getVerticalLinePosition(horizontalLine, length, position) {
    const firstNumberInLine = horizontalLine * length + 1
    // const lastNumberInLine = (horizontalLine + 1) * length
    return position - firstNumberInLine
  }

  function reset() {
    setSnakeHeadPosition(2)
    setIsLose(false)

    switch(difficulty) {
      case 'Easy':
        setDelay(500)
        break
      case 'Medium':
        setDelay(300)
        break
      case 'Hard':
        setDelay(150)
        break
      default:
        break
    }

    if(snakePosition.length > 2) setFoodPosition(0)
    else setFoodPosition(7)

    setSnakePosition([1,2])
    direction.current = 'Right'
  }

  function handleInput(e) {
    const num = parseInt(e.target.value)
    if (!isNaN(num)) {
      setInputState(num)
    } else {
      setInputState('')
    }
  }

  function handleClick() {
    if(inputState >= 5 && inputState <= 25) {
      setFieldSize(inputState)
    }
  }

  function handleSelect(e) {
    setDifficulty(e.target.value)
    document.activeElement.blur()
  }

  function setDelayBySnakeLength() {
    if (difficulty === 'Easy') {
      switch(snakePosition.length) {
        case 2:
          setDelay(500)
          break
        case 5:
          setDelay(400)
          break
        case 10:
          setDelay(300)
          break
        case 20:
          setDelay(200)
          break
        case 25:
          setDelay(175)
          break
        case 40:
          setDelay(150)
          break
        default:
          break
      }
    } else if (difficulty === 'Medium') {
      switch(snakePosition.length) {
        case 2:
          setDelay(300)
          break
        case 5:
          setDelay(250)
          break
        case 10:
          setDelay(200)
          break
        case 15:
          setDelay(175)
          break
        case 20:
          setDelay(135)
          break
        case 30:
          setDelay(120)
          break
        case 40:
          setDelay(100)
          break
        default:
          break
      }
    } else {
      switch(snakePosition.length) {
        case 2:
          setDelay(150)
          break
        case 7:
          setDelay(125)
          break
        case 15:
          setDelay(100)
          break
        case 20:
          setDelay(75)
          break
        case 25:
          setDelay(50)
          break
        default:
          break
      }
    }
  }

  return (
    <div className={props.className}>
      <ControlsWrapper>
        <Wrapper>
          <Label name='size'>Enter the size of the playing field (5 - 25):</Label>
          <Input type='text' name='size' placeholder={fieldSize} onChange={handleInput}/>
          <Button type='button' onClick={handleClick} value='Ok'></Button>
        </Wrapper>
        <Wrapper>
          <Label name='difficulty'>Select difficulty level:</Label>
          <Select name='difficulty' value={difficulty} onChange={handleSelect}>
            <option value='Easy'>Easy</option>
            <option value='Medium'>Medium</option>
            <option value='Hard'>Hard</option>
          </Select>
        </Wrapper>
      </ControlsWrapper>
      {isLose
        ? <Congrats reset={reset} length={snakePosition.length}/>
        : null
      }
      <Container>
        <Table  >
          <tbody ref={ref}>
            {Array.from({length: fieldSize}, (tr, TrIndex) => <TR key={TrIndex}>
              {Array.from({length: fieldSize}, (td, TdIndex) => <TD key={TrIndex * fieldSize + TdIndex} snakePosition={snakePosition} foodPosition={foodPosition} pos={TrIndex * fieldSize + TdIndex + 1} fieldSize={fieldSize}> {TrIndex * fieldSize + TdIndex + 1} </TD> )}
            </TR> )}
          </tbody>
        </Table>
      </Container>
    </div>
  )
}

Snake.propTypes = {
    className: PropTypes.string,
}

const ControlsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  justify-content: center;
  align-items: space-between;
`

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  :first-child {
    margin-bottom: 15px;
  }
`

const Label = styled.label`
  margin-right: 10px;
`

const Select = styled.select`
  background-color: #fff;
  font-size: 15px;
`

const Input = styled.input`
  width: 50px;
  height: 22px;
`

const Button = styled.input`
  width: 30px;
  height: 30px;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  cursor: pointer;
  &:hover {
    background-color: #d8d8d8;
  }
`

const Table = styled.table`
  width: 100%;
  height: 100%;
`

const TR = styled.tr`
`

const TD = styled.td`
  width: ${props => props.fieldSize <=10 ? '40px' : '25px'};
  height: ${props => props.fieldSize <=10 ? '40px' : '25px'};
  background-color: ${props => props.snakePosition.includes(props.pos) ? 'red' : props.foodPosition === props.pos ? 'yellow' : 'white'};
  color: rgba(0,0,0,0);
`

const Container = styled.div`
  background-color: #006f83
`

export default styled(Snake)`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`
