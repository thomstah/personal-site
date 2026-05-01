import { NavDot } from './NavDot';
import { colors } from '@thommyxay/ui';

const DESTINATIONS = [
  { label: 'PORTFOLIO', href: 'https://portfolio.thommyxay.com', color: colors.dots[0] },
  { label: 'GALLERY',   href: 'https://gallery.thommyxay.com',   color: colors.dots[1] },
  { label: 'LINKS',     href: 'https://links.thommyxay.com',     color: colors.dots[2] },
] as const;

// Character fades in at delay=0, name at 0.1, rule at 0.2, dots start at 0.3
const DOT_BASE_DELAY = 0.3;

export function NavDots() {
  return (
    <div
      data-testid="nav-dots"
      style={{ display: 'flex', gap: '32px', alignItems: 'flex-start' }}
    >
      {DESTINATIONS.map((dest, i) => (
        <NavDot
          key={dest.label}
          label={dest.label}
          href={dest.href}
          color={dest.color}
          delay={DOT_BASE_DELAY + i * 0.05}
        />
      ))}
    </div>
  );
}
