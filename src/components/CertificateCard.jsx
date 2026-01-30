import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Award, Calendar, Eye, FileText } from 'lucide-react';

// Adicionei 'thumbnail' às propriedades
const CertificateCard = ({ title, issuer, date, image, thumbnail }) => {
  const [showModal, setShowModal] = useState(false);

  // Verifica se o arquivo principal é PDF
  const isPDF = image?.toLowerCase().endsWith('.pdf');

  const displayThumbnail = thumbnail || (!isPDF ? image : null);

  return (
    <>
      <motion.div 
        className="project-card d-flex flex-column h-100" 
        whileHover={{ y: -5 }}
      >
        <div className="project-thumbnail" style={{ height: '160px', background: '#1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          {displayThumbnail ? (
            /* Imagem de fundo do card (Thumbnail) */
            <img src={displayThumbnail} alt={title} className="project-img" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            /* Caso seja PDF e não tenha thumbnail, mostra um ícone */
            <div className="text-center">
              <FileText size={48} className="text-purple-light mb-2" />
              <p className="small text-white-50">Documento PDF</p>
            </div>
          )}
          
          <div className="card-overlay d-flex align-items-center justify-content-center">
             <button onClick={() => setShowModal(true)} className="btn-live">
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
        {showModal && (
          <div className="modal-fixed-container">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)} className="modal-backdrop"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="position-relative"
              style={{ 
                zIndex: 1000000, 
                width: isPDF ? '85%' : 'auto', 
                maxWidth: '1000px', 
                maxHeight: '90vh' 
              }}
            >
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                <X size={20} />
              </button>

              {isPDF ? (
                /* Se o arquivo original for PDF, abre no iframe */
                <iframe 
                  src={image} 
                  title={title} 
                  style={{ width: '100%', height: '85vh', borderRadius: '15px', border: 'none' }}
                />
              ) : (
                /* Se for imagem, abre a imagem normal */
                <img 
                  src={image} 
                  alt={title} 
                  className="img-fluid rounded-4 shadow-lg" 
                  style={{ maxHeight: '85vh' }} 
                />
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CertificateCard;