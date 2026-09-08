// Debug utility to track FormField usage and catch undefined names
import { useEffect } from 'react';

export const useFormFieldDebug = (componentName: string, fieldName?: string) => {
  useEffect(() => {
    if (!fieldName || fieldName === undefined || fieldName === null) {
      console.error(`[FormField Debug] ${componentName} has undefined/null fieldName:`, fieldName);
      console.trace(); // This will show the stack trace
    }
  }, [componentName, fieldName]);
};

// Wrapper to validate all register calls
export const safeRegister = (register: any, name: string, options?: any) => {
  if (!name || typeof name !== 'string') {
    console.error('safeRegister: Invalid name prop', { name, type: typeof name });
    return {}; // Return empty object to prevent errors
  }
  return register(name, options);
};

export const validateFieldName = (name: any): string | null => {
  if (!name || typeof name !== 'string') {
    console.error('Invalid field name:', { name, type: typeof name });
    return null;
  }
  return name;
};

export default {
  useFormFieldDebug,
  safeRegister,
  validateFieldName,
};