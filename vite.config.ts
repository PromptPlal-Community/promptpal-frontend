
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
// import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), // Tailwind's Vite plugin
    react(),       // React plugin
  ],

  resolve: {
    alias: {
    //   "@components": path.resolve(__dirname, "src/components"),
    //   "@hooks": path.resolve(__dirname, "src/hooks"),
    //   "@lib": path.resolve(__dirname, "src/lib"),
    //   "@providers": path.resolve(__dirname, "src/providers"),
     },
  },
})




