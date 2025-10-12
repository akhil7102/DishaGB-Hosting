export function SectionDivider() {
  return (
    <div className="relative h-32 w-full overflow-hidden">
      {/* Smooth gradient transition */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-secondary/20 to-transparent"></div>
      
      {/* Subtle animated line */}
      <div className="absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-green/20 to-transparent transform -translate-y-1/2"></div>
    </div>
  );
}
