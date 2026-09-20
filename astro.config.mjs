// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://andashi.org",
  // Statisch, ohne Insel: die Startseite braucht kein JavaScript-Framework.
  // Das einzige Skript auf der Seite laedt das 3D-Modell nach - erst auf Klick.
  build: { inlineStylesheets: "auto" },
});
