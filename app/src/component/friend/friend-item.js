import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function FirendItem({
  children,
  checked,
  onChange,
  disabledSelector,
}) {
  function handleOnChange(e) {
    if (onChange) {
      onChange(e);
    }
  }

  return (
    <div
      className="flex space-x-2 text-xl hover:cursor-pointer select-none"
      onClick={handleOnChange}
    >
      {!disabledSelector ? (
        <div className={`flex items-center ${checked ? "text-primary" : ""}`}>
          <FontAwesomeIcon icon={faCheckCircle} />
        </div>
      ) : null}
      <div className="flex items-center flex-1">{children}</div>
    </div>
  );
}
