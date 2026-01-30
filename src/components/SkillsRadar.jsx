import { 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  ResponsiveContainer 
} from 'recharts';

// Dados das competências
const skillData = [
  { subject: 'Frontend', A: 120, fullMark: 150 },
  { subject: 'Backend', A: 90, fullMark: 150 },
  { subject: 'DevOps', A: 70, fullMark: 150 },
  { subject: 'Mobile', A: 90, fullMark: 150 },
  { subject: 'QA', A: 110, fullMark: 150 },
  { subject: 'UI/UX Design', A: 130, fullMark: 150 },
];

const SkillsMapping = () => {
  return (
    <div className="card-body-glass">
      <h4 className="chart-title">Equilíbrio de Competências</h4>
      
      <div className="chart-container">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
            {/* Linhas da teia */}
            <PolarGrid stroke="rgba(255, 255, 255, 0.15)" />
            
            {/* Rótulos (Frontend, Backend, etc) */}
            <PolarAngleAxis 
              dataKey="subject" 
              tick={{ fill: 'rgba(255, 255, 255, 0.7)', fontSize: 13, fontWeight: 500 }} 
            />
            
            {/* A área preenchida do gráfico */}
            <Radar
              name="Skills"
              dataKey="A"
              stroke="#6c5ce7"
              fill="#6c5ce7"
              fillOpacity={0.5}
              dot={{ r: 4, fill: "#6c5ce7" }} // Adiciona pontos nos vértices
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillsMapping;