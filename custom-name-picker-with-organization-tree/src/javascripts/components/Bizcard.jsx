import React from 'react';
import PropTypes from 'prop-types';
import '../../stylesheets/bizcard.less';
import Icon from '../../icons/role_64.svg';
/**
 * Used to render a bizcard for a person.
 * It takes name, email, department and job title from properties.
 * It also takes an onClick handler.
 */
class Bizcard extends React.Component {

  render() {
    return (
      <div className='bizcard' onClick={this.props.onClick}>
        <div className='bizcard-icon'>
          <Icon/>
        </div>
        <div className='bizcard-info'>
          <div className='name'>
            {this.props.name}
          </div>
          <div className='email'>
            {this.props.email}
          </div>
          <div className='title'>{this.props.title}</div>
        </div>
      </div>
    );
  }
}

Bizcard.propTypes = {
  name: PropTypes.string,
  email: PropTypes.string,
  title: PropTypes.string,
  onClick: PropTypes.func
}

export default Bizcard;
