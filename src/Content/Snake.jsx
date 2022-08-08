import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'

const Snake = props => {
  const ref = useRef(null)
  const [active, setActive] = useState(false)
  const [position, setPosition] = useState(16)
  const [keyDirection, setKeyDirection] = useState('')
  function Click(e) {
    console.log(e.target)
    e.target.style.backgroundColor = 'red'
  }

  function keyDown(e) {
    console.log(ref.current.children)
    let length = ref.current.children.length
    const insideLength = ref.current.children[0].children.length
    const horizontalLine = position / insideLength > Math.floor(position / insideLength) ? Math.floor(position / insideLength) : position / insideLength - 1
    const verticalLine = getVerticalLinePosition(horizontalLine, length, position)

    if (e.code === 'ArrowUp') {
      if (ref.current.children[0].children[verticalLine].innerText == position) {
        ref.current.children[length-1].children[verticalLine].style.backgroundColor = 'red'
        ref.current.children[0].children[verticalLine].style.backgroundColor = '#fff'
        setPosition(position => position + (length * insideLength - length))
        return
        
      }
      for (let i = 0; i < length; i++) {
        if (ref.current.children[i].children[verticalLine].innerText == position) {
          ref.current.children[i].children[verticalLine].style.backgroundColor = '#fff'
        }

        if (ref.current.children[i].children[verticalLine].innerText == position - insideLength) {
          ref.current.children[i].children[verticalLine].style.backgroundColor = 'red'
        }
      }
      setPosition(position => position - insideLength)
    }

    if (e.code === 'ArrowDown') {
      if (ref.current.children[length-1].children[verticalLine].innerText == position) {
        ref.current.children[0].children[verticalLine].style.backgroundColor = 'red'
        ref.current.children[length-1].children[verticalLine].style.backgroundColor = '#fff'
        setPosition(position => position - (length * insideLength - length))
        return
        
      }
      for (let i = 0; i < length; i++) {
        if (ref.current.children[i].children[verticalLine].innerText == position) {
          ref.current.children[i].children[verticalLine].style.backgroundColor = '#fff'
        }

        if (ref.current.children[i].children[verticalLine].innerText == position + 5) {
          ref.current.children[i].children[verticalLine].style.backgroundColor = 'red'
        }
      }
      setPosition(position => position + insideLength)
    }

    if (e.code === 'ArrowLeft') {
      if (ref.current.children[horizontalLine].children[0].innerText == position) {
        ref.current.children[horizontalLine].children[4].style.backgroundColor = 'red'
        ref.current.children[horizontalLine].children[0].style.backgroundColor = '#fff'
        setPosition(position => position + insideLength - 1)
        return
      }
      for (let i = 0; i < insideLength; i++) {
        if (ref.current.children[horizontalLine].children[i].innerText == position) {
          ref.current.children[horizontalLine].children[i].style.backgroundColor = '#fff'
        }

        if (ref.current.children[horizontalLine].children[i].innerText == position - 1) {
          ref.current.children[horizontalLine].children[i].style.backgroundColor = 'red'
        }
      }
      setPosition(position => position - 1)
    }

    if (e.code === 'ArrowRight') {
      console.log(' UUUUU  ArrowRight', position)

      if (ref.current.children[horizontalLine].children[4].innerText == position) {
        ref.current.children[horizontalLine].children[0].style.backgroundColor = 'red'
        ref.current.children[horizontalLine].children[4].style.backgroundColor = '#fff'
        setPosition(position => position - insideLength + 1)
        return
      }

      for (let i = 0; i < insideLength; i++) {
        if (ref.current.children[horizontalLine].children[i].innerText == position) {
          ref.current.children[horizontalLine].children[i].style.backgroundColor = '#fff'
        }

        if (ref.current.children[horizontalLine].children[i].innerText == position + 1) {
          ref.current.children[horizontalLine].children[i].style.backgroundColor = 'red'
        }
      }
      setPosition(position => position + 1)
    }
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
  return (
    <div className={props.className}>
      <Container>
        <Table  >
          <tbody onClick={e => Click(e)} ref={ref}>
            <TR>
              <TD>1</TD>
              <TD>2</TD>
              <TD>3</TD>
              <TD>4</TD>
              <TD>5</TD>
            </TR>
            <TR>
              <TD>6</TD>
              <TD>7</TD>
              <TD>8</TD>
              <TD>9</TD>
              <TD>10</TD>
            </TR>
            <TR>
              <TD>11</TD>
              <TD>12</TD>
              <TD>13</TD>
              <TD>14</TD>
              <TD>15</TD>
            </TR>
            <TR>
              <TD active={true}>16</TD>
              <TD>17</TD>
              <TD>18</TD>
              <TD>19</TD>
              <TD>20</TD>
            </TR>
            <TR>
              <TD>21</TD>
              <TD>22</TD>
              <TD>23</TD>
              <TD>24</TD>
              <TD>25</TD>
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
  background-color: ${props => props.active ? 'red' : '#fff'};
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
