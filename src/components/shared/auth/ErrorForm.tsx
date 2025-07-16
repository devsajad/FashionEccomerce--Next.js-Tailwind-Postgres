export default function ErrorForm({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs md:text-sm text-destructive font-light">{children}</p>
  );
}
