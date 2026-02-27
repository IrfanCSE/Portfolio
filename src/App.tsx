import { useSiteData } from './hooks/useSiteData';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Blog from './components/Blog';
import Contact from './components/Contact';
import Footer from './components/Footer';

function AppContent() {
  const { data, loading, error } = useSiteData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-[3px] border-surface-200 dark:border-surface-700 border-t-primary-500 rounded-full animate-spin" />
          <p className="text-sm text-surface-500 dark:text-surface-400 font-medium">Loading portfolio…</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-50 dark:bg-surface-950">
        <p className="text-red-500 text-lg">Failed to load site data: {error}</p>
      </div>
    );
  }

  return (
    <>
      <Navbar personal={data.personal} />
      <main>
        <Hero hero={data.hero} personal={data.personal} />
        <About about={data.about} />
        <Experience experience={data.experience} startDate={data.startDate} />
        <Skills skills={data.skills} />
        <Projects projects={data.projects} />
        {data.blog && data.blog.length > 0 && <Blog blog={data.blog} />}
        <Contact contact={data.contact} />
      </main>
      <Footer footer={data.footer} />
    </>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;
