import React from 'react';
import {connect} from 'react-redux';
import TreeView from '../components/Tree';
import {fetchDepartmentMember} from '../actions/actions';

function getOrgTreeData(state) {
  return state.org.data;
}

const mapStateToProps = state => {
  return {
    isLoading: state.org.isFetching,
    data: getOrgTreeData(state)
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onTreeNodeSelect: selectedDepartments => dispatch(fetchDepartmentMember(selectedDepartments[0]))
  };
};

var OrgTreeView = connect(mapStateToProps, mapDispatchToProps)(TreeView);

export default OrgTreeView;
