interface IconProps {
  size?: number;
  color?: string;
}

export function BriefcaseIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill={color} shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="2" width="6" height="1"/>
      <rect x="5" y="2" width="1" height="3"/>
      <rect x="10" y="2" width="1" height="3"/>
      <rect x="7" y="3" width="2" height="3"/>
      <rect x="0" y="5" width="16" height="2"/>
      <rect x="0" y="13" width="16" height="2"/>
      <rect x="0" y="5" width="2" height="10"/>
      <rect x="14" y="5" width="2" height="10"/>
      <rect x="2" y="10" width="12" height="1"/>
    </svg>
  );
}

export function GalleryIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill={color} shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      <rect x="1" y="1" width="14" height="2"/>
      <rect x="1" y="13" width="14" height="2"/>
      <rect x="1" y="1" width="2" height="14"/>
      <rect x="13" y="1" width="2" height="14"/>
      <rect x="10" y="4" width="2" height="2"/>
      <rect x="7" y="6" width="2" height="1"/>
      <rect x="6" y="7" width="4" height="1"/>
      <rect x="5" y="8" width="6" height="1"/>
      <rect x="3" y="9" width="10" height="4"/>
    </svg>
  );
}

export function ScrollIcon({ size = 20, color = 'currentColor' }: IconProps) {
  return (
    <svg viewBox="0 0 16 16" width={size} height={size} fill={color} shapeRendering="crispEdges" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="16" height="2"/>
      <rect x="1" y="2" width="14" height="1"/>
      <rect x="2" y="3" width="1" height="10"/>
      <rect x="13" y="3" width="1" height="10"/>
      <rect x="4" y="5" width="8" height="1"/>
      <rect x="4" y="7" width="7" height="1"/>
      <rect x="4" y="9" width="5" height="1"/>
      <rect x="4" y="11" width="6" height="1"/>
      <rect x="1" y="13" width="14" height="1"/>
      <rect x="0" y="14" width="16" height="2"/>
    </svg>
  );
}
