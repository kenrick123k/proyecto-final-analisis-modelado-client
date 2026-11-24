import type { Metadata } from 'next';
import { PublicacionesHubView } from '@/modules/publicaciones/presentation/components/publicaciones-hub-view';

export const metadata: Metadata = {
  title: 'Publicaciones · Tu Casa',
  description: 'Ciclo de publicación de propiedades por sucursal.',
};

export default function PublicacionesPage() {
  return <PublicacionesHubView />;
}
