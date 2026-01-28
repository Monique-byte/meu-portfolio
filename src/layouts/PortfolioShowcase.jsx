import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Eye, Award, Calendar, Code2, ShieldCheck, GraduationCap } from 'lucide-react';
import '../styles/vitrine.css';

const ModalPortal = ({ children, isOpen }) => {
  if (typeof document === 'undefined') return null;
  return createPortal(
    <AnimatePresence>
      {isOpen && children}
    </AnimatePresence>,
    document.body
  );
};

const CertificateCard = ({ title, issuer, date, image, thumbnail }) => {
  const [showImage, setShowImage] = useState(false);
  const isPDF = image?.toLowerCase().endsWith('.pdf');

  useEffect(() => {
    document.body.style.overflow = showImage ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [showImage]);

  return (
    <>
      <motion.div className="project-card d-flex flex-column h-100" whileHover={{ y: -5, scale: 1.01 }}>
        <div className="project-thumbnail">
          {thumbnail ? <img src={thumbnail} alt={title} className="project-img" /> : (
            <div className="placeholder-content">
              <Award size={40} className="mb-2 text-purple-light" />
              <div style={{ fontSize: '0.8rem' }}>DOCUMENTO</div>
            </div>
          )}
          <div className="card-overlay">
             <button onClick={() => setShowImage(true)} className="btn-live">
                Ver Certificado <Eye size={16} className="ms-2"/>
             </button>
          </div>
        </div>
        <div className="p-3 d-flex flex-column flex-grow-1 card-body-glass text-start">
          <div className="d-flex align-items-center gap-2 mb-2 text-purple-light">
             <Award size={16} /> 
             <span className="fw-bold small text-uppercase" style={{ fontSize: '0.7rem' }}>{issuer}</span>
          </div>
          <h6 className="fw-bold mb-2 text-white">{title}</h6>
          <div className="mt-auto d-flex align-items-center gap-2 text-white-50" style={{ fontSize: '0.75rem' }}>
             <Calendar size={14} /> <span>{date}</span>
          </div>
        </div>
      </motion.div>

      <ModalPortal isOpen={showImage}>
        <div className="modal-fixed-container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowImage(false)} className="modal-backdrop" />
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="modal-glass-content modal-cert-size">
            <button className="modal-close-btn" onClick={() => setShowImage(false)}><X size={20} /></button>
            {/* Centralização do Certificado */}
            <div className="modal-inner-scroll d-flex align-items-center justify-content-center">
                {isPDF ? (
                <iframe src={image} title={title} className="cert-iframe" />
                ) : (
                <img src={image} alt={title} className="img-fluid rounded-4 shadow-lg modal-main-img" />
                )}
            </div>
          </motion.div>
        </div>
      </ModalPortal>
    </>
  );
};

const ProjectCard = ({ title, description, tech, linkDemo, image, details }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  return (
    <>
      <motion.div className="project-card d-flex flex-column h-100" whileHover={{ y: -8, scale: 1.01 }}>
        <div className="project-thumbnail">
          {image ? (
            <img src={image} alt={title} className="project-img" />
          ) : (
            <div className="placeholder-content">Preview</div>
          )}
          <div className="card-overlay">
             <button onClick={() => setIsOpen(true)} className="btn-live">Ver Detalhes</button>
          </div>
        </div>
        <div className="p-3 d-flex flex-column flex-grow-1 card-body-glass text-start">
          <h4 className="fw-bold mb-1 title-gradient">{title}</h4>
          <p className="text-white-50 small mb-3">{description}</p>
          <div className="mt-auto">
            <span className="badge tech-badge mb-3 d-inline-block">{tech}</span>
            <div className="d-flex justify-content-between align-items-center mt-2">
              <button onClick={() => setIsOpen(true)} className="btn btn-sm text-white-50 p-0 btn-details">Mais detalhes +</button>
              {linkDemo && (
                <a href={linkDemo} target="_blank" rel="noreferrer" className="btn-live-sm text-decoration-none">Acessar</a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      <ModalPortal isOpen={isOpen}>
        <div className="modal-fixed-container">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsOpen(false)} className="modal-backdrop" />
          <motion.div initial={{ opacity: 0, scale: 0.9, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 50 }} className="modal-glass-content">
            <button className="modal-close-btn" onClick={() => setIsOpen(false)}><X size={20} /></button>
            <div className="modal-inner-scroll">
              {/* Ajustado para align-items-center para centralizar verticalmente imagem e texto */}
              <div className="row g-4 align-items-center justify-content-center">
                <div className="col-lg-5 text-center">
                  <img src={image} alt={title} className="modal-main-img shadow-lg" />
                  <div className="mt-3 d-flex flex-wrap justify-content-center gap-2">
                    <span className="badge tech-badge">{tech}</span>
                  </div>
                  {linkDemo && (
                    <a href={linkDemo} target="_blank" rel="noreferrer" className="btn-live w-100 mt-4 text-center text-decoration-none d-block">
                        Acessar Projeto <ExternalLink size={14} className="ms-1" />
                    </a>
                  )}
                </div>
                <div className="col-lg-7 text-start">
                  <h2 className="fw-bold title-gradient mb-3">{title}</h2>
                  <div className="story-section">
                    <div className="d-flex align-items-center gap-2 mb-2 text-purple-light">
                      <span className="fw-bold small text-uppercase">Sobre o Projeto</span>
                    </div>
                    <p className="modal-text-description m-0">{details?.journey}</p>
                  </div>  
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </ModalPortal>
    </>
  );
};

const PortfolioShowcase = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const myProjects = [
    { 
      id: 1, 
      title: "Trabalho de Conclusão de Curso", 
      description: "Sistema denominado DataWho desenvolvido para conclusão da graduação em ADS.", 
      tech: "React.js, Node.js, Express.js, MongoDB & JWT", 
      image: "/logo datawho.png", 
      linkDemo: "https://github.com/Monique-byte",
      details: {
        journey: ` É uma solução simples e acessível de Business Intelligence (BI) para micro e pequenas empresas que ainda não possuem maturidade no uso de dados.\n\nO DataWho permite que o usuário crie seus próprios formulários personalizados por meio de um Form Builder, adaptando a coleta de dados à realidade do seu negócio. Cada formulário gera uma estrutura de dados que é armazenada em tabelas organizadas.\n\nA partir dessas tabelas, o usuário pode selecionar os dados e gerar visualizações gráficas (barras, linhas e pizza).\n\nO sistema foi desenvolvido como uma aplicação web no modelo SaaS (Software as a Service).`
      }
    },
    { 
      id: 2, 
      title: "Meu Portfólio Profissional", 
      description: "Meu espaço profissional para mostrar projetos, ideias, experiências e um pouco sobre mim.", 
      tech: "React.js & Bootstrap", 
      image: "/portfolio.png",
      linkDemo: "https://meu-portfolio-4oa3.vercel.app",
      details: {
        journey: "Este portfólio foi criado para refletir minha identidade como desenvolvedora, reunindo não só projetos, mas também minha evolução, aprendizados e a forma como gosto de transformar ideias em soluções reais. Cada detalhe foi pensado para mostrar quem eu sou, como penso e como encaro desafios dentro da tecnologia.",
      }
    },
    { 
      id: 3, 
      title: "PetMath", 
      description: "Sistema para adoção de animais. Plataforma que conecta abrigos de animais com potenciais adotantes. Incompleto", 
      tech: "React Native", 
      image: "/PETMACH.png",
      details: {
        journey: `O PetMath é um aplicativo móvel que conecta abrigos de animais a potenciais adotantes. O sistema permite que os usuários naveguem por perfis de animais disponíveis para adoção, visualizem fotos, informações e histórico de saúde, e entrem em contato diretamente com os abrigos para iniciar o processo de adoção. O objetivo do PetMath é facilitar a adoção responsável, promovendo o bem-estar animal e ajudando a encontrar lares amorosos para pets necessitados.`
      }
    }
  ];

  const myCertificates = [
    { id: 1, title: "Power BI Analyst", issuer: "DIO.me", date: "2025", image: "/BI.pdf", thumbnail: "/capa_bi.png" },
    { id: 2, title: "Formação UX Designer", issuer: "DIO.me", date: "2024", image: "/UX.pdf", thumbnail: "/capa_ux.png" },
    { id: 3, title: "Python", issuer: "DIO.me", date: "2024", image: "/python.pdf", thumbnail: "/capa_python.png" }
  ];

  const skills = ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "SCRUM", "KANBAN", "SQL", "MongoDB", "Bootstrap", "React Native", "Python", "Git", "UI/UX", "JWT"];

  return (
    <section id="portfolio" className="portfolio-section container">
      <div className="text-center mb-5">
        <motion.h2 initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} className="display-4 fw-bold main-title">Vitrine do Portfólio</motion.h2>
        <p className="text-white-50">Conheça meus projetos e especializações.</p>
      </div>

      <div className="tabs-container d-flex justify-content-center gap-2 mb-5 flex-wrap">
        {[
          {id: 'projects', label: 'Projetos', icon: <Code2 size={18}/>}, 
          {id: 'certificates', label: 'Certificados', icon: <ShieldCheck size={18}/>}, 
          {id: 'tech-stack', label: 'Tecnologias', icon: <GraduationCap size={18}/>}
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`tab-button ${activeTab === tab.id ? 'active' : ''}`} style={{ position: 'relative' }}>
            <span style={{ position: 'relative', zIndex: 2 }}>{tab.icon} <span className="d-none d-sm-inline ms-1">{tab.label}</span></span>
            {activeTab === tab.id && (
              <motion.div layoutId="activeTab" className="active-bg" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
            )}
          </button>
        ))}
      </div>

      <div className="row g-4">
        <AnimatePresence mode="wait">
          {activeTab === 'projects' && myProjects.map(p => (
            <motion.div key={p.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="col-lg-4 col-md-6">
              <ProjectCard {...p} />
            </motion.div>
          ))}
          
          {activeTab === 'certificates' && myCertificates.map(c => (
            <motion.div key={c.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} className="col-lg-4 col-md-6">
              <CertificateCard {...c} />
            </motion.div>
          ))}

          {activeTab === 'tech-stack' && (
            <motion.div key="tech" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="col-12 d-flex flex-wrap justify-content-center gap-3">
              {skills.map((s, idx) => (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: idx * 0.03 }} key={s} className="tech-tag-large">{s}</motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default PortfolioShowcase;