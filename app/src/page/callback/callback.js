import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import useFirebaseAuth from "../../services/useFirebaseAuth";
import { useNavigate } from "react-router-dom";

export default function CallbackPage() {
  const [searchParams] = useSearchParams();
  const { signIn } = useFirebaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    signIn(code).then(() => {
      navigate("/");
    });
  }, []);

  return <div>
    Please wait...
  </div>;
}
