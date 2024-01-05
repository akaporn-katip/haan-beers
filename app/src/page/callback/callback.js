/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useFirebaseAuth from "../../services/useFirebaseAuth";
import { useNavigate } from "react-router-dom";
import MainLayout from "@/layout/main-layout";

export default function CallbackPage() {
  const [isError, setIsError] = useState(false);
  const [searchParams] = useSearchParams();
  const { signIn } = useFirebaseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const code = searchParams.get("code");
    signIn(code)
      .then(() => {
        navigate("/");
      })
      .catch(() => {
        setIsError(true);
      });
  }, [searchParams]);

  return (
    <MainLayout>
      <div className="bg-white p-2 rounded-md">
        {isError ? (
          <div>
            Ops somethings wrong... Goto Login{" "}
            <Link to={"/"}>
              <button className="btn btn-primary">Click</button>
            </Link>
          </div>
        ) : (
          "Please wait..."
        )}
      </div>
    </MainLayout>
  );
}
