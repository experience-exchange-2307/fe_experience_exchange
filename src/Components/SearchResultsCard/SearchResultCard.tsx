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
}

function SearchResultCard({
  distance,
  first_name,
  last_name,
  is_remote,
  skills,
  id,
}: SearchResultCardProps) {
  const lastSkillIndex = skills.length - 1;
  const linkStyle = {
    color: "inherit",
    textDecoration: "none",
   
  };
  return (
    <Link to={`/dashboard/${id}`} style={linkStyle}>
      <div className='result-card' key={id}>
        <div className='result-card-left'>

        <p className='result-card-title'>{`${first_name} ${last_name}`}</p>
        <div className='result-card-skills-container'>
          <p className='result-card-title2'>Skills:</p>

          {skills.map((skill, index) => (
            <p key={index} className='result-card-skills'>
              {skill.name}
              {index === lastSkillIndex ? "" : ", "}
            </p>
          ))}
        </div>

        <div>
        </div>
        </div>
          <p className='result-card-distance'>
            {is_remote ? "Remote" : `${distance} miles away`}
          </p>
      </div>
    </Link>
  );
}

export default SearchResultCard;
