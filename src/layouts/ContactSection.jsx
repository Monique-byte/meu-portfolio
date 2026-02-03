import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Mail, Send, Linkedin, Briefcase, Code, Github,
  Link as LinkIcon, Building2, Wallet, Calendar 
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast, Toaster } from 'sonner';
import emailjs from '@emailjs/browser';
import { 
  Radar, RadarChart, PolarGrid, PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';
import '../styles/Contato.css';

// 1. Schema de Validação
const contactSchema = z.object({
  intent: z.enum(["recruitment", "freelance"]),
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Insira um e-mail válido"),
  mensagem: z.string().min(10, "A mensagem deve ser mais detalhada"),
  empresa: z.string().optional(),
  linkedinVaga: z.string().optional(),
  orcamento: z.string().optional(),
  prazo: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.intent === "recruitment" && (!data.empresa || data.empresa.length < 2)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nome da empresa é obrigatório", path: ["empresa"] });
  }
  if (data.intent === "freelance" && !data.orcamento) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Selecione o orçamento", path: ["orcamento"] });
  }
});

const skillData = [
  { subject: 'Frontend', A: 120, fullMark: 150 },
  { subject: 'Backend', A: 110, fullMark: 150 },
  { subject: 'DevOps', A: 70, fullMark: 150 },
  { subject: 'Mobile', A: 100, fullMark: 150 },
  { subject: 'QA', A: 80, fullMark: 150 },
  { subject: 'UI/UX Design', A: 130, fullMark: 150 },
];

const ContactSection = () => {
  const { register, handleSubmit, reset, watch, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: { 
      intent: 'recruitment',
      orcamento: "" 
    }
  });

  const selectedIntent = watch("intent");
