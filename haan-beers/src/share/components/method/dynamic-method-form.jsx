import CustomMethod from "src/share/components/method/custom-method";
import ProportionsMethod from "src/share/components/method/proportions-method";

export default function MethodDynamicForm(props) {
  switch (props.method) {
    case "proportions":
      return <ProportionsMethod {...props} />;
    default:
      return <CustomMethod {...props} />;
  }
}
