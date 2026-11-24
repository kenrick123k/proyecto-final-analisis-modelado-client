import type { Metadata } from 'next';
import { SolicitarPublicacionView } from '@/modules/publicaciones/presentation/components/solicitar-publicacion-view';

export const metadata: Metadata = {
  title: 'Solicitar publicación · Tu Casa',
  description: 'Registra una propiedad para que el gerente de tu sucursal la apruebe.',
};

export default function SolicitarPublicacionPage() {
  return <SolicitarPublicacionView />;
}
