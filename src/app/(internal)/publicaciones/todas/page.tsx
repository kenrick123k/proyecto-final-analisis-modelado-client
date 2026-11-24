import type { Metadata } from 'next';
import { TodasLasPublicacionesView } from '@/modules/publicaciones/presentation/components/todas-las-publicaciones-view';

export const metadata: Metadata = {
  title: 'Todas las publicaciones · Tu Casa',
  description: 'Todas las publicaciones y sus interesados para el equipo de marketing.',
};

export default function TodasLasPublicacionesPage() {
  return <TodasLasPublicacionesView />;
}
