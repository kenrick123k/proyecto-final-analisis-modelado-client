import type { Metadata } from 'next';
import { AdministrarPublicacionesView } from '@/modules/publicaciones/presentation/components/administrar-publicaciones-view';

export const metadata: Metadata = {
  title: 'Administrar publicaciones · Tu Casa',
  description: 'Gestiona las propiedades de tu sucursal y su publicación en la landing.',
};

export default function AdministrarPublicacionesPage() {
  return <AdministrarPublicacionesView />;
}
