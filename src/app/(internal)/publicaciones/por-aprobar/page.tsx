import type { Metadata } from 'next';
import { PorAprobarView } from '@/modules/publicaciones/presentation/components/por-aprobar-view';

export const metadata: Metadata = {
  title: 'Por aprobar · Tu Casa',
  description: 'Solicitudes de publicación pendientes de la sucursal.',
};

export default function PorAprobarPage() {
  return <PorAprobarView />;
}
