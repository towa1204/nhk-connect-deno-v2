type ValidationErrorOptions = {
  message?: string;
  cause?: unknown;
};

export class ValidationError extends Error {
  constructor(options: ValidationErrorOptions) {
    super(options?.message, { cause: options?.cause });
  }
}
