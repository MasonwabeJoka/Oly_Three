// Patch for react-hook-form substring error
// This file should be imported at the top of your app to patch the issue

declare global {
  interface String {
    safeSubstring(start: number, end?: number): string;
  }
}

if (typeof window !== 'undefined') {
  // Patch String.prototype.substring to handle undefined this
  const originalSubstring = String.prototype.substring;
  String.prototype.substring = function(start: number, end?: number): string {
    if (this == null || this == undefined) {
      console.warn('substring called on null/undefined value in react-hook-form, returning empty string');
      console.trace();
      return '';
    }
    return originalSubstring.call(this, start, end);
  };

  // Also patch charAt which might be used in similar contexts
  const originalCharAt = String.prototype.charAt;
  String.prototype.charAt = function(index: number): string {
    if (this == null || this == undefined) {
      console.warn('charAt called on null/undefined value, returning empty string');
      return '';
    }
    return originalCharAt.call(this, index);
  };

  // Patch indexOf which might also be used
  const originalIndexOf = String.prototype.indexOf;
  String.prototype.indexOf = function(searchString: string, position?: number): number {
    if (this == null || this == undefined) {
      console.warn('indexOf called on null/undefined value, returning -1');
      return -1;
    }
    return originalIndexOf.call(this, searchString, position);
  };
}

export {};