// Default Tailwind-style breakpoints
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export interface Breakpoints {
  [key: string]: number;
}

export const defaultBreakpoints: Breakpoints = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

export type QueryType = `${BreakpointKey}-up` | `${BreakpointKey}-down` | `${BreakpointKey}-only`;

export function getMediaQuery(query: QueryType, breakpoints: Breakpoints = defaultBreakpoints): string | null {
  const [key, type] = query.split('-') as [BreakpointKey, 'up' | 'down' | 'only'];
  const keys = Object.keys(breakpoints) as BreakpointKey[];
  const idx = keys.indexOf(key);
  if (idx === -1) return null;
  const min = breakpoints[key];
  const next = keys[idx + 1] ? breakpoints[keys[idx + 1]] : undefined;
  switch (type) {
    case 'up':
      return `(min-width: ${min}px)`;
    case 'down':
      return `(max-width: ${breakpoints[key]}px)`;
    case 'only':
      if (next !== undefined) {
        return `(min-width: ${min}px) and (max-width: ${next - 1}px)`;
      } else {
        return `(min-width: ${min}px)`;
      }
    default:
      return null;
  }
}
