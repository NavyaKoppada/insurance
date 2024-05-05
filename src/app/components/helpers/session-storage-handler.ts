import { Roles } from "../constants/Roles";


export function getAccessStatus(...roles: Roles[]) {
  if (roles.length == 0) return false;
  return roles.reduce(
    (accumulator, currentValue) =>
      accumulator || !!sessionStorage.getItem(currentValue),
    false
  );
}
