
import { faBeerMugEmpty } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function AppBar() {
  return (
    <div className="flex justify-center items-center h-16 text-3xl text-primary font-bold">
      HaanBeer <FontAwesomeIcon icon={faBeerMugEmpty} />
    </div>
  );
}
