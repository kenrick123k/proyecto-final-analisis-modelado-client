import type { Metadata } from 'next';
import { InteresadosListView } from '@/modules/interesados/presentation/components/interesados-list-view';

export const instant = false;

export const metadata: Metadata = {
  title: 'Interesados · Tu Casa',
  description: 'Personas interesadas en una publicación de Tu Casa.',
};

export default async function InteresadosPage({
  params,
}: {
  params: Promise<{ publicacionId: string }>;
}) {
  const { publicacionId } = await params;
  return <InteresadosListView publicacionId={publicacionId} />;
}
