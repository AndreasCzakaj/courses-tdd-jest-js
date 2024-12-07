export const CONTENT_TYPE_JSON = "application/json"

export function calcHttpErrorCode(e) {
  if (e instanceof UserError || e instanceof ValidationError) {
    return 400
  }
  return 500
}
