# FootyMetrics

FootyMetrics is a Next.js app for exploring one-season football player statistics with a clean, dark-mode UI. It features autocomplete search, detailed player cards, a responsive stats table, and an interactive radar chart—all powered by Supabase.

## Technologies & Tools
- Next.js (App Router & Server Components)  
- React & TypeScript  
- Tailwind CSS for utility-first styling  
- shadcn-UI component library  
- Headless UI Combobox for searchable dropdowns  
- React Query for data fetching and caching  
- Supabase (Postgres) as the backend 
- Sportmonks API for the data
- Recharts for radar chart visualization  
- ESLint & Prettier for code quality and formatting  

## Features
- Autocomplete search to look up players by name  
- PlayerCard with photo, team logo, basic info, and career stats  
- Dark-mode-friendly design with shadows, rounded containers, and responsive grids  
- General stats table that collapses into a mobile-friendly layout  
- Performance Radar chart showing per-90 metrics vs. positional maxima  

## Getting Started
1. **Clone the repo**  
git clone https://github.com/ecuzmici/footymetrics.git

cd footymetrics

2. **Install dependencies**  
npm install


3. **Configure Supabase**  
- Create a `.env.local` file with your `NEXT_PUBLIC_SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY`.  
- Run migrations or import the provided SQL to set up tables and aggregates.  

4. **Run the dev server**  
npm run dev


## Folder Structure
- `/app` – Next.js pages & layouts  
- `/components` – shadcn-UI wrappers: PlayerAutocomplete, PlayerCard, StatsRadar  
- `/utils` – constants, API helpers, string formatters  
- `/lib` – Supabase client instantiation 
