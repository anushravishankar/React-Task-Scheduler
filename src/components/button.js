import PropTypes from 'prop-types'

const button = ({color, text, onClick}) => {
    return (
    <button onClick={onClick} className="btn" style={{backgroundColor: color}}>{text}</button>
  )
}

button.defautProps = {
    color: 'steelblue'
}

button.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default button