const onSubmit = async (data) => {
  const serviceID = import.meta.env.VITE_EMAIL_SERVICE_ID;
  const templateID = import.meta.env.VITE_EMAIL_TEMPLATE_ID;
  const publicKey = import.meta.env.VITE_EMAIL_PUBLIC_KEY;

  // LOG DE SEGURANÇA (Confira se aparece tudo no F12)
  console.log("Tentando enviar com:", { serviceID, templateID, publicKey });

  try {
    if (!publicKey || !serviceID || !templateID) {
      throw new Error("IDs do EmailJS não encontrados no sistema (.env)");
    }

    emailjs.init(publicKey);

    // Mapeie EXATAMENTE o que você escreveu no site do EmailJS entre {{ }}
    const templateParams = {
      nome: data.nome,
      email: data.email,
      intent_label: data.intent === 'recruitment' ? 'Recrutamento' : 'Freelance',
      empresa: data.empresa || "N/A",
      linkedinVaga: data.linkedinVaga || "N/A",
      orcamento_text: data.orcamento || "Não informado",
      prazo: data.prazo || "N/A",
      mensagem: data.mensagem
    };

    const response = await emailjs.send(serviceID, templateID, templateParams, publicKey);
    
    console.log("RESPOSTA SUCESSO:", response);
    toast.success('Enviado com sucesso!');
    reset();

  } catch (err) {
    // ESTE LOG DIZ O MOTIVO REAL DO ERRO (Olhe o F12 agora!)
    console.error("ERRO REAL DO EMAILJS:", err);
    toast.error('Erro no envio. Abra o console (F12) para ver o motivo.');
  }
};
  return (
    <section id="contato" className="container py-1">
      <Toaster position="bottom-right" richColors />
      
      <div className="text-center mb-5">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} className="badge-contact">
          Disponível para novos projetos
        </motion.span>
        <h2 className="display-4 fw-bold main-title mt-3">Conecte-se comigo</h2>
      </div>

      <div className="row gx-lg-5 justify-content-center">
        {/* COLUNA ESQUERDA: INFOS */}
        <div className="col-lg-4 col-md-10">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} className="info-container">
            <div className="contact-glass-card mb-2 p-3 text-center">
              <h6 className="small text-white-50 mb-4 fw-bold text-uppercase">Mapeamento de Skills</h6>
              <div style={{ width: '100%', height: '250px' }}>
                <ResponsiveContainer>
                  <RadarChart cx="50%" cy="50%" outerRadius="70%" data={skillData}>
                    <PolarGrid stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: 'rgba(255,255,255,0.6)', fontSize: 11 }} />
                    <Radar name="Expertise" dataKey="A" stroke="#6c5ce7" fill="#6c5ce7" fillOpacity={0.5} />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="social-grid-card">
              <div className="d-grid gap-2">
                <a href="https://linkedin.com/in/moniquetrindade" target='_blank' rel='noopener noreferrer' className="social-pill-link">
                  <Linkedin size={18} /> LinkedIn <span>/in/moniquetrindade</span>
                </a>
                <a href="https://github.com/Monique-byte" target='_blank' rel='noopener noreferrer' className="social-pill-link">
                  <Github size={18} /> GitHub <span>/Monique-byte</span>
                </a>
                <a href="mailto:trindademonique52@gmail.com" className="social-pill-link">
                  <Mail size={18} /> E-mail <span>Clique para enviar</span>
                </a>
              </div>
            </div>

            <div className="mt-4 p-3 d-flex align-items-center gap-3 status-box">
               <div className="status-indicator pulsate"></div>
               <span className="small text-white-50">Atualmente aberta a propostas Full-time (Remoto) ou Freelance.</span>
            </div>
          </motion.div>
        </div>

        {/* COLUNA DIREITA: FORMULÁRIO */}
        <div className="col-lg-6 col-md-10">
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} className="form-glass-container p-4">
            
            <div className="intent-toggle-container mb-3">
              <label className={`intent-option ${selectedIntent === 'recruitment' ? 'active' : ''}`}>
                <input type="radio" {...register("intent")} value="recruitment" className="d-none" />
                <Briefcase size={18} />
                <span>Recrutamento</span>
              </label>
              <label className={`intent-option ${selectedIntent === 'freelance' ? 'active' : ''}`}>
                <input type="radio" {...register("intent")} value="freelance" className="d-none" />
                <Code size={18} />
                <span>Freelance</span>
              </label>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="row g-3">
                <div className="col-md-6">
                  <div className="input-wrapper">
                    <label>Seu Nome</label>
                    <input {...register("nome")} placeholder="Ex: Maria Silva" className={errors.nome ? 'error' : ''} />
                    {errors.nome && <span className="err-txt">{errors.nome.message}</span>}
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="input-wrapper">
                    <label>E-mail Profissional</label>
                    <input {...register("email")} type="email" placeholder="email@empresa.com" className={errors.email ? 'error' : ''} />
                    {errors.email && <span className="err-txt">{errors.email.message}</span>}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  {selectedIntent === 'recruitment' ? (
                    <motion.div key="rec" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="row g-3 m-0 p-0">
                      <div className="col-md-6">
                        <div className="input-wrapper">
                          <label className="d-flex align-items-center gap-2"><Building2 size={14}/> Empresa</label>
                          <input {...register("empresa")} placeholder="Nome da Empresa" className={errors.empresa ? 'error' : ''} />
                          {errors.empresa && <span className="err-txt">{errors.empresa.message}</span>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-wrapper">
                          <label className="d-flex align-items-center gap-2"><LinkIcon size={14}/> Link da Vaga</label>
                          <input {...register("linkedinVaga")} placeholder="URL da vaga..." />
                        </div>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div key="free" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="row g-3 m-0 p-0">
                      <div className="col-md-6">
                        <div className="input-wrapper">
                          <label className="d-flex align-items-center gap-2"><Wallet size={14}/> Orçamento</label>
                          <select {...register("orcamento")} className={`custom-select ${errors.orcamento ? 'error' : ''}`}>
                            <option value="">Selecione...</option>
                            <option value="p">Até R$ 1k</option>
                            <option value="m">R$ 2k - 5k</option>
                            <option value="g">10k+</option>
                          </select>
                          {errors.orcamento && <span className="err-txt">{errors.orcamento.message}</span>}
                        </div>
                      </div>
                      <div className="col-md-6">
                        <div className="input-wrapper">
                          <label className="d-flex align-items-center gap-2"><Calendar size={14}/> Prazo</label>
                          <input {...register("prazo")} placeholder="Ex: 1 mês" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="col-12">
                  <div className="input-wrapper">
                    <label>Como posso ajudar?</label>
                    <textarea {...register("mensagem")} rows={3} placeholder="Descreva brevemente sua necessidade..." className={errors.mensagem ? 'error' : ''} />
                    {errors.mensagem && <span className="err-txt">{errors.mensagem.message}</span>}
                  </div>
                </div>

                <div className="col-12">
                  <button disabled={isSubmitting} type="submit" className={`btn-submit-main w-100 ${isSubmitting ? 'loading' : ''}`}>
                    {isSubmitting ? 'ENVIANDO...' : (
                       <span className="d-flex align-items-center justify-content-center gap-2">
                         Enviar Proposta <Send size={18} />
                       </span>
                    )}
                  </button>
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