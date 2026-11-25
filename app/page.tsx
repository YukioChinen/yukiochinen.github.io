"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import {
  FaLinkedin,
  FaGithub,
  FaMoon,
  FaSun,
  FaArrowDown,
  FaArrowRight,
} from "react-icons/fa";

const secoes = [
  { id: "sobre", label: "Sobre" },
  { id: "experiencias", label: "Experiências" },
  { id: "contato", label: "Contato" },
];

const fatos = [
  { k: "Formação", v: "Eng. de Computação, UNIFEI" },
  { k: "Atuação", v: "Full Stack & automação" },
  { k: "Base", v: "Guarulhos, SP" },
];

const experiencias = [
  {
    periodo: "Julho 2026 — Atualmente",
    tags: ["JavaScript", "Web", "Full Stack"],
    cargo: "Desenvolvedor Full Stack Junior",
    empresa: "Teck Soluções — São Paulo, SP",
    topicos: [
      "Desenvolvendo soluções usando JavaScript com foco em implementar funcionalidades e melhorias em sistemas web, garantindo a entrega de produtos de alta qualidade.",
      "Atuando na manutenção e evolução de sistemas existentes, identificando e corrigindo bugs, além de otimizar o desempenho e a experiência do usuário.",
    ],
  },
  {
    periodo: "Julho 2025 — Novembro 2025",
    tags: ["Python", "Playwright", "AWS", "Azure", "PostgreSQL"],
    cargo: "Short Job Automation",
    empresa: "BTG Pactual S.A. — São Paulo, SP",
    topicos: [
      "Desenvolvi soluções de automação de processos (RPA) em Python utilizando Playwright para o Banco PAN, automatizando fluxos de extração de dados e interação com sistemas web, reduzindo tarefas manuais e aumentando a eficiência operacional.",
      "Implementei integrações com AWS, Azure e PostgreSQL, garantindo armazenamento e execução automatizada de rotinas.",
      "Realizei manutenção e evolução de rotinas de RPA e automação de processos, garantindo estabilidade e eficiência de fluxos operacionais.",
    ],
  },
  {
    periodo: "Março 2024 — Fevereiro 2025",
    tags: ["Python", "IoT", "ESP32", "LoRa"],
    cargo: "Pesquisador",
    empresa: "PETTEC (UNIFEI) — Itajubá, MG",
    topicos: [
      " Ministrei um curso introdutório de Python para ingressantes da faculdade abordando os conceitos fundamentais, proporcionando uma base sólida para os participantes, além de desenvolverem a lógica e a capacidade de solucionar problemas, resultando na capacitação de 28 alunos. Foi utilizado o ambiente Google Colab",
      "Fiz parte do projeto Balança IoT com LoRa: Monitoramento Remoto de Peso, utilizando sensores e o microcontrolador ESP32, promovendo o desenvolvimento de soluções para monitoramento remoto através da tecnologia IoT.",
    ],
  },
  {
    periodo: "Julho 2022 — Janeiro 2024",
    tags: ["Figma", "UX/UI", "Agile"],
    cargo: "Assessor da Diretoria de Vice-Presidência",
    empresa: "byron.solutions (Empresa Júnior) — Itajubá, MG",
    topicos: [
      "Trabalhei como designer no projeto Clínica Leger, utilizando o Figma e conhecimentos de Design UX/UI para a criação de telas mobile, baseado na metodologia ágil.",
      "Reformulei pesquisas internas, apliquei e organizei processo seletivo e análise de engajamento.",
    ],
  },
];

const themeListeners = new Set<() => void>();

