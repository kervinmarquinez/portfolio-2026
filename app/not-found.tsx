import "./globals.css";

// Global fallback for requests that never reach the [locale] segment
// (e.g. malformed paths outside the middleware matcher). Renders its own
// <html>/<body> because it lives outside any layout.
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body className="bg-paper">
        <main className="min-h-screen flex flex-col items-center justify-center px-6 text-center gap-8">
          <h1 className="font-display font-semibold italic text-4xl sm:text-5xl md:text-6xl leading-[0.95] tracking-tight text-ink max-w-md">
            Lo siento, esta parte aún no está creada.
          </h1>
          <a
            href="/"
            className="font-sans text-sm font-medium border border-ink text-ink px-6 py-2.5 rounded-full hover:bg-ink hover:text-paper transition-colors duration-300"
          >
            Volver al inicio
          </a>
        </main>
      </body>
    </html>
  );
}
