import type { Metadata } from 'next';
import { DashboardView } from '@/modules/access-control/presentation/components/dashboard-view';

export const metadata: Metadata = {
  title: 'Panel · Tu Casa',
  description: 'Panel de gestión inmobiliaria de Tu Casa.',
};

export default function DashboardPage() {
  return <DashboardView />;
}
