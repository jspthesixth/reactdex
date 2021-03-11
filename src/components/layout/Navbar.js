import PropTypes from 'prop-types';

export const Navbar = ({ title }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0 align-items-center"
        href="/"
      >
        {title}
      </a>
    </nav>
  );
};

Navbar.defaultProps = {
  title: 'Reactdex',
};

Navbar.propTypes = {
  title: PropTypes.string.isRequired,
};
