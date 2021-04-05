import React from 'react';
import PropTypes from 'prop-types';
import ActionGroup from './ActionGroup';
import '../../stylesheets/action-list.less'

/**
 * The ActionList can render groups of actions.
 * It accepts the action definition via the actions property, for example
 * [
 *    {
 *      id: 'group1',
 *      actions: [
 *        {
 *          id: 'ok',
 *          name: 'ok',
 *          handler: okHandler
 *        }
 *      ]
 *    },
 *    {
 *      id: 'group2',
 *      actions: [
 *        {
 *          id: 'cancel',
 *          name: 'cancel',
 *          handler: cancelHandler
 *        }
 *      ]
 *    }
 * ]
 *
 * The handler function takes an event as its parameter.
 */
class ActionList extends React.Component {

  render() {
    var groups = this.props.actions || [];
    var children = groups.map(group =>
      <ActionGroup key={group.id} actions={group.actions}></ActionGroup>
    );
    return <div className='action-list'>{children}</div>
  }
}

ActionList.propTypes = {
  actions: PropTypes.array
}

export default ActionList;
