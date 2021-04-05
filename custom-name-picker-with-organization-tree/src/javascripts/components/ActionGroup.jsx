import React from 'react';
import PropTypes from 'prop-types';

/**
 * ActionGroup is used to render a group of actions.
 * It takes the actions defintion from the actions property, for example:
 * [
 *    {
 *      id: 'ok',
 *      name: 'ok',
 *      handler: okHandler
 *    },
 *    {
 *      id: 'cancel',
 *      name: 'cancel',
 *      handler: cancelHandler
 *    }
 * ]
 *
 * The handler function takes an event as its parameter.
 */
class ActionGroup extends React.Component {

  render() {
    var actions = this.props.actions || [];
    var children = actions.map( action =>
      <button key={action.id} onClick={action.handler}>
        {action.name}
      </button>
    );

    return (<div className='action-group'>{children}</div>);
  }
}

ActionGroup.propTypes = {
  actions: PropTypes.array
}

export default ActionGroup;
