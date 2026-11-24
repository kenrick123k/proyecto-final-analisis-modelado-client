import type { Metadata } from 'next';
import { LandingPage } from '@/modules/landing/presentation/components/landing-page';

export const metadata: Metadata = {
  title: 'Tu Casa · Casas y departamentos en Santa Cruz, La Paz y Tarija',
  description:
    'Explora casas, departamentos, oficinas y locales en Santa Cruz, La Paz y Tarija. Precios en bolivianos y contacto directo con la sucursal de cada ciudad.',
};

export default function HomePage() {
  return <LandingPage />;
}
