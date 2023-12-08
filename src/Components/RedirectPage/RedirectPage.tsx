
import "./RedirectPage.css"
import Loading from "Components/Loading/Loading";
import { CurrentUser } from "types";
import { Link } from "react-router-dom";
interface RedirectPageProps {
  currentUser: CurrentUser | undefined;
}
function RedirectPage({ currentUser }: RedirectPageProps) {
  return (
    <>
      {!currentUser ? (
        <Loading />
      ) : (
        <div className='redirect-page'>
          <Link to={`/dashboard/${currentUser.id}`}>
            <button className='create-account-btn'>Take me to my dashboard</button>
          </Link>
        </div>
      )}
    </>
  );
}

export default RedirectPage;
