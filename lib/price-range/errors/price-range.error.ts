import { ErrorCode } from "../types";

/**
 * Custom error class for price range operations
 */
export class PriceRangeError extends Error {
  constructor(
    message: string,
    public code: ErrorCode,
    public context?: Record<string, any>,
    public recoverable: boolean = true
  ) {
    super(message);
    this.name = "PriceRangeError";

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, PriceRangeError);
    }
  }

  /**
   * Create a non-recoverable error
   */
  static createFatal(
    message: string,
    code: ErrorCode,
    context?: Record<string, any>
  ): PriceRangeError {
    return new PriceRangeError(message, code, context, false);
  }

  /**
   * Create a recoverable error with fallback options
   */
  static createRecoverable(
    message: string,
    code: ErrorCode,
    context?: Record<string, any>
  ): PriceRangeError {
    return new PriceRangeError(message, code, context, true);
  }
}
