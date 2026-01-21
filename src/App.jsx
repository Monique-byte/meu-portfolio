
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Laptop, ChevronDown } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import PortfolioShowcase from './components/PortfolioShowcase';
import ContactSection from './components/ContactSection';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Definição clara das seções para evitar erros de digitação
  const navItems = [
    { label: 'Home', id: 'home' },
    { label: 'Sobre', id: 'about' },
    { label: 'Vitrine', id: 'vitrine' },
    { label: 'Contato', id: 'contato' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      // Efeito de transparência da Navbar
      setScrolled(window.scrollY > 50);

      // --- Lógica de Scroll Spy ---
      const scrollPosition = window.scrollY + (window.innerHeight / 3);
      
      // Verifica se o usuário chegou ao fim da página
      const isAtBottom = (window.innerHeight + window.scrollY) >= document.documentElement.scrollHeight - 50;

      if (isAtBottom) {
        setActiveSection('contato');
      } else {
        navItems.forEach((item) => {
          const element = document.getElementById(item.id);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(item.id);
            }
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="main-layout">
      {!loading && <motion.div className="progress-bar" style={{ scaleX }} />}

      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="splash"
            className="splash-wrapper"
            exit={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            <motion.div 
              animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <Laptop size={70} color="#6c5ce7" />
            </motion.div>
            <motion.h1 className="splash-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              Bem-Vindo ao meu <span>Portfólio </span>
            </motion.h1>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <button className="btn-main-large" onClick={() => setLoading(false)}>EXPLORAR AGORA</button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div key="content" initial="hidden" animate="visible" variants={containerVariants}>
            
            <nav className={`navbar navbar-expand-lg fixed-top transition-all ${scrolled ? 'custom-nav-scrolled' : 'custom-nav'}`}>
              <div className="container">
                <motion.a whileHover={{ x: 5 }} className="navbar-brand text-white fw-bold fs-4" href="#home">Monique Trindade</motion.a>
                <div className="ms-auto d-none d-lg-flex gap-4">
                  {navItems.map((item) => (
                    <a 
                      key={item.id} 
                      href={`#${item.id}`} 
                      className={`nav-link-custom ${activeSection === item.id ? 'active' : ''}`}
                    >
                      {item.label}
                    </a>
                  ))}
                </div>
              </div>
            </nav>

            {/* SEÇÃO HOME */}
            <section id="home" className="container vh-100 d-flex align-items-center">
              <div className="row align-items-center w-100 mt-5">
                <div className="col-lg-7">
                  <motion.div variants={itemVariants}>
                    <div className="badge-ready">✨ Formada em Análise e Desenvolvimento de Sistemas </div>
                    <h1 className="display-1">Desenvolvedora <br /> <span className="text-gradient">Full-Stack Júnior</span></h1>
                    <p className="hero-subtitle">
                      Opa, tudo bem? Me chamo Monique, tenho 21 anos e se a curiosidade sobre mim te trouxe até aqui, vale dizer que sou apaixonada por tecnologia... mas mais por café. ☕💻
                    </p>
                    <div className="d-flex gap-4 mt-4">
                      <motion.a 
                        href="https://github.com/Monique-byte" target="_blank" rel="noopener noreferrer"
                        whileHover={{ y: -5, color: "#6c5ce7" }} className="social-link"
                      >
                        <Github size={28} />
                      </motion.a>
                      <motion.a 
                        href="https://linkedin.com/in/moniquetrindade" target="_blank" rel="noopener noreferrer"
                        whileHover={{ y: -5, color: "#0077b5" }} className="social-link"
                      >
                        <Linkedin size={28} />
                      </motion.a>
                    </div>
                  </motion.div>
                </div>
                <div className="col-lg-5 d-none d-lg-block">
                  <motion.div
                    animate={{ y: [0, -25, 0], rotate: [0, 2, -2, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <img src="https://cdni.iconscout.com/illustration/premium/thumb/web-development-4439162-3726916.png" className="img-fluid floating-img" alt="hero" />
                  </motion.div>
                </div>
              </div>
              <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity }} className="scroll-indicator">
                <ChevronDown />
              </motion.div>
            </section>
            
            {/* SEÇÃO SOBRE (ID: about) */}
            <section id="about" className="container py-80">
              <div className="row align-items-center">
                <div className="col-lg-3 col-md-12 text-center mb-5 mb-lg-0">
                  <motion.div whileInView={{ scale: [0.9, 1], opacity: [0, 1] }} viewport={{ once: true }}>
                    <div className="photo-container">
                      <img src="/eu.jpeg" alt="Monique Trindade" className="about-photo-round" />
                      <div className="photo-glow"></div>
                    </div>
                  </motion.div>
                </div>
                <div className="col-lg-4 col-md-12 mb-5 mb-lg-0">
                  <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                    <h2 className="display-5 fw-bold mb-4">Sobre Mim</h2>
                    <p className="about-text">
                      Do front ao back, gosto de codar em todas as etapas. Curto tanto planejar interfaces com foco em UI/UX design quanto estruturar sistemas organizados, sempre mantendo uma lógica sólida por trás do código.
                    </p>
                  </motion.div>
                </div>
                <div className="col-lg-5 col-md-12">
                   <div className="row g-3">
                      {[
                        { name: "Boa Comunicação", icon: "💬" },
                        { name: "Proatividade", icon: "💡" },
                        { name: "Trabalho em Equipe", icon: "🤝" },
                        { name: "Adaptabilidade", icon: "🚀" },
                        { name: "Facilidade de aprendizagem", icon: "🧠" },
                        { name: "Organização e Responsabilidade", icon: "⏱️" }
                      ].map((skill, index) => (
                        <div key={index} className="col-6">
                          <motion.div 
                            className="soft-skill-card" 
                            whileHover={{ y: -5, borderColor: '#6c5ce7', backgroundColor: 'rgba(108, 92, 231, 0.1)' }}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <span className="fs-5 mb-1 d-block">{skill.icon}</span>
                            <span className="skill-name-small">{skill.name}</span>
                          </motion.div>
                        </div>
                      ))}
                    </div>
                </div>
              </div>
            </section>

            {/* SEÇÃO VITRINE */}
            <section id="vitrine">
              <PortfolioShowcase />
            </section>

            {/* SEÇÃO CONTATO */}
            <section id="contato">
              <ContactSection />
            </section>

            <footer className="footer-glass text-center py-5">
              <p className="m-0 opacity-75 small">&copy; {new Date().getFullYear()} Monique Trindade • Desenvolvido com carinho em React</p>
            </footer>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;