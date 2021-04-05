import 'whatwg-fetch';

export function doFetchOrg() {
  return fetch('/api/org').then(response => response.json());
}

export function doFetchDepartmentMember(department) {
  return fetch('/api/department/' + department).then(response => response.json());
}
