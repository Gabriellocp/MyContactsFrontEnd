import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

export default function ReactPortal({ id, children }) {
  let container = document.getElementById(id);
  if (!container) {
    container = document.createElement('div');
    container.setAttribute('id', id);
    document.body.appendChild(container);
  }
  return ReactDOM.createPortal(children, container);
}

ReactPortal.propTypes = {
  id: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};
