export default function FormError({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs md:text-sm text-destructive font-light">{children}</p>
  );
}
