import actionTypes from './actionTypes';
import {doFetchOrg, doFetchDepartmentMember} from '../service/api';

export function fetchOrgRequest() {
  return {
    type: actionTypes.FETCH_ORG_REQUEST
  }
}

export function fetchOrgComplete(data) {
  return {
    type: actionTypes.FETCH_ORG_COMPLETE,
    data
  }
}

export function fetchOrgFail(error) {
  return {
    type: actionTypes.FETCH_ORG_FAIL,
    error
  }
}

export function fetchOrg() {
  return dispatch => {
    dispatch(fetchOrgRequest());
    return doFetchOrg()
      .then(data => dispatch(fetchOrgComplete(getOrgFromResponse(data))))
      .catch(error => dispatch(fetchOrgFail(error)));
  }
}

function getOrgFromResponse(response) {
  return response;
}

export function fetchDepartmentMemberRequest(department) {
  return {
    type: actionTypes.FETCH_DEPARTMENT_REQUEST,
    department
  }
}

export function fetchDepartmentMemberComplete(department, members) {
  return {
    type: actionTypes.FETCH_DEPARTMENT_COMPLETE,
    department,
    members
  }
}

export function fetchDepartmentMemberFail(department, error) {
  return {
    type: actionTypes.FETCH_DEPARTMENT_FAIL,
    department,
    error
  }
}

export function fetchDepartmentMember(department) {
  return dispatch => {
    dispatch(fetchDepartmentMemberRequest(department));
    return doFetchDepartmentMember(department)
      .then(data => dispatch(fetchDepartmentMemberComplete(department, getMembersFromResponse(data))))
      .catch(error => dispatch(fetchDepartmentMemberFail(department, error)));
  }
}

function getMembersFromResponse(response) {
  return response;
}

export function addRecipientTo(members) {
  return {
    type: actionTypes.ADD_RECIPIENT_TO,
    members
  }
}

export function addRecipientCc(members) {
  return {
    type: actionTypes.ADD_RECIPIENT_CC,
    members
  }
}

export function addRecipientBcc(members) {
  return {
    type: actionTypes.ADD_RECIPIENT_BCC,
    members
  }
}

export function removeRecipient(membersTo, membersCc, membersBcc) {
  return {
    type: actionTypes.REMOVE_RECIPIENT,
    membersTo,
    membersCc,
    membersBcc
  }
}
