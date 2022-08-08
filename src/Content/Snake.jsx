import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

const Snake = props => {
  const ref = useRef(null)
  const [snakeHeadPosition, setSnakeHeadPosition] = useState(17)
  const [snakeEndPosition, setSnakeEndPosition] = useState(16)
  const [keyDirection, setKeyDirection] = useState('')
  const [snakeLength, setSnakeLength] = useState(2)

  const [snakePosition, setSnakePosition] = useState([16,17])

  function Click(e) {
    console.log(e.target)
    e.target.style.backgroundColor = 'red'
  }

  
// Попробовать по нажатию кнопки записать направление в Стейт (Пример: Right) и это в ивенте, А в сеттаймаунте уже делать нужное действие в зависимости от стейта. 
  function keyDown(e) {
    console.log(ref.current.children)
    let length = ref.current.children.length
    const innerLength = ref.current.children[0].children.length
    const horizontalLine = snakeHeadPosition / innerLength > Math.floor(snakeHeadPosition / innerLength) ? Math.floor(snakeHeadPosition / innerLength) : snakeHeadPosition / innerLength - 1
    const verticalLine = getVerticalLinePosition(horizontalLine, length, snakeHeadPosition)
    const copySnakePosition = snakePosition.slice()
    if (e.code === 'ArrowUp') {
      if (innerLength - (innerLength - (verticalLine + 1)) === copySnakePosition.at(-1)) {
        copySnakePosition.shift()
        copySnakePosition.push(copySnakePosition.at(-1) + (length * innerLength - length))
        setSnakeHeadPosition(copySnakePosition.at(-1))
        setSnakePosition(copySnakePosition)
        return
      }
      
      copySnakePosition.shift()
      copySnakePosition.push(copySnakePosition.at(-1) - innerLength)
      setSnakeHeadPosition(copySnakePosition.at(-1))
      setSnakePosition(copySnakePosition)
      // if (ref.current.children[0].children[verticalLine].innerText == snakeHeadPosition) {
      //   ref.current.children[length-1].children[verticalLine].style.backgroundColor = 'red'
      //   ref.current.children[0].children[verticalLine].style.backgroundColor = '#fff'
      //   setSnakeHeadPosition(position => position + (length * insideLength - length))
      //   return
        
      // }
      // for (let i = 0; i < length; i++) {
      //   if (ref.current.children[i].children[verticalLine].innerText == snakeHeadPosition) {
      //     ref.current.children[i].children[verticalLine].style.backgroundColor = '#fff'
      //   }

      //   if (ref.current.children[i].children[verticalLine].innerText == snakeHeadPosition - insideLength) {
      //     ref.current.children[i].children[verticalLine].style.backgroundColor = 'red'
      //   }
      // }
      // setSnakeHeadPosition(position => position - insideLength)
    }

    if (e.code === 'ArrowDown') {
      if (length * innerLength - (innerLength - (verticalLine + 1))  === copySnakePosition.at(-1)) {
        copySnakePosition.shift()
        copySnakePosition.push(copySnakePosition.at(-1) - (length * innerLength - length))
        setSnakeHeadPosition(copySnakePosition.at(-1))
        setSnakePosition(copySnakePosition)
        return
      }
      
      copySnakePosition.shift()
      copySnakePosition.push(copySnakePosition.at(-1) + innerLength)
      setSnakeHeadPosition(copySnakePosition.at(-1))
      setSnakePosition(copySnakePosition)
      // if (ref.current.children[length-1].children[verticalLine].innerText == snakeHeadPosition) {
      //   ref.current.children[0].children[verticalLine].style.backgroundColor = 'red'
      //   ref.current.children[length-1].children[verticalLine].style.backgroundColor = '#fff'
      //   setSnakeHeadPosition(position => position - (length * insideLength - length))
      //   return
        
      // }
      // for (let i = 0; i < length; i++) {
      //   if (ref.current.children[i].children[verticalLine].innerText == snakeHeadPosition) {
      //     ref.current.children[i].children[verticalLine].style.backgroundColor = '#fff'
      //   }

      //   if (ref.current.children[i].children[verticalLine].innerText == snakeHeadPosition + 5) {
      //     ref.current.children[i].children[verticalLine].style.backgroundColor = 'red'
      //   }
      // }
      // setSnakeHeadPosition(position => position + insideLength)
    }

    if (e.code === 'ArrowLeft') {
      if ((horizontalLine + 1) * innerLength - innerLength + 1 === copySnakePosition.at(-1)) {
        copySnakePosition.shift()
        copySnakePosition.push(copySnakePosition.at(-1) + innerLength - 1)
        setSnakeHeadPosition(copySnakePosition.at(-1))
        setSnakePosition(copySnakePosition)
        return
      }
      
      copySnakePosition.shift()
      copySnakePosition.push(copySnakePosition.at(-1) - 1)
      setSnakeHeadPosition(copySnakePosition.at(-1))
      setSnakePosition(copySnakePosition)

      // if (ref.current.children[horizontalLine].children[0].innerText == snakeHeadPosition) {
      //   ref.current.children[horizontalLine].children[4].style.backgroundColor = 'red'
      //   ref.current.children[horizontalLine].children[0].style.backgroundColor = '#fff'
      //   setSnakeHeadPosition(position => position + insideLength - 1)
      //   return
      // }
      // for (let i = 0; i < insideLength; i++) {
      //   if (ref.current.children[horizontalLine].children[i].innerText == snakeHeadPosition) {
      //     ref.current.children[horizontalLine].children[i].style.backgroundColor = '#fff'
      //   }

      //   if (ref.current.children[horizontalLine].children[i].innerText == snakeHeadPosition - 1) {
      //     ref.current.children[horizontalLine].children[i].style.backgroundColor = 'red'
      //   }
      // }
      // setSnakeHeadPosition(position => position - 1)
    }

    if (e.code === 'ArrowRight') {
      if ((horizontalLine + 1) * innerLength === copySnakePosition.at(-1)) {
        copySnakePosition.shift()
        copySnakePosition.push(copySnakePosition.at(-1) - innerLength + 1)
        setSnakeHeadPosition(copySnakePosition.at(-1))
        setSnakePosition(copySnakePosition)
        return
      }
      
      copySnakePosition.shift()
      copySnakePosition.push(copySnakePosition.at(-1) + 1)
      setSnakeHeadPosition(copySnakePosition.at(-1))
      setSnakePosition(copySnakePosition)

      // if (ref.current.children[horizontalLine].children[4].innerText == snakeHeadPosition) {
      //   ref.current.children[horizontalLine].children[0].style.backgroundColor = 'red'
      //   ref.current.children[horizontalLine].children[4].style.backgroundColor = '#fff'
      //   setSnakeHeadPosition(position => position - insideLength + 1)
      //   return
      // }

      // for (let i = 0; i < insideLength; i++) {
      //   if (ref.current.children[horizontalLine].children[i].innerText == snakeHeadPosition) {
      //     ref.current.children[horizontalLine].children[i].style.backgroundColor = '#fff'
      //   }

      //   if (ref.current.children[horizontalLine].children[i].innerText == snakeHeadPosition + 1) {
      //     ref.current.children[horizontalLine].children[i].style.backgroundColor = 'red'
      //   }
      // }
      // setSnakeHeadPosition(position => position + 1)
    }
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
          <tbody onClick={e => Click(e)} ref={ref}>
            <TR>
              <TD snakePosition={snakePosition} pos={1}>1</TD>
              <TD snakePosition={snakePosition} pos={2}>2</TD>
              <TD snakePosition={snakePosition} pos={3}>3</TD>
              <TD snakePosition={snakePosition} pos={4}>4</TD>
              <TD snakePosition={snakePosition} pos={5}>5</TD>
            </TR>
            <TR>
              <TD snakePosition={snakePosition} pos={6}>6</TD>
              <TD snakePosition={snakePosition} pos={7}>7</TD>
              <TD snakePosition={snakePosition} pos={8}>8</TD>
              <TD snakePosition={snakePosition} pos={9}>9</TD>
              <TD snakePosition={snakePosition} pos={10}>10</TD>
            </TR>
            <TR>
              <TD snakePosition={snakePosition} pos={11}>11</TD>
              <TD snakePosition={snakePosition} pos={12}>12</TD>
              <TD snakePosition={snakePosition} pos={13}>13</TD>
              <TD snakePosition={snakePosition} pos={14}>14</TD>
              <TD snakePosition={snakePosition} pos={15}>15</TD>
            </TR>
            <TR>
              <TD snakePosition={snakePosition} pos={16}>16</TD>
              <TD snakePosition={snakePosition} pos={17}>17</TD>
              <TD snakePosition={snakePosition} pos={18}>18</TD>
              <TD snakePosition={snakePosition} pos={19}>19</TD>
              <TD snakePosition={snakePosition} pos={20}>20</TD>
            </TR>
            <TR>
              <TD snakePosition={snakePosition} pos={21}>21</TD>
              <TD snakePosition={snakePosition} pos={22}>22</TD>
              <TD snakePosition={snakePosition} pos={23}>23</TD>
              <TD snakePosition={snakePosition} pos={24}>24</TD>
              <TD snakePosition={snakePosition} pos={25}>25</TD>
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
  background-color: ${props => props.snakePosition.includes(props.pos) ? 'red' : '#fff'};
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
