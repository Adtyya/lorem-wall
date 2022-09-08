export default function Layout({ children }) {
  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-slate-200 to-slate-300">
      <div className="w-full max-w-5xl mx-auto">{children}</div>
    </div>
  );
}
