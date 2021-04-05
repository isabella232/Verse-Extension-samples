import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../icons/folder.svg';
import '../../stylesheets/tree-node.less';

class TreeNode extends React.Component {

  render() {
    return (
      <div className='tree-node'>
        <div className='tree-node-icon' onClick={this.props.onTreeIconClick}>
          <Icon/>
        </div>
        <div className='tree-node-name' onClick={this.props.onTreeNodeClick}>
          {this.props.name}
        </div>
      </div>
    );
  }
}

TreeNode.propTypes = {
  name: PropTypes.string,
  onTreeIconClick: PropTypes.func,
  onTreeNodeClick: PropTypes.func
}

export default TreeNode;
