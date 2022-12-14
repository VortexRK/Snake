import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Congrats = props => {
  return (
    <div className={props.className}>
      <Text>Congratulation! The snake length is <b>{props.length}</b></Text>
      <Text>Do you want to try again?</Text>
      <ButtonWrapper>
        <Button onClick={props.reset}>Yes</Button>
        <Button onClick={() => window.close()}>No</Button>
      </ButtonWrapper>
    </div>
  )
}

Congrats.propTypes = {
  className: PropTypes.string,
  reset: PropTypes.func,
  length: PropTypes.number,
}

const Text = styled.p`
  font-size: 16px;
  color: #000;
  margin-top: 0px;
  margin-bottom: 15px;
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`

const Button = styled.div`
  width: 100px;
  height: 50px;
  border-radius: 10px;
  font-size: 20px;
  color: #000;
  border: 1px solid grey;
  background-color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :hover {
    background-color: #ebebeb;
  }

  :first-child {
    margin-right: 30px;
  }
`

export default styled(Congrats)`
  width: 400px;
  height: 250px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #d7d7d7;
  box-shadow: 3px 3px 6px 7px rgba(0, 0, 0, 0.2);
  position: absolute;
`
