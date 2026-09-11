export const AUTH_ERROR_KEYS = {
  OTP_REQUEST_VALIDATION: 'otpRequestValidation',
  otp_invalid: 'otpInvalid',
  otp_not_found: 'otpNotFound',
  OTP_REQUEST_FAILED: 'otpRequestFailed',
  OTP_VERIFY_FAILED: 'otpVerifyFailed',
  OTP_VERIFY_VALIDATION: 'otpVerifyValidation',
  AUTH_API_NOT_CONFIGURED: 'authApiNotConfigured',
  AUTH_TOKENS_MISSING: 'authTokensMissing',
  AUTH_SERVICE_UNAVAILABLE: 'authServiceUnavailable',
}

export function getAuthErrorKey(error) {
  return AUTH_ERROR_KEYS[error?.code] || 'generic'
}