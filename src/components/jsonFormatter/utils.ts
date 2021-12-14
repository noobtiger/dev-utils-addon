export function isValueString(value: unknown): value is string {
  return typeof value === 'string';
}

export function isValueObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object';
}

export function isValueArray(value: unknown): value is Array<unknown> {
  return Array.isArray(value);
}