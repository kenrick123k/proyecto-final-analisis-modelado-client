'use client';

import { useEffect, useState } from 'react';
import type { LandingData } from '../../domain/entities/landing-publicacion';
import { LandingError } from '../../domain/errors/landing.errors';
import { useLanding } from '../context/landing-context';
import { BranchAtlas } from './branch-atlas';
import { BuyerBenefits } from './buyer-benefits';
import { BuyerCallToAction } from './buyer-call-to-action';
import { HowItWorks } from './how-it-works';
import { LandingFooter } from './landing-footer';
import { LandingHeader } from './landing-header';
import { LandingHero } from './landing-hero';
import { PropertiesCatalogue } from './properties-catalogue';

function scrollToVitrina() {
  const target = document.getElementById('vitrina');
  if (!target) {
    return;
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
}

export function LandingPage() {
  const { getData } = useLanding();
  const [data, setData] = useState<LandingData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [branch, setBranch] = useState('TODAS');
  const [operationType, setOperationType] = useState('');

  useEffect(() => {
    let active = true;

    getData
      .execute({
        ...(branch === 'TODAS' ? {} : { sucursalId: branch }),
        ...(operationType ? { tipoOperacionId: operationType } : {}),
      })
      .then((result) => {
        if (active) {
          setData(result);
          setError(null);
        }
      })
      .catch((loadError: unknown) => {
        if (active) {
          setError(
            loadError instanceof LandingError
              ? loadError.message
              : 'No se pudieron cargar las propiedades publicadas.',
          );
        }
      })
      .finally(() => {
        if (active) {
          setIsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [branch, operationType, getData]);

  function handleBranchChange(nextBranch: string) {
    if (nextBranch === branch) {
      return;
    }
    setIsLoading(true);
    setBranch(nextBranch);
  }

  function handleOperationTypeChange(nextType: string) {
    if (nextType === operationType) {
      return;
    }
    setIsLoading(true);
    setOperationType(nextType);
  }

  function handleReset() {
    if (branch === 'TODAS' && operationType === '') {
      return;
    }
    setIsLoading(true);
    setBranch('TODAS');
    setOperationType('');
  }

  function handleAtlasSelect(sucursalId: string) {
    if (sucursalId !== branch) {
      setIsLoading(true);
      setBranch(sucursalId);
    }
    scrollToVitrina();
  }

  return (
    <div className="flex min-h-svh flex-1 flex-col bg-canvas">
      <a
        href="#vitrina"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-field focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        Saltar a las propiedades
      </a>
      <LandingHeader />
      <main className="flex-1">
        <LandingHero publishedCount={data?.publicaciones.length ?? null} />
        <BuyerBenefits />
        <PropertiesCatalogue
          data={data}
          branch={branch}
          operationType={operationType}
          isLoading={isLoading}
          error={error}
          onBranchChange={handleBranchChange}
          onOperationTypeChange={handleOperationTypeChange}
          onReset={handleReset}
        />
        <HowItWorks />
        <BranchAtlas sucursales={data?.sucursales} onSelectBranch={handleAtlasSelect} />
        <BuyerCallToAction />
      </main>
      <LandingFooter />
    </div>
  );
}
