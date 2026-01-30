import {
  isJwtExpired as _isJwtExpired,
  timeUntilJwtExpires as _timeUntilJwtExpires,
} from "../utils/devspace-utils";

export function isJwtExpired(jwt: string): boolean {
  return _isJwtExpired(jwt);
}

export function timeUntilJwtExpires(jwt: string): number {
  return _timeUntilJwtExpires(jwt);
}
