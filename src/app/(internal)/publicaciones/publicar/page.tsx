import type { Metadata } from 'next';
import { PublicarEnLandingView } from '@/modules/publicaciones/presentation/components/publicar-en-landing-view';

export const metadata: Metadata = {
  title: 'Publicar en landing · Tu Casa',
  description: 'Pule y publica propiedades aprobadas en la vitrina pública.',
};

export default function PublicarEnLandingPage() {
  return <PublicarEnLandingView />;
}
