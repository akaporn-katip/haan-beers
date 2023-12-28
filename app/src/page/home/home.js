import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function HomePage() {
  return (
    <div className="flex flex-row space-y-2">
      <div className="flex flex-1 justify-end items-center space-x-2 bg-white rounded-md bg-clip-padding p-4">
        <div>สร้างบิล</div>
        <button className="bg-primary rounded-md p-3 aspect-square">
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    </div>
  );
}
