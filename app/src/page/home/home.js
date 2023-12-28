import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-row space-y-2 mx-2">
      <div className="flex flex-1 justify-end items-center space-x-2 bg-white rounded-md bg-clip-padding p-2">
        <div>สร้างบิล</div>
        <div className="aspect-square">
          <Link to={'/create'} className="flex justify-center items-center rounded-md p-3 w-full h-full btn btn-create-bill">
            <FontAwesomeIcon icon={faPlus} />
          </Link>
        </div>
      </div>
    </div>
  );
}
