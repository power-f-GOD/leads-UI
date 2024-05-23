/** @type { Record<string, { DEFAULT: string, [key: string]: string }> } */
const colors = {
  'brand-cyan': {}
};

/** @param rgb - number tuple */
const getAlpha = ([r, g, b], i) =>
  `rgba(${r}, ${g}, ${b}, ${i === 0 ? 0.05 : i / 10})`;

for (let i = 0; i <= 10; i++) {
  const alpha = i === 10 ? 'DEFAULT' : i === 0 ? 50 : i * 100;

  colors['brand-cyan'][alpha] = getAlpha([87, 194, 239], i);
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    preflight: false
  },
  // darkMode: 'selector',
  content: ['./src/**/*.{ts,tsx}'],
  theme: { extend: { colors } },
  plugins: []
};
