import PropTypes from 'prop-types'
import Button from './button'
const Header = ({title, onAdd, showAdd}) => {
  return (
    <header className="header">
        <h1>{title}</h1>
        <Button color={showAdd? '#1B2021' : '#5AA9E6'} text={showAdd? 'Close' : 'Add'} onClick={onAdd}/>
    </header>
  )
}

Header.defaultProps = {
    title: 'Task Scheduler',
}

Header.propTypes = {
    title: PropTypes.string.isRequired,
}

export default Header
