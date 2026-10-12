// Re-mounts on every navigation, giving each page a gentle fade-in.
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-in">{children}</div>;
}
