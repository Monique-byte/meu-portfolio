import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Github, Linkedin, Instagram, MessageSquare } from 'lucide-react';
import emailjs from '@emailjs/browser'; // Importação do EmailJS
import './contato.css';

const ContactSection = () => {
  // 1. Estado para armazenar os dados do formulário
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    mensagem: ''
  });

  // 2. Função para atualizar os dados conforme você digita
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 3. Função para enviar o e-mail
  const sendEmail = (e) => {
    e.preventDefault();

    const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
    const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

    emailjs.send(serviceID, templateID, formData, publicKey)
      .then((response) => {
        console.log('SUCESSO!', response.status, response.text);
        alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
        setFormData({ nome: '', email: '', mensagem: '' }); // Limpa o formulário
      })
      .catch((err) => {
        console.error('ERRO:', err);
        alert('Ocorreu um erro ao enviar. Por favor, tente novamente!');
      });
  };

  return (
    <section id="contato" className="contact-section container">
      <div className="text-center mb-5">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="badge-contact"
        >
          DISPONÍVEL PARA NOVOS PROJETOS
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} 
          whileInView={{ opacity: 1, y: 0 }}
          className="display-4 fw-bold main-title mt-3"
        >
          Conecte-se Comigo
        </motion.h2>
      </div>

      <div className="row g-4 justify-content-center">
        {/* Lado Esquerdo: Cards de Info */}
        <div className="col-lg-5">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="info-container"
          >
            <div className="contact-glass-card mb-4">
              <div className="d-flex align-items-center gap-4">
                <div className="icon-box">
                  <Mail size={24} />
                </div>
                <div>
                  <h5>E-mail</h5>
                  <p>trindademonique52@gmail.com</p>
                </div>
              </div>
            </div>

            <div className="social-grid-card">
              <p className="small text-white-50 mb-3 fw-bold">REDES PROFISSIONAIS</p>
              <div className="d-flex gap-3">
                <a href="#" className="social-pill"><Github size={20} /> Github</a>
                <a href="#" className="social-pill"><Linkedin size={20} /> LinkedIn</a>
                <a href="#" className="social-pill"><Instagram size={20} /> Instagram</a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Lado Direito: Formulário */}
        <div className="col-lg-7">
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="form-glass-container"
          >
            <h4 className="fw-bold mb-4 d-flex align-items-center gap-2">
              <MessageSquare className="text-purple-light" /> Mande uma mensagem
            </h4>
            
            {/* Adicionado o onSubmit aqui */}
            <form onSubmit={sendEmail}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <div className="input-group-custom">
                    <label>Nome</label>
                    <input 
                      type="text" 
                      name="nome" // Deve ser igual ao {{nome}} do seu template
                      placeholder="Seu nome" 
                      value={formData.nome}
                      onChange={handleChange}
                      required 
                    />
                  </div>
                </div>
                <div className="col-md-6 mb-3">
                  <div className="input-group-custom">
                    <label>E-mail</label>
                    <input 
                      type="email" 
                      name="email" // Deve ser igual ao {{email}} que você adicionar no template
                      placeholder="email@exemplo.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="col-12 mb-3">
                  <div className="input-group-custom">
                    <label>Sua Mensagem</label>
                    <textarea 
                      name="mensagem" // Deve ser igual ao {{mensagem}} do seu template
                      rows="4" 
                      placeholder="Como posso te ajudar hoje?"
                      value={formData.mensagem}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>
                </div>
                <div className="col-12 text-end">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn-submit-contact"
                    type="submit"
                  >
                    Enviar Mensagem <Send size={18} className="ms-2" />
                  </motion.button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;