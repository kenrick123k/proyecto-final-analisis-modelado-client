import type { ReactNode } from 'react';
import { InternalShell } from './internal-shell';

export default function InternalLayout({ children }: { children: ReactNode }) {
  return <InternalShell>{children}</InternalShell>;
}
