import "./SearchResultCard.css";
import { Skills } from "types";

interface SearchResultCardProps {
  first_name: string;
  last_name: string;
  is_remote: boolean;
  id: string;
  skills: Skills[];
}

function SearchResultCard({
  first_name,
  last_name,
  is_remote,
  skills,
  id
}: SearchResultCardProps) {

  const lastSkillIndex = skills.length - 1;

  return (
    <div className='result-card' key={id}>
      <div>
        <p className='result-card-title'>{`${first_name} ${last_name}`}</p>
        <div className='result-card-skills-container'>
          <p className='result-card-title' >Skills:</p>
         
            {skills.map((skill, index) => (
              <p key={index} className='result-card-skills'>
                {skill.name}
                {index === lastSkillIndex ? "" : ", "}
              </p>
            ))}
          
        </div>
      </div>
      <div>
        <p className='result-card-distance'>
          {is_remote ? "Remote" : "X miles away"}
        </p>
      </div>
    </div>
  );
}

export default SearchResultCard;
