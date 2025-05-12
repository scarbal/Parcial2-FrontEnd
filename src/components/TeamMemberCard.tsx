import './TeamMemberCard.css';

type Props = {
  name: string;
  role: string;
  imageUrl: string;
  description: string;
};

const TeamMemberCard = ({ name, role, imageUrl, description }: Props) => {
  return (
    <div className="team-card">
      <img src={imageUrl} alt={name} />
      <h3>{name}</h3>
      <p className="role">{role}</p>
      <p>{description}</p>
    </div>
  );
};

export default TeamMemberCard;
