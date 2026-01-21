import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Code2, ShieldCheck, X, Eye, Award, Calendar, FileText } from 'lucide-react';
import ProjectCard from './ProjectCard';
import './vitrine.css';

// --- COMPONENTE DE CARD DE CERTIFICADO ---
// Adicionado 'thumbnail' nas propriedades para suportar imagem de capa
const CertificateCard = ({ title, issuer, date, image, thumbnail }) => {
  const [showImage, setShowImage] = useState(false);

  // Lógica para verificar se o arquivo é PDF
  const isPDF = image?.toLowerCase().endsWith('.pdf');

  return (
    <>
      <motion.div 
        className="project-card d-flex flex-column h-100" 
        whileHover={{ y: -5 }}
      >
        <div className="project-thumbnail" style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#1a1a1a' }}>
          {/* Se tiver thumbnail, mostra ela. Se não tiver e for imagem, mostra a imagem. Se for PDF sem thumbnail, mostra ícone */}
          {thumbnail ? (
            <img src={thumbnail} alt={title} className="project-img" />
          ) : image && !isPDF ? (
            <img src={image} alt={title} className="project-img" />
          ) : (
            <div className="text-center text-white-50">
                <Award size={40} className="mb-2 text-purple-light" />
                <div style={{ fontSize: '0.8rem' }}>PDF</div>
            </div>
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
              style={{ zIndex: 1000000, width: isPDF ? '85%' : 'auto', maxWidth: '90%', maxHeight: '90%' }}
            >
              <button className="modal-close-btn" onClick={() => setShowImage(false)}>
                <X size={20} />
              </button>
              
              {/* Lógica condicional: iframe para PDF ou img para imagem */}
              {isPDF ? (
                <iframe 
                  src={image} 
                  title={title} 
                  style={{ width: '100%', height: '85vh', borderRadius: '15px', border: 'none' }} 
                />
              ) : (
                <img src={image} alt={title} className="img-fluid rounded-4 shadow-lg" style={{ maxHeight: '85vh' }} />
              )}
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
        journey: ` É uma solução simples e acessível de Business Intelligence (BI) para micro e pequenas empresas que ainda não possuem maturidade no uso de dados.

O DataWho permite que o usuário crie seus próprios formulários personalizados por meio de um Form Builder, adaptando a coleta de dados à realidade do seu negócio. Cada formulário gera uma estrutura de dados que é armazenada em tabelas organizadas.

A partir dessas tabelas, o usuário pode selecionar os dados e gerar visualizações gráficas (barras, linhas e pizza).

O sistema foi desenvolvido como uma aplicação web no modelo SaaS (Software as a Service).`

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
    { 
      id: 1, 
      title: "Power BI Analyst", 
      issuer: "DIO.me", 
      date: "2025", 
      image: "/BI.pdf",         
      thumbnail: "/capa_bi.png" 
    },
    { 
      id: 2, 
      title: "Formação UX Designer", 
      issuer: "DIO.me", 
      date: "2024", 
      image: "/UX.pdf",
      thumbnail: "/capa_ux.png"
    },
   { 
      id: 3, 
      title: "Python", 
      issuer: "DIO.me", 
      date: "2024", 
      image: "/python.pdf",
      thumbnail: "/capa_python.png"
    }
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
          {activeTab === 'projects' && myProjects.map(p => (
            <div key={p.id} className="col-lg-4 col-md-6">
              <ProjectCard {...p} />
            </div>
          ))}

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