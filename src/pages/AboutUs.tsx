import TeamMemberCard from '../components/TeamMemberCard';
import './AboutUs.css';

const AboutUs = () => {
  const team = [
    {
      name: 'Lucía Gómez',
      role: 'CEO & Founder',
      imageUrl: 'https://via.placeholder.com/300x200',
      description: 'Lidera con visión y pasión por el diseño digital.',
    },
    {
      name: 'Carlos Díaz',
      role: 'Frontend Developer',
      imageUrl: 'https://via.placeholder.com/300x200',
      description: 'Especialista en interfaces modernas con React.',
    },
    {
      name: 'María Ríos',
      role: 'UX Designer',
      imageUrl: 'https://via.placeholder.com/300x200',
      description: 'Diseña experiencias centradas en el usuario.',
    },
  ];

  return (
    <section className="about">
      <div className="about-header">
        <h1>Sobre Nosotros</h1>
        <p className="about-intro">
          Somos un equipo de profesionales dedicados a construir herramientas intuitivas y visualmente atractivas.
        </p>
      </div>
      <div className="team-section">
        {team.map((member, index) => (
          <TeamMemberCard key={index} {...member} />
        ))}
      </div>
    </section>
  );
};


export default AboutUs;
