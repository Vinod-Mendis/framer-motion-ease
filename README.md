# 🎨 Framer Motion & GSAP Easing Playground

A comprehensive Next.js application for visualizing, comparing, and generating animation code for both **Framer Motion** and **GSAP** easing functions. Built with TypeScript, Tailwind CSS, and shadcn-ui for a premium developer experience.

[![Built with Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.0-38bdf8)](https://tailwindcss.com/)

## ✨ Features

### 🎯 Dual Animation Library Support
- **Framer Motion Playground** - Visualize and test Framer Motion easing functions
- **GSAP Playground** - Explore GSAP easing with the same intuitive interface
- Seamless navigation between both libraries

### 📊 Interactive Visualization
- **Real-time Easing Curves** - SVG-based visualization of easing functions
- **Live Animation Preview** - See your animations in action instantly
- **Custom Cubic Bezier Editor** - Fine-tune your own easing curves
- **Named Easing Presets** - Quick access to all standard easing functions

### 🛠️ Animation Code Generator
- **Visual Controls** - Adjust x, y, scale, opacity, rotate, duration, and delay with sliders
- **Loop & Yoyo Options** - Configure advanced animation behaviors
- **Dual Mode Output** - Generate code for both Framer Motion and GSAP
- **One-Click Copy** - Copy-paste ready code snippets
- **Live Preview** - See your custom animations before generating code

### 🎨 Premium UI/UX
- **Dark Mode Support** - Seamless theme switching with next-themes
- **Glassmorphism Effects** - Modern, polished design
- **Responsive Layout** - Works beautifully on all screen sizes
- **shadcn-ui Components** - Accessible, customizable UI components

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd framer-motion-ease
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📖 Usage Guide

### Framer Motion Playground (`/`)

1. **Select an Easing Function**
   - Choose from preset easings (linear, easeIn, easeOut, etc.)
   - Or select "Custom Cubic Bezier" to define your own

2. **Adjust Animation Parameters**
   - **Duration**: Control animation speed (0.1s - 5s)
   - **Distance**: Set animation travel distance (100px - 600px)
   - **Loop**: Enable infinite animation repetition
   - **Yoyo**: Reverse animation on repeat

3. **Visualize**
   - Watch the easing curve update in real-time
   - See the animation preview box move with your selected easing

4. **Copy Code**
   - Click "Copy Snippet" to get the Framer Motion code

### GSAP Playground (`/gsap`)

Same interface as Framer Motion, but generates GSAP-specific code with proper easing syntax mapping.

### Animation Code Generator

1. **Open the Generator**
   - Click "Open Animation Generator" in the header

2. **Configure Your Animation**
   - Adjust position (x, y)
   - Set scale and opacity
   - Configure rotation
   - Fine-tune timing (duration, delay)
   - Choose easing function
   - Enable loop/yoyo if needed

3. **Toggle Library**
   - Switch between Framer Motion and GSAP to see code differences

4. **Preview & Copy**
   - Watch the live preview update
   - Click "Play Animation" to replay
   - Copy the generated code with one click

## 🏗️ Project Structure

```
framer-motion-ease/
├── app/
│   ├── layout.tsx          # Root layout with theme provider
│   ├── page.tsx            # Framer Motion playground page
│   ├── gsap/
│   │   └── page.tsx        # GSAP playground page
│   └── globals.css         # Global styles and theme variables
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Playground.tsx      # Framer Motion playground component
│   ├── GsapPlayground.tsx  # GSAP playground component
│   ├── EasingGraph.tsx     # SVG easing curve visualization
│   ├── AnimationGeneratorModal.tsx  # Code generator modal
│   ├── AnimationPreview.tsx         # Animation preview component
│   ├── CodeBlock.tsx       # Code display with copy functionality
│   ├── ModeToggle.tsx      # Dark/light theme toggle
│   └── ui/                 # shadcn-ui components
├── utils/
│   └── easing.ts           # Easing utilities and constants
└── public/                 # Static assets
```

## 🛠️ Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn-ui](https://ui.shadcn.com/)
- **Animation Libraries**:
  - [Framer Motion](https://www.framer.com/motion/)
  - [GSAP](https://greensock.com/gsap/)
- **Theme**: [next-themes](https://github.com/pacocoursey/next-themes)
- **Notifications**: [Sonner](https://sonner.emilkowal.ski/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 📦 Key Dependencies

```json
{
  "framer-motion": "^11.x",
  "gsap": "^3.x",
  "@gsap/react": "^2.x",
  "next-themes": "^0.x",
  "sonner": "^1.x",
  "lucide-react": "^0.x"
}
```

## 🎨 Customization

### Theme Colors
Edit `app/globals.css` to customize the color palette:
```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --primary: 240 5.9% 10%;
  /* ... more variables */
}
```

### Adding New Easing Functions
Add to `utils/easing.ts`:
```typescript
export const NAMED_EASINGS = {
  // ... existing easings
  myCustomEasing: [0.25, 0.1, 0.25, 1.0],
};
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Vercel will auto-detect Next.js and deploy

### Build for Production

```bash
npm run build
npm run start
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Vinod Mendis**
- X (Twitter): [@Vinod_Mendis](https://x.com/Vinod_Mendis)

## 🙏 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn-ui](https://ui.shadcn.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/) and [GSAP](https://greensock.com/)

---

**Made with ❤️ for the animation community**
