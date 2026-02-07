import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ExternalLink, Plus, Info, MessageCircle } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Projetos.css';

const projects = [
  {
    id: 1,
    title: "Trabalho de Conclusão de Curso (DataWho)",
    description: "Sistema de BI desenvolvido para conclusão da graduação em ADS. Focado em análise de dados para PMEs.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB"],
    image: "/logo datawho.png",
    color: "#2a2d3e",
    isLocal: true, // Ativa o aviso de projeto local
    link: "#contato" 
  },
  {
    id: 2,
    title: "Meu Portfólio Profissional",
    description: "Meu espaço profissional para mostrar projetos, ideias, experiências e um pouco sobre mim.",
    tags: ["React.js", "Bootstrap", "Framer Motion"],
    image: "/portfolio.png",
    color: "#0a0a0c",
    link: "https://meu-portfolio-4oa3.vercel.app"
  },
  {
    id: 3,
    title: "PetMatch",
    description: "Sistema para adoção de animais. Plataforma que conecta abrigos com potenciais adotantes.",
    tags: ["React Native", "Firebase"],
    image: "/PETMACH.png",
    color: "#f36d4a",
    link: "#"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projetos" className="projects-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          {/* Mantendo o display-1 pequeno e elegante */}
          <h1 className="display-1 fs-2 fw-bold main-title">
            <span className="text-gradient">Meus Projetos</span>
          </h1>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-5"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="project-card">
                <div className="project-header" style={{ backgroundColor: project.color }}>
                  <img src={project.image} alt={project.title} className="project-img" />
                </div>

                <div className="project-body">
                  {/* Badge de Status Local */}
                  {project.isLocal && (
                    <div className="local-badge">
                      <Info size={12} /> Desenvolvimento Local
                    </div>
                  )}

                  <h4 className="project-title">{project.title}</h4>
                  <p className="project-desc">{project.description}</p>
                  
                  {/* Alerta específico para o DataWho */}
                  {project.isLocal && (
                    <div className="alert-box-mini">
                      <p>Projeto apresentado academicamente. Atualmente em desenvolvimento local. Para detalhes, entre em contato.</p>
                    </div>
                  )}

                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag-badge">{tag}</span>
                    ))}
                  </div>

                  <div className="project-footer">
                    <a href="#" className="details-link">
                      Detalhes <Plus size={14} />
                    </a>
                    
                    {project.isLocal ? (
                      <a href="#contato" className="btn-access btn-contact">
                        Contato <MessageCircle size={14} />
                      </a>
                    ) : (
                      <a href={project.link} target="_blank" rel="noreferrer" className="btn-access">
                        Acessar <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default ProjectsSection;