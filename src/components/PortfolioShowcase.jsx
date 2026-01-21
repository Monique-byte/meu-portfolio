import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Code2, ShieldCheck, X, Eye, Award, Calendar } from 'lucide-react';
import ProjectCard from './ProjectCard';
import './vitrine.css';

// --- COMPONENTE DE CARD DE CERTIFICADO ---
const CertificateCard = ({ title, issuer, date, image }) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      <motion.div 
        className="project-card d-flex flex-column h-100" 
        whileHover={{ y: -5 }}
      >
        <div className="project-thumbnail" style={{ height: '160px' }}>
          {image ? (
            <img src={image} alt={title} className="project-img" />
          ) : (
            <div className="placeholder-overlay">Certificado</div>
          )}
          <div className="card-overlay d-flex align-items-center justify-content-center">
             <button onClick={() => setShowImage(true)} className="btn-live">
                Ver Certificado <Eye size={16} className="ms-2"/>
             </button>
          </div>
        </div>
        
        <div className="p-3 d-flex flex-column flex-grow-1 card-body-glass">
          <div className="d-flex align-items-center gap-2 mb-2 text-purple-light">
             <Award size={16} />
             <span className="fw-bold small text-uppercase" style={{ fontSize: '0.7rem' }}>{issuer}</span>
          </div>
          <h6 className="fw-bold mb-2 text-white" style={{ fontSize: '0.95rem' }}>{title}</h6>
          <div className="mt-auto d-flex align-items-center gap-2 text-white-50" style={{ fontSize: '0.75rem' }}>
             <Calendar size={14} />
             <span>{date}</span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showImage && (
          <div className="modal-fixed-container">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowImage(false)} className="modal-backdrop"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="position-relative"
              style={{ zIndex: 1000000, maxWidth: '90%', maxHeight: '90%' }}
            >
              <button className="modal-close-btn" onClick={() => setShowImage(false)}>
                <X size={20} />
              </button>
              <img src={image} alt={title} className="img-fluid rounded-4 shadow-lg" style={{ maxHeight: '85vh' }} />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

// --- COMPONENTE PRINCIPAL ---
const PortfolioShowcase = () => {
  const [activeTab, setActiveTab] = useState('projects');

  const myProjects = [
    { 
      id: 1, 
      title: "Trabalho de Conclusão de Curso", 
      description: "Sistema denominado DataWho desenvolvido para conclusão da graduação em ADS.", 
      tech: "React.js, Node.js, Express.js, MongoDB & JWT", 
      image: "/logo datawho.png", 
      linkDemo: "https://seu-tcc.vercel.app",
      details: {
        journey: `Possui o intuito em oferecer uma solução simples e acessível de Business Intelligence (BI) para micro e pequenas empresas que ainda não possuem maturidade no uso de dados.

O DataWho permite que o usuário crie seus próprios formulários personalizados por meio de um Form Builder, adaptando a coleta de dados à realidade do seu negócio. Cada formulário gera uma estrutura de dados que é armazenada em tabelas organizadas.

A partir dessas tabelas, o usuário pode selecionar os dados e gerar visualizações gráficas (barras, linhas e pizza). Sistema SaaS completo.`
      }
    },
    { 
      id: 2, 
      title: "Meu Portfólio Profissional", 
      description: "Meu espaço profissional para mostrar projetos, ideias, experiências e um pouco sobre mim.", 
      tech: "React.js & Bootstrap", 
      image: "/portfolio.png",
      linkDemo: "https://monique-trindade.vercel.app",
      details: {
        journey: "Este portfólio foi criado para refletir minha identidade como desenvolvedora: criativa, técnica e detalhista, utilizando tecnologias modernas como Framer Motion.",
      }
    },
    { 
      id: 3, 
      title: "PetMath", 
      description: "Sistema para adoção de animais. Plataforma que conecta abrigos de animais com potenciais adotantes. Incompleto", 
      tech: "React Native", 
      image: "/PETMACH.png",
      details: {
        journey: "Desenvolvimento mobile focado em impacto social, estruturando a conexão entre ONGs e adotantes de forma intuitiva.",
      }
    }
  ];

  // ADICIONE SEUS CERTIFICADOS AQUI
  const myCertificates = [
    { 
      id: 1, 
      title: "UI/UX Design", 
      issuer: "DIO.me", 
      date: "2024", 
      image: "/certificado-ads.png" 
    },
    { 
      id: 2, 
      title: "Full Stack Web Development", 
      issuer: "Udemy / Alura", 
      date: "2023", 
      image: "/certificado-fullstack.png" 
    },
  ];

  const skills = ["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "SCRUM", "KANBAN", "SQL", "MongoDB", "Bootstrap", "React Native", "Python", "Git", "UI/UX ", "JWT"];

  return (
    <section id="portfolio" className="portfolio-section container">
      <div className="text-center mb-5">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          className="display-4 fw-bold main-title"
        >
          Vitrine do Portfólio
        </motion.h2>
        <p className="text-white-50">Conheça meus projetos e especializações.</p>
      </div>

      <div className="tabs-container d-flex justify-content-center gap-3 mb-5 flex-wrap">
        {[
          {id: 'projects', label: 'Projetos', icon: <Code2 size={18}/>}, 
          {id: 'certificates', label: 'Certificados', icon: <ShieldCheck size={18}/>}, 
          {id: 'tech-stack', label: 'Tecnologias', icon: <GraduationCap size={18}/>}
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            style={{ position: 'relative' }}
          >
            <span className="tab-content">{tab.icon} {tab.label}</span>
            {activeTab === tab.id && (
              <motion.div 
                layoutId="activeTab"
                className="active-bg"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.3 }}
          className="row g-4"
        >
          {/* ABA PROJETOS */}
          {activeTab === 'projects' && myProjects.map(p => (
            <div key={p.id} className="col-lg-4 col-md-6">
              <ProjectCard {...p} />
            </div>
          ))}

          {/* ABA TECNOLOGIAS */}
          {activeTab === 'tech-stack' && (
            <div className="col-12 d-flex flex-wrap justify-content-center gap-3">
              {skills.map((s, index) => (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  key={s} 
                  className="tech-tag-large"
                >
                  {s}
                </motion.div>
              ))}
            </div>
          )}

          {/* ABA CERTIFICADOS ATUALIZADA */}
          {activeTab === 'certificates' && myCertificates.map(c => (
            <div key={c.id} className="col-lg-4 col-md-6">
              <CertificateCard {...c} />
            </div>
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
};

export default PortfolioShowcase;