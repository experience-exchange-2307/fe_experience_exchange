import "./SearchResultCard.css";
import { Skills } from "types";
import { Link } from "react-router-dom";

interface SearchResultCardProps {
  distance: number;
  first_name: string;
  last_name: string;
  is_remote: boolean;
  id: string;
  skills: Skills[];
  searchQuery: string;
}

function SearchResultCard({
  distance,
  first_name,
  last_name,
  is_remote,
  skills,
  id,
  searchQuery
}: SearchResultCardProps) {
  const lastSkillIndex = skills.length - 1;
  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
   
  };
  return (
    <Link to={`/dashboard/${id}`} style={linkStyle}>
      <div className='result-card' key={id}>
        <div className='result-card-top'>

        <p className='result-card-title'>{`${first_name} ${last_name}`}</p>
          <p className='result-card-distance'>
            {is_remote ? "Remote" : `${distance} mi.`}
          </p>
          </div>
        <div className='result-card-skills-container'>
          <p className='result-card-title2'>Skills:</p>

          {skills.map((skill, index) => (
            <p key={index} className='result-card-skills' style={{ fontWeight: skill.name === searchQuery ? 600 : 300 }}>
              {skill.name}
              {index === lastSkillIndex ? "" : ", "}
            </p>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default SearchResultCard;
