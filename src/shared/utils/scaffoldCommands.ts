export const SCAFFOLD_COMMANDS: Record<string, (projectName: string, pm: string) => string> = {
  // Web Frontend
  'Next.js': (name, pm) => `npx create-next-app@latest "${name}" && cd "${name}"`,
  Nuxt: (name, pm) => `npx nuxi@latest init "${name}" && cd "${name}"`,
  Svelte: (name, pm) => `npm create svelte@latest "${name}" && cd "${name}"`,
  Solid: (name, pm) => `npx degit solidjs/templates/js "${name}" && cd "${name}"`,
  Astro: (name, pm) => `npm create astro@latest "${name}" && cd "${name}"`,
  'TanStack Router': (name, pm) => `npx create-tsrouter-app@latest "${name}" && cd "${name}"`,
  'TanStack Start': (name, pm) => `npx create-tsrouter-app@latest "${name}" --template start && cd "${name}"`,
  'React Router': (name, pm) => `npx create-react-router@latest "${name}" && cd "${name}"`,
  React: (name, pm) => `npm create vite@latest "${name}" -- --template react-ts && cd "${name}"`,

  // Mobile Frontend
  'Expo Bare': (name, pm) => `npx create-expo-app@latest "${name}"`,
  'Expo + Uniwind': (name, pm) => `npx create-expo-app@latest "${name}"`,
  'Expo + Unistyles': (name, pm) => `npx create-expo-app@latest "${name}"`,

  // Backend
  Express: (name, pm) => `mkdir "${name}" && cd "${name}" && ${pm} init -y`,
  Fastify: (name, pm) => `npm create fastify@latest "${name}"`,
  Hono: (name, pm) => `npm create hono@latest "${name}"`,
  Elysia: (name, pm) => `bun create elysia "${name}"`,
  Convex: (name, pm) => `npm create convex@latest "${name}"`,
};

export const SCAFOOLD_CATEGORIES = ['web-frontend', 'mobile-frontend', 'backend'];
