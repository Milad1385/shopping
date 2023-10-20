/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xs: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      container:{
        center :true,
        padding:{
          DEFAULT:'1rem',
          lg:'1rem'
        }
      },
      fontFamily: {
        Dana: "Dana",
        DanaMedium: "Dana Medium",
        DanaDemiBold: "Dana DemiBold",
        MorabbaLight: "Morabba Light",
        MorabbaMedium: "Morabba Medium",
        MorabbaBold: "Morabba Bold",
      },
      boxShadow: {
        normal: "0 1px 10px  rgba(0, 0, 0, 0.05)",
      },

    },
  },
  plugins: [
    function({addVariant}){
      addVariant('child','& > *')
    }
  ],
}

