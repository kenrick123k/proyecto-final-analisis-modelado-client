'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import type { AuthenticatedUser } from '@/modules/access-control/domain/entities/authenticated-user';
import { AuthError } from '@/modules/access-control/domain/errors/auth.errors';
import { useAccessControl } from '@/modules/access-control/presentation/context/access-control-context';
import { ROLES } from '@/shared/application/constants/roles';
import { Logo } from '@/shared/presentation/brand/logo';
import { Button } from '@/shared/presentation/ui/button';
import { cn } from '@/shared/presentation/utils/cn';

interface NavItem {
  readonly href: string;
  readonly label: string;
}

interface NavSection {
  readonly title: string;
  readonly items: NavItem[];
}

function buildSections(roleName: string | undefined): NavSection[] {
  const publicationItems: NavItem[] = [{ href: '/publicaciones', label: 'Publicaciones' }];

  if (roleName === ROLES.AGENTE_CAPTACION) {
    publicationItems.push({ href: '/publicaciones/solicitar', label: 'Solicitar publicación' });
  }

  if (roleName === ROLES.GERENTE_SUCURSAL) {
    publicationItems.push(
      { href: '/publicaciones/por-aprobar', label: 'Por aprobar' },
      { href: '/publicaciones/administrar', label: 'Administrar' },
    );
  }

  if (roleName === ROLES.PUBLICADOR_MARKETING) {
    publicationItems.push(
      { href: '/publicaciones/todas', label: 'Todas las publicaciones' },
      { href: '/publicaciones/publicar', label: 'Publicar en landing' },
    );
  }

  return [
    { title: 'General', items: [{ href: '/dashboard', label: 'Panel' }] },
    { title: 'Gestión', items: publicationItems },
    { title: 'Sitio', items: [{ href: '/', label: 'Vitrina pública' }] },
  ];
}

function isActive(pathname: string, href: string): boolean {
  if (href === '/' || href === '/dashboard' || href === '/publicaciones') {
    return pathname === href;
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

function SidebarContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();
  const { currentUser, logout } = useAccessControl();
  const router = useRouter();
  const [user, setUser] = useState<AuthenticatedUser | null>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    currentUser
      .execute()
      .then((result) => {
        if (active) {
          setUser(result);
        }
      })
      .catch((sessionError: unknown) => {
        if (!active) {
          return;
        }
        if (sessionError instanceof AuthError && sessionError.code === 'UNAUTHORIZED') {
          router.replace('/login');
          return;
        }
        setError('No se pudo cargar tu sesión.');
      });

    return () => {
      active = false;
    };
  }, [currentUser, router]);

  async function handleLogout() {
    if (isLoggingOut) {
      return;
    }

    setIsLoggingOut(true);
    setError(null);

    try {
      await logout.execute();
    } catch {
      setError('No se pudo cerrar la sesión.');
      setIsLoggingOut(false);
      return;
    }

    window.location.replace('/login');
  }

  const sections = buildSections(user?.rol.nombre);

  return (
    <div className="flex h-full flex-col">
      <div className="px-6 pb-5 pt-6">
        <Link href="/dashboard" onClick={onNavigate} aria-label="Ir al panel">
          <Logo />
        </Link>
      </div>

      <nav aria-label="Navegación principal" className="flex-1 overflow-y-auto px-3 pb-6">
        {sections.map((section) => (
          <div key={section.title} className="mt-6 first:mt-0">
            <p className="px-3 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-faint">
              {section.title}
            </p>
            <ul className="mt-2 space-y-1">
              {section.items.map((item) => {
                const active = isActive(pathname, item.href);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'flex min-h-11 items-center rounded-field px-3 text-sm font-medium transition-colors',
                        active
                          ? 'bg-primary-soft text-primary'
                          : 'text-ink-soft hover:bg-canvas hover:text-ink',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      <div className="border-t border-line p-4">
        {user ? (
          <div className="rounded-field bg-canvas px-3 py-2.5">
            <p className="truncate text-sm font-medium text-ink">{user.nombreCompleto}</p>
            <p className="mt-0.5 truncate text-xs text-ink-faint">{user.rol.nombre}</p>
          </div>
        ) : (
          <div className="animate-pulse rounded-field bg-canvas px-3 py-2.5">
            <div className="h-4 w-2/3 rounded bg-line" />
            <div className="mt-2 h-3 w-1/2 rounded bg-line/60" />
          </div>
        )}

        {error ? (
          <p role="alert" className="mt-3 text-xs leading-relaxed text-danger">
            {error}
          </p>
        ) : null}

        <Button
          variant="outline"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="mt-3 w-full px-4 py-2.5"
        >
          {isLoggingOut ? 'Saliendo…' : 'Cerrar sesión'}
        </Button>
      </div>
    </div>
  );
}

export function InternalShell({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    closeButtonRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        setIsMenuOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isMenuOpen]);

  return (
    <div className="min-h-svh bg-canvas">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-line bg-surface lg:block">
        <SidebarContent />
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-line bg-surface/95 px-4 backdrop-blur lg:hidden">
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Abrir menú de navegación"
            aria-expanded={isMenuOpen}
            className="inline-flex h-11 w-11 items-center justify-center rounded-field border border-line text-ink-soft"
          >
            <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            </svg>
          </button>
          <Link href="/dashboard" aria-label="Ir al panel">
            <Logo />
          </Link>
          <Link href="/" className="text-sm text-ink-soft transition-colors hover:text-primary">
            Sitio
          </Link>
        </header>

        <div className="min-h-svh">{children}</div>
      </div>

      {isMenuOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            tabIndex={-1}
            aria-hidden="true"
            onClick={() => setIsMenuOpen(false)}
            className="absolute inset-0 bg-ink/40"
          />
          <aside
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="absolute inset-y-0 left-0 flex w-80 max-w-[85vw] flex-col bg-surface shadow-[0_0_40px_rgba(24,35,29,0.18)]"
          >
            <div className="flex justify-end px-3 pt-3">
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setIsMenuOpen(false)}
                aria-label="Cerrar menú de navegación"
                className="inline-flex h-11 w-11 items-center justify-center rounded-field text-ink-soft hover:text-ink"
              >
                <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                  <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            <div className="min-h-0 flex-1">
              <SidebarContent onNavigate={() => setIsMenuOpen(false)} />
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}
