import React from 'react';
import PropTypes from 'prop-types';
import TreeNode from './TreeNode';
import _ from 'lodash';
import '../../stylesheets/tree.less';

class Tree extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      expandedKeys: [],
      selectedKey: null
    };
    this.onTreeNodeIconClick = this.onTreeNodeIconClick.bind(this);
    this.onTreeNodeClick = this.onTreeNodeClick.bind(this);
    this.getClassName = this.getClassName.bind(this);
  }

  onTreeNodeIconClick(node) {
    if(node.children) {
      if(_.indexOf(this.state.expandedKeys, node.id) < 0) {
        this.setState({expandedKeys: _.concat(this.state.expandedKeys, node.id)});
      } else {
        this.setState({expandedKeys: _.filter(this.state.expandedKeys, key => key !== node.id)});
      }
    } else {
        this.onTreeNodeClick(node);
    }
  }

  onTreeNodeClick(node) {
    this.setState({selectedKey: node.id});
    this.props.onTreeNodeSelect(node.id);
  }

  getClassName(node) {
    var classes = [];
    var expandable = !!node.children;

    if(expandable) {
      if(_.indexOf(this.state.expandedKeys, node.id) >= 0) {
        classes.push('expanded');
      } else {
        classes.push('collapsed');
      }
    }

    if(this.state.selectedKey === node.id) {
      classes.push('selected');
    }

    return _.join(classes, ' ');
  }

  createTreeNodes(data) {
    if(!data.children) {

      return (
        <li className={this.getClassName(data)} key={data.id}>
          <TreeNode name={data.name}
            onTreeIconClick={() => this.onTreeNodeIconClick(data)}
            onTreeNodeClick={() => this.onTreeNodeClick(data)}
          ></TreeNode>
        </li>
      );
    } else {
      var children = data.children.map(child => this.createTreeNodes(child));
      return (
        <li className={this.getClassName(data)} key={data.id}>
          <TreeNode name={data.name}
            onTreeIconClick={() => this.onTreeNodeIconClick(data)}
            onTreeNodeClick={() => this.onTreeNodeClick(data)}
          ></TreeNode>
          <ul className='subtree'>
            {children}
          </ul>
        </li>
      );
    }
  }

  render() {
    if(this.props.isLoading) {
      return <div>loading...</div>
    }

    var nodes = this.createTreeNodes(this.props.data);
    return (
      <ul className='tree'>
        {nodes}
      </ul>
    );
  }
}

Tree.propTypes = {
  isLoading: PropTypes.bool,
  data: PropTypes.object.isRequired,
  onTreeNodeSelect: PropTypes.func
}

export default Tree;
