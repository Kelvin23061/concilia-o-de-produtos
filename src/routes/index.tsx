import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import markup from "@/legacy/markup.html?raw";
import appSource from "@/legacy/app.js.txt?raw";
import cssUrl from "@/legacy/conciliacao.css?url";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Conciliação NF-e — Pedido x EAN/DUN" },
      { name: "description", content: "Concilie códigos de barra das notas fiscais (XML) com sua planilha mestre de produtos." },
      { property: "og:title", content: "Conciliação NF-e — Pedido x EAN/DUN" },
      { property: "og:description", content: "Compare XML de NF-e com a base de produtos e trate divergências em segundos." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Manrope:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&display=swap" },
      { rel: "stylesheet", href: cssUrl },
    ],
  }),
  component: Index,
});

function Index() {
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    import("xlsx").then((XLSX) => {
      (window as unknown as { XLSX: unknown }).XLSX = XLSX;
      new Function(appSource)();
    });
  }, []);
  return <div dangerouslySetInnerHTML={{ __html: markup }} />;
}
