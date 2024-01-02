import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import LineLoginButton from "../../component/common/line-login-btn";
import { auth } from "../../firebase/auth";

export default function HomePage() {
  return (
    <div className="flex flex-col space-y-2 mx-2">
      <div className="flex flex-1 justify-end items-center space-x-2 bg-white rounded-md bg-clip-padding p-2">
        <div>{auth.currentUser?.displayName} สร้างบิล</div>
        <div className="aspect-square">
          <Link
            to={"/create"}
            className="flex justify-center items-center rounded-md p-3 w-full h-full btn btn-create-bill"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
      </div>
    </div>
  );
}
