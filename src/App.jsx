import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import { Github, Linkedin, Instagram, Laptop, ChevronDown } from 'lucide-react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import PortfolioShowcase from './components/PortfolioShowcase';
import ContactSection from './components/ContactSection'; // 1. IMPORTAÇÃO AQUI

const App = () => {
  const [loading, setLoading] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
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
            <motion.h1 
              className="splash-title"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            >
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
                <motion.a whileHover={{ x: 5 }} className="navbar-brand text-white fw-bold fs-4" href="#">Monique Trindade</motion.a>
                <div className="ms-auto d-none d-lg-flex gap-4">
                  {['Home', 'Sobre', 'Portfólio', 'Contato'].map((item) => (
                    <a key={item} href={`#${item.toLowerCase()}`} className="nav-link-custom">{item}</a>
                  ))}
                </div>
              </div>
            </nav>

            <section id="home" className="container vh-100 d-flex align-items-center">
              <div className="row align-items-center w-100 mt-5">
                <div className="col-lg-7">
                  <motion.div variants={itemVariants}>
                    <div className="badge-ready">✨ Formada em Análise e Desenvolvimento de Sistemas </div>
                    <h1 className="display-1">Desenvolvedora <br /> <span className="text-gradient">Full-Stack Júnior</span></h1>
                    <p className="hero-subtitle">
                      Opa, tudo bem? Me chamo Monique, tenho 21 anos e se a curiosidade sobre mim te trouxe até aqui, vale dizer que sou apaixonada por tecnologia..... mas mais por café. ☕💻
                    </p>
                    <div className="d-flex gap-4 mt-4">
                      {[
                        { icon: <Github size={28} />, link: "https://github.com/Monique-byte", color: "#6c5ce7" },
                        { icon: <Linkedin size={28} />, link: "https://linkedin.com/in/moniquetrindade", color: "#0077b5" },
                        { icon: <Instagram size={28} />, link: "https://instagram.com/trindade_monique", color: "#e4405f" }
                      ].map((soc, i) => (
                        <motion.a 
                          key={i} href={soc.link} target="_blank" rel="noopener noreferrer"
                          whileHover={{ y: -5, color: soc.color, filter: `drop-shadow(0 0 8px ${soc.color})` }}
                          className="social-link"
                        >
                          {soc.icon}
                        </motion.a>
                      ))}
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
                      Mas o que mais me motiva é planejar e executar projetos. Meu maior desafio até agora foi o projeto de TCC, que tive o orgulho de ser aprovada com 80% da nota.
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

            <section id="portfolio">
              <PortfolioShowcase />
            </section>

            {/* 2. ADIÇÃO DA SEÇÃO DE CONTATO AQUI */}
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