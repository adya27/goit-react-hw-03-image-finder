import PropTypes from 'prop-types';

function Button({ loadMore }) {
  return (
    <button onClick={loadMore} className="Button" type="button">
      Load more
    </button>
  );
}

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired
}