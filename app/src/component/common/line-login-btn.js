import logo from "@/line_64.png";

export default function LineLoginButton() {
  const query = {
    response_type: "code",
    client_id: process.env["REACT_APP_LINE_CLIENT_ID"],
    redirect_uri: encodeURI(process.env.REACT_APP_LINE_REDIRECT_URI), //http://localhost:3000/api/auth/callback/line
    state: "random",
    scope: "profile openid",
  };
  const param = new URLSearchParams(query);
  console.log(process.env.REACT_APP_FIREBASE_API_KEY);
  return (
    <a
      href={`https://access.line.me/oauth2/v2.1/authorize?${param.toString()}`}
    >
      <div className="bg-line-button rounded-md">
        <div className="flex divide-x divide-black/8 hover:bg-line-button-hover/10 active:bg-line-button-press/30">
          <div className="flex justify-center items-center">
            <img src={logo} />
          </div>
          <div className="flex flex-1 justify-center items-center text-white px-16 text-xl">
            ล็อกอินด้วย LINE
          </div>
        </div>
      </div>
    </a>
  );
}
