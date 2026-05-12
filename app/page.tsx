"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { FaLinkedin, FaGithub, FaMoon, FaSun } from "react-icons/fa";

const experiencias = [
  {
    periodo: "Julho 2025 — Novembro 2025",
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
    cargo: "Pesquisador",
    empresa: "PETTEC (UNIFEI) — Itajubá, MG",
    topicos: [
      " Ministrei um curso introdutório de Python para ingressantes da faculdade abordando os conceitos fundamentais, proporcionando uma base sólida para os participantes, além de desenvolverem a lógica e a capacidade de solucionar problemas, resultando na capacitação de 28 alunos. Foi utilizado o ambiente Google Colab",
      "Fiz parte do projeto Balança IoT com LoRa: Monitoramento Remoto de Peso, utilizando sensores e o microcontrolador ESP32, promovendo o desenvolvimento de soluções para monitoramento remoto através da tecnologia IoT.",
    ],
  },
  {
    periodo: "Julho 2022 — Janeiro 2024",
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

export default function Home() {
  const dark = useSyncExternalStore(
    subscribeTheme,
    getPreferredTheme,
    () => false,
  );
  const introText = "Oi! Eu sou o ";
  const nameText = "Enzo";
  const [typedIntro, setTypedIntro] = useState("");
  const [typedName, setTypedName] = useState("");

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
      <div className="fixed right-6 top-6 z-50">
        <button
          type="button"
          onClick={() => setTheme(!dark)}
          aria-label="Alternar modo escuro"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border bg-background/80 text-foreground shadow-sm backdrop-blur-md transition hover:bg-accent"
        >
          {dark ? (
            <FaSun className="h-4 w-4" />
          ) : (
            <FaMoon className="h-4 w-4" />
          )}
        </button>
      </div>

      <section className="relative flex min-h-screen items-center overflow-hidden px-6 pt-6">
        <div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full opacity-30 blur-3xl"
          style={{ background: "var(--gradient-hero)" }}
        />
        <div className="mx-auto w-full max-w-6xl">
          <p className="mb-4 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            Portfólio
          </p>

          <h1 className="text-5xl font-bold leading-tight tracking-tight md:text-7xl">
            <span>{typedIntro}</span>
            <span
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-hero)" }}
            >
              {typedName}
            </span>
            <span className="ml-1 inline-block h-[0.9em] w-[2px] translate-y-[0.0em] bg-foreground align-middle animate-caret-blink" />
          </h1>

          <p className="mt-6 max-w-3xl text-lg text-muted-foreground italic border-l-4 border-yellow-500 pl-4">
            "Sometimes it is the people who no one imagines anything of who do
            the things that no one can imagine."
            <span className="block text-sm mt-2 not-italic text-muted-foreground/80">
              — Alan Turing
            </span>
          </p>

          <div className="mt-10 flex gap-4">
            <button
              onClick={() => {
                const element = document.getElementById("sobre");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background transition hover:opacity-90"
            >
              Conhecer mais
            </button>
            <button
              onClick={() => {
                const element = document.getElementById("experiencias");
                element?.scrollIntoView({ behavior: "smooth" });
              }}
              className="rounded-full border border-border px-6 py-3 text-sm font-medium transition hover:bg-accent"
            >
              Ver experiências
            </button>
          </div>
        </div>
      </section>

      <section id="sobre" className="px-6 py-24">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            01
          </p>
          <h2 className="mb-8 text-4xl font-bold tracking-tight md:text-5xl">
            Sobre mim
          </h2>

          <div className="space-y-10">
            <div className="flex flex-col md:flex-row md:items-start md:gap-8">
              <div className="flex-1 space-y-8">
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Sou formado em{" "}
                  <span className="text-yellow-500 text-foreground font-semibold">
                    Engenharia de Computação na UNIFEI.
                  </span>{" "}
                  Tenho experiência como{" "}
                  <span className="text-yellow-500 text-foreground font-semibold">
                    Desenvolvedor Full Stack
                  </span>{" "}
                  e em automação de processos.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Sou de Guarulhos, descendente de{" "}
                  <span className="text-yellow-500 text-foreground font-semibold">
                    Okinawa, Japão.
                  </span>
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Sou apaixonado por tecnologia e estou sempre buscando aprender
                  novas habilidades e enfrentar desafios.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Atualmente, estou em busca de novas oportunidades no mercado
                  de trabalho.
                </p>
                <div className="flex gap-3 pt-4">
                  <a
                    href="https://www.linkedin.com/in/enzo-yukio-chinen/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border bg-background hover:bg-accent transition"
                    aria-label="LinkedIn"
                  >
                    <FaLinkedin className="h-5 w-5 text-foreground" />
                  </a>
                  <a
                    href="https://github.com/YukioChinen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center h-10 w-10 rounded-full border border-border bg-background hover:bg-accent transition"
                    aria-label="GitHub"
                  >
                    <FaGithub className="h-5 w-5 text-foreground" />
                  </a>
                </div>
              </div>

              <div className="flex-shrink-0 mb-4 md:mb-0 md:ml-6">
                <img
                  src="/profile.jpg"
                  alt="Enzo"
                  className="h-90 w-70 object-cover border border-border rounded-md transform -translate-y-6 md:-translate-y-8 md:self-start"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="experiencias" className="px-6 py-24">
        <div className="mx-auto w-full max-w-7xl">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-muted-foreground">
            02
          </p>
          <h2 className="mb-12 text-4xl font-bold tracking-tight md:text-5xl">
            Minhas experiências
          </h2>

          <ol className="relative border-l border-border">
            {experiencias.map((exp) => (
              <li key={exp.periodo} className="mb-10 ml-6">
                <span
                  className="absolute -left-1.5 mt-2 h-3 w-3 rounded-full"
                  style={{ background: "var(--gradient-hero)" }}
                />
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {exp.periodo}
                </p>
                <h3 className="mt-1 text-xl font-semibold">{exp.cargo}</h3>
                <p className="text-sm text-muted-foreground">{exp.empresa}</p>
                <ul className="mt-3 space-y-2">
                  {exp.topicos.map((topico) => (
                    <li
                      key={topico}
                      className="text-muted-foreground flex items-start gap-3"
                    >
                      <span
                        className="mt-1 h-1.5 w-1.5 rounded-full flex-shrink-0"
                        style={{ background: "var(--gradient-hero)" }}
                      />
                      <span className="text-sm">{topico}</span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="border-t border-border px-6 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Criado por Enzo Yukio Chinen. Todos os
        direitos reservados.
      </footer>
    </main>
  );
}