function getPreferredTheme() {
  if (typeof window === "undefined") {
    return false;
  }

  const savedTheme = window.localStorage.getItem("theme");

  if (savedTheme) {
    return savedTheme === "dark";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function subscribeTheme(listener: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const handleStorage = (event: StorageEvent) => {
    if (event.key === "theme") {
      listener();
    }
  };

  const handleMediaChange = () => listener();

  window.addEventListener("storage", handleStorage);
  media.addEventListener("change", handleMediaChange);
  themeListeners.add(listener);

  return () => {
    window.removeEventListener("storage", handleStorage);
    media.removeEventListener("change", handleMediaChange);
    themeListeners.delete(listener);
  };
}

function setTheme(nextDark: boolean) {
  window.localStorage.setItem("theme", nextDark ? "dark" : "light");
  document.documentElement.classList.toggle("dark", nextDark);
  themeListeners.forEach((listener) => listener());
}

function Hl( { children }: { children: React.ReactNode }) {
  return (
  <mark className="rounded bg-[var(--brand-soft)] px-1.5 py-0.5 font-semibold text-foreground">
    {children}
  </mark>
);
}

export default function Home() {
  const dark = useSyncExternalStore(
    subscribeTheme,
    getPreferredTheme,
    () => false,
  );
  const introText = "Oi! Eu sou o ";
  const nameText = "Enzo!";
  const [typedIntro, setTypedIntro] = useState("");
  const [typedName, setTypedName] = useState("");
  const [active, setActive] = useState("");
  const [visao, setVisao] = useState<"cards" | "timeline">("cards");
  const [aberto, setAberto] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    secoes.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  useEffect(() => {
    let introIndex = 0;
    let nameIndex = 0;
    let timeoutId: number | undefined;

    const typeIntro = () => {
      if (introIndex <= introText.length) {
        setTypedIntro(introText.slice(0, introIndex));
        introIndex += 1;
        timeoutId = window.setTimeout(typeIntro, 75);
        return;
      }

      const typeName = () => {
        if (nameIndex <= nameText.length) {
          setTypedName(nameText.slice(0, nameIndex));
          nameIndex += 1;
          timeoutId = window.setTimeout(typeName, 85);
        }
      };

      timeoutId = window.setTimeout(typeName, 150);
    };

    timeoutId = window.setTimeout(typeIntro, 250);

    return () => {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6">
          <a href="#" className="text-sm font-bold tracking-tight">
            enzo<span className="text-[var(--brand)]">.</span>dev
          </a>
          <nav aria-label="Principal" className="flex items-center gap-6">
            <ul className="hidden items-center gap-6 text-sm sm:flex">
              {secoes.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    data-active={active === s.id}
                    className="link-draw py-1 text-muted-foreground transition-colors hover:text-foreground data-[active=true]:text-foreground"
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setTheme(!dark)}
              aria-label="Alternar modo escuro"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition hover:bg-accent"
            >
              {dark ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
            </button>
          </nav>
        </div>
      </header>

      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pb-16 pt-28">
        <div className="grid-bg pointer-events-none absolute inset-0" aria-hidden />
        <div className="relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[1.25fr_1fr]">
          <div className="enter">
            <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Dev Full Stack Junior · Teck Soluções
            </p>

            <h1 className="min-h-[2.4em] text-5xl font-bold leading-[1.1] tracking-tight md:text-7xl">
              <span>{typedIntro}</span>
              <span
                className="bg-clip-text text-transparent"
                style={{ backgroundImage: "var(--gradient-hero)" }}
              >
                {typedName}
              </span>
              <span className="ml-1 inline-block h-[0.85em] w-[3px] bg-[var(--brand)] align-middle animate-caret-blink" />
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
              Engenheiro de Computação · Desenvolvedor Full Stack
            </p>

            <blockquote className="mt-8 max-w-xl border-l-2 border-[var(--brand)] pl-4 text-sm italic leading-relaxed text-muted-foreground">
              “Sometimes it is the people who no one imagines anything of who
              do the things that no one can imagine.”
              <cite className="mt-2 block text-xs not-italic opacity-80">
                — Alan Turing
              </cite>
            </blockquote>

            <div className="mt-10 flex flex-wrap gap-3">
              <a href="#experiencias" className="btn btn-solid">
                Ver experiências <FaArrowDown className="h-3 w-3" />
              </a>
              <a href="#sobre" className="btn btn-ghost">
                Conhecer mais
              </a>
            </div>
          </div>

          <div className="enter justify-self-center md:justify-self-end" style={{ animationDelay: "0.15s" }}>
            <div className="photo-frame relative w-64 sm:w-72 md:w-80">
              <div
                className="absolute -inset-3 translate-x-3 translate-y-3 rounded-2xl"
                style={{ background: "var(--gradient-hero)", opacity: 0.85 }}
                aria-hidden
              />
              <div className="relative overflow-hidden rounded-2xl border border-border bg-card">
                <img
                  src="/profile.jpg"
                  alt="Retrato de Enzo Yukio Chinen"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-card/50 px-6 py-8">
        <dl className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-3">
          {fatos.map((f) => (
            <div key={f.k}>
              <dt className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                {f.k}
              </dt>
              <dd className="mt-1 text-sm font-semibold">{f.v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section id="sobre" className="px-6 py-28">
        <div className="mx-auto grid w-full max-w-6xl gap-12 md:grid-cols-[1fr_1.6fr]">
          <div>
            <p className="mb-3 text-sm text-[var(--brand-ink)]">01 / sobre</p>
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Sobre mim
            </h2>
          </div>
          <div className="space-y-6 text-lg leading-relaxed text-muted-foreground">
            <p>
              Formado em <Hl>Engenharia de Computação na UNIFEI</Hl>. Tenho
              experiência como <Hl>Desenvolvedor Full Stack</Hl> e em automação
              de processos.
            </p>
            <p>
              Nascido em São Paulo, cresci em Guarulhos. Descendente de{" "}
              <Hl>Okinawa, Japão</Hl>.
            </p>
            <p>
              Apaixonado por tecnologia, estou sempre buscando <Hl>aprender</Hl>{" "}
              novas habilidades e enfrentar <Hl>desafios</Hl>.
            </p>
            <p>
              Atualmente atuo como desenvolvedor Full Stack Junior na{" "}
              <Hl>Teck Soluções</Hl>.
            </p>
          </div>
        </div>
      </section>

      <section id="experiencias" className="bg-card/50 px-6 py-28">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-3 text-sm text-[var(--brand-ink)]">02 / trajetória</p>
          <div className="mb-14 flex flex-wrap items-end justify-between gap-6">
            <h2 className="text-4xl font-bold tracking-tight md:text-5xl">
              Minhas experiências
            </h2>
            <div role="tablist" aria-label="Modo de visualização" className="flex rounded-full border border-border bg-background p-1">
              {([["cards", "Cards"], ["timeline", "Linha do tempo"]] as const).map(([id, label]) => (
                <button
                  key={id}
                  role="tab"
                  type="button"
                  aria-selected={visao === id}
                  onClick={() => setVisao(id)}
                  className="min-h-10 rounded-full px-4 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground aria-selected:bg-[var(--brand)] aria-selected:text-[oklch(0.2_0.02_80)]"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {visao === "timeline" ? (
            <>
            <div key="timeline-h" className="enter hidden lg:block">
              <ol className="relative grid grid-cols-4 pt-2">
                <span aria-hidden className="absolute left-0 right-0 top-[calc(3.25rem+0.5rem)] h-0.5 -translate-y-1/2 bg-border" />
                {[...experiencias].map((exp, i) => ({ exp, i })).reverse().map(({ exp, i }) => {
                  const open = aberto === i;
                  return (
                    <li key={exp.periodo} className="relative">
                      <button
                        type="button"
                        aria-expanded={open}
                        onClick={() => setAberto(i)}
                        className="group block w-full pr-4 text-left"
                      >
                        <span className="block h-11 text-xs uppercase tracking-wider text-[var(--brand-ink)]">
                          {exp.periodo.replace(" — ", " →\u00a0")}
                        </span>
                        <span
                          aria-hidden
                          className="relative z-10 block h-4 w-4 rounded-full border-2 border-background transition-transform group-hover:scale-125"
                          style={{ background: open ? "var(--brand)" : "var(--muted-foreground)", transform: open ? "scale(1.3)" : undefined }}
                        />
                        <span className={`mt-5 block text-base font-semibold transition-colors ${open ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>
                          {exp.cargo}
                        </span>
                        <span className="mt-1 block text-xs text-muted-foreground">{exp.empresa}</span>
                      </button>
                    </li>
                  );
                })}
              </ol>
              {aberto >= 0 && (
                <div key={aberto} className="enter card mt-10 p-8">
                  <h3 className="text-xl font-semibold">{experiencias[aberto].cargo}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{experiencias[aberto].empresa}</p>
                  <ul className="mt-4 space-y-2.5">
                    {experiencias[aberto].topicos.map((topico) => (
                      <li key={topico} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gradient-hero)" }} />
                        <span>{topico.trim()}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologias">
                    {experiencias[aberto].tags.map((t) => (
                      <li key={t} className="tag">{t}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <ol key="timeline" className="enter relative ml-3 border-l-2 border-border lg:hidden">
              {experiencias.map((exp, i) => {
                const open = aberto === i;
                return (
                  <li key={exp.periodo} className="relative pb-10 pl-8 last:pb-0 lg:pl-12">
                    <span
                      aria-hidden
                      className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full border-2 border-background transition-transform"
                      style={{ background: open ? "var(--brand)" : "var(--muted-foreground)", transform: open ? "scale(1.25)" : undefined }}
                    />
                    <p className="mb-1 text-xs uppercase tracking-wider text-[var(--brand-ink)] lg:absolute lg:right-[calc(100%+3rem)] lg:top-1.5 lg:mb-0 lg:w-56 lg:text-right">
                      {exp.periodo}
                    </p>
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setAberto(open ? -1 : i)}
                      className="group block w-full text-left"
                    >
                      <h3 className="text-xl font-semibold transition-colors group-hover:text-[var(--brand-ink)]">
                        {exp.cargo}
                        <span className="ml-2 inline-block text-sm text-muted-foreground transition-transform" style={{ transform: open ? "rotate(180deg)" : undefined }}>▾</span>
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">{exp.empresa}</p>
                    </button>
                    <div className="grid transition-[grid-template-rows] duration-300 motion-reduce:transition-none" style={{ gridTemplateRows: open ? "1fr" : "0fr" }}>
                      <div className="overflow-hidden">
                        <ul className="mt-4 space-y-2.5">
                          {exp.topicos.map((topico) => (
                            <li key={topico} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                              <span className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: "var(--gradient-hero)" }} />
                              <span>{topico.trim()}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tecnologias">
                      {exp.tags.map((t) => (
                        <li key={t} className="tag">{t}</li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ol>
            </>
          ) : (
          <ol key="cards" className="enter space-y-5">
            {experiencias.map((exp, i) => (
              <li
                key={exp.periodo}
                className="card grid gap-4 p-6 md:grid-cols-[14rem_1fr] md:gap-10 md:p-8"
              >
                <div>
                  <p className="text-xs uppercase tracking-wider text-[var(--brand-ink)]">
                    {exp.periodo}
                  </p>
                  {i === 0 && (
                    <span className="mt-3 inline-block rounded-full bg-[var(--brand-soft)] px-2.5 py-0.5 text-xs font-semibold">
                      Atual
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{exp.cargo}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{exp.empresa}</p>
                  <ul className="mt-4 space-y-2.5">
                    {exp.topicos.map((topico) => (
                      <li key={topico} className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
                        <span
                          className="mt-[0.5rem] h-1.5 w-1.5 shrink-0 rounded-full"
                          style={{ background: "var(--gradient-hero)" }}
                        />
                        <span>{topico.trim()}</span>
                      </li>
                    ))}
                  </ul>
                  <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tecnologias">
                    {exp.tags.map((t) => (
                      <li key={t} className="tag">{t}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
          )}
        </div>
      </section>

      <section id="contato" className="px-6 py-28">
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-3 text-sm text-[var(--brand-ink)]">03 / contato</p>
          <h2 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            Entre em contato
          </h2>
          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href="https://www.linkedin.com/in/enzo-yukio-chinen/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-solid"
            >
              <FaLinkedin className="h-4 w-4" /> Falar no LinkedIn
              <FaArrowRight className="h-3 w-3" />
            </a>
            <a
              href="https://github.com/YukioChinen"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
            >
              <FaGithub className="h-4 w-4" /> Ver GitHub
            </a>
          </div>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Criado por Enzo Yukio Chinen. Todos os
        direitos reservados.
      </footer>
    </main>
  );
}
