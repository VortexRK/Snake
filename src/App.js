import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components/macro'
import Snake from './Content/Snake'

const App = props => {
  return (
    <div className={props.className}>
      <Snake />
    </div>
  )
}

App.propTypes = {
  className: PropTypes.string,
}

export default styled(App)`
  margin: 0 auto;
  height: 100%;
`
