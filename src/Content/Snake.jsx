import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

const Snake = props => {
  const ref = useRef(null)
  const [snakeHeadPosition, setSnakeHeadPosition] = useState(17)
  const [snakeEndPosition, setSnakeEndPosition] = useState(16)
  const [keyDirection, setKeyDirection] = useState('')
  const [snakeLength, setSnakeLength] = useState(2)
  const [foodPosition, setFoodPosition] = useState(4)

  const [snakePosition, setSnakePosition] = useState([16,17])

useEffect(() => {
  
  let pos = 0
  while (pos === 0 || snakePosition.includes(pos)) {
    pos = Math.round(Math.random() * 25)
  } 
  console.log('foodPosition', pos)
  setFoodPosition(pos)
}, [snakeLength])

useEffect(() => {
  if (snakePosition.includes(foodPosition)) {
    const helper = snakePosition.slice()
    helper.unshift(snakeEndPosition)
    setSnakePosition(helper)
    setSnakeLength(length => length + 1)
    setFoodPosition(0)
  }
}, [snakeEndPosition])

// Попробовать по нажатию кнопки записать направление в Стейт (Пример: Right) и это в ивенте, А в сеттаймаунте уже делать нужное действие в зависимости от стейта.
  function keyDown(e) {
    // console.log(ref.current.children)
    // console.log('snakePosition', snakePosition)
    let length = ref.current.children.length
    const innerLength = ref.current.children[0].children.length
    const horizontalLine = snakeHeadPosition / innerLength > Math.floor(snakeHeadPosition / innerLength) ? Math.floor(snakeHeadPosition / innerLength) : snakeHeadPosition / innerLength - 1
    const verticalLine = getVerticalLinePosition(horizontalLine, length, snakeHeadPosition)
    const copySnakePosition = snakePosition.slice()
    const endSnake = copySnakePosition.shift()
    // console.log('endSnake', endSnake)
    if (e.code === 'ArrowUp') {
      if (innerLength - (innerLength - (verticalLine + 1)) === copySnakePosition.at(-1)) {
        copySnakePosition.push(copySnakePosition.at(-1) + (length * innerLength - length))
      } else copySnakePosition.push(copySnakePosition.at(-1) - innerLength)
    }

    if (e.code === 'ArrowDown') {
      if (length * innerLength - (innerLength - (verticalLine + 1))  === copySnakePosition.at(-1)) {
        copySnakePosition.push(copySnakePosition.at(-1) - (length * innerLength - length))
      } else copySnakePosition.push(copySnakePosition.at(-1) + innerLength)
    }

    if (e.code === 'ArrowLeft') {
      if ((horizontalLine + 1) * innerLength - innerLength + 1 === copySnakePosition.at(-1)) {
        copySnakePosition.push(copySnakePosition.at(-1) + innerLength - 1)
      } else copySnakePosition.push(copySnakePosition.at(-1) - 1)
    }

    if (e.code === 'ArrowRight') {
      if ((horizontalLine + 1) * innerLength === copySnakePosition.at(-1)) {
        copySnakePosition.push(copySnakePosition.at(-1) - innerLength + 1)
      } else copySnakePosition.push(copySnakePosition.at(-1) + 1)
    }
    setSnakeEndPosition(endSnake)
    setSnakeHeadPosition(copySnakePosition.at(-1))
    setSnakePosition(copySnakePosition)
  }

  // function keyDown(e) {
  //   if (e.code === 'ArrowUp') {
  //     setKeyDirection('Up')
  //   }

  //   if (e.code === 'ArrowDown') {
  //     setKeyDirection('Down')
  //   }

  //   if (e.code === 'ArrowLeft') {
  //     setKeyDirection('Left')
  //   }

  //   if (e.code === 'ArrowRight') {
  //     setKeyDirection('Right')
  //   }
  // }

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

  useEffect(() => {
    window.addEventListener('keydown', keyDown)

    return () => window.removeEventListener('keydown', keyDown)
  }, )

  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     console.log(1)
  //   }, 1000)
  //   return () => clearInterval(intervalId)
  // }, [])

  function isSnakePosition() {
    return snakePosition.includes()
  }
  return (
    <div className={props.className}>
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
  display: flex;
  justify-content: center;
  align-items: center;
`
