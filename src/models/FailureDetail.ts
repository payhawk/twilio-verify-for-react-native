// Copyright Twilio Inc. <open-source@twilio.com> (https://www.twilio.com/docs/verify/push) 2020,2021. All Rights Reserved.
// Node module: twilio-verify-for-react-native
// This file is licensed under the Apache License 2.0.
// License text available at https://github.com/twilio/twilio-verify-for-react-native/blob/main/LICENSE

/**
 * Diagnostic detail attached to a rejected native call, readable as `userInfo` on the rejection.
 *
 * The SDK reports every failure with the same error code, so this exists to answer the one
 * question that code cannot: did Twilio answer and refuse the request, or was Twilio never
 * reached? Exactly one of the two groups below is populated, and which one is the answer.
 *
 * Nothing here carries a request or response body, headers, or credentials. Free-text fields are
 * truncated.
 */
export interface FailureDetail {
  /**
   * HTTP status Twilio replied with. Present only when Twilio answered.
   */
  httpStatus?: number;

  /**
   * Verify API error code, as a string on both platforms — Android reports it as a string and
   * iOS as a number, so it is normalised here rather than in every consumer.
   * Present only when Twilio answered.
   */
  apiErrorCode?: string;

  /**
   * Verify API error message, truncated. Present only when Twilio answered.
   */
  apiErrorMessage?: string;

  /**
   * Identifier of the failure that prevented a response: a fully qualified class name on
   * Android, the Swift type name on iOS. Present only when Twilio was not reached.
   */
  failureClass?: string;

  /**
   * Description of that failure, truncated. May name the Twilio host being contacted.
   * Present only when Twilio was not reached.
   */
  failureMessage?: string;

  /**
   * The nested failures, outermost first, joined by ` < ` — for example
   * `SSLHandshakeException < CertificateException < CertPathValidatorException` on Android, or
   * `NSURLErrorDomain#-1200 < kCFErrorDomainCFNetwork#-9807` on iOS.
   *
   * Each link identifies one underlying error, which is what makes a nested TLS or connection
   * failure visible instead of collapsed into whatever the outermost wrapper happened to be.
   * The link format differs per platform because the platforms identify errors differently; the
   * ordering and separator do not. Capped in depth.
   */
  failureChain?: string;
}
