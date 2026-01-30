import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { ExternalLink, Plus } from 'lucide-react';

// Importe os estilos do Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import '../styles/Projetos.css'; // Vamos criar este arquivo

const projects = [
  {
    id: 1,
    title: "Trabalho de Conclusão de Curso",
    description: "Sistema denominado DataWho desenvolvido para conclusão da graduação em ADS.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB & JWT"],
    image: "/caminho-da-imagem1.jpg",
    color: "#7a92a8", // Cor de fundo do cabeçalho
    link: "#"
  },
  {
    id: 2,
    title: "Meu Portfólio Profissional",
    description: "Meu espaço profissional para mostrar projetos, ideias, experiências e um pouco sobre mim.",
    tags: ["React.js & Bootstrap"],
    image: "/caminho-da-imagem2.jpg",
    color: "#0a0a0c",
    link: "#"
  },
  {
    id: 3,
    title: "PetMatch",
    description: "Sistema para adoção de animais. Plataforma que conecta abrigos com potenciais adotantes.",
    tags: ["React Native"],
    image: "/caminho-da-imagem3.jpg",
    color: "#f36d4a",
    link: "#"
  }
];

const ProjectsSection = () => {
  return (
    <section id="projetos" className="projects-section py-5">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-4 fw-bold main-title">Meus Projetos</h2>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            // Quando a tela for >= 768px (Tablet)
            768: { slidesPerView: 2 },
            // Quando a tela for >= 1024px (Desktop)
            1024: { slidesPerView: 3 },
          }}
          className="pb-5"
        >
          {projects.map((project) => (
            <SwiperSlide key={project.id}>
              <div className="project-card">
                {/* Topo do Card (Imagem/Cor) */}
                <div 
                  className="project-header" 
                  style={{ backgroundColor: project.color }}
                >
                  <img src={project.image} alt={project.title} className="project-img" />
                </div>

                {/* Corpo do Card */}
                <div className="project-body">
                  <h4 className="project-title">{project.title}</h4>
                  <p className="project-desc">{project.description}</p>
                  
                  <div className="project-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag-badge">{tag}</span>
                    ))}
                  </div>

                  <div className="project-footer">
                    <a href="#" className="details-link">
                      Mais detalhes <Plus size={14} />
                    </a>
                    <a href={project.link} className="btn-access">
                      Acessar
                    </a>
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