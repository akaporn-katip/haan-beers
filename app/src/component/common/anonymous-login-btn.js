export default function AnonymousLoginButton(props) {
  return (
    <button name="anoymously-login" {...props}>
      <div className="bg-white/10 rounded-md">
        <div className="flex divide-x divide-black/8 hover:bg-line-button-hover/10 active:bg-line-button-press/30">
          <div className="flex flex-1 justify-center items-center text-white px-16 text-xl">
            Login as Anonymous
          </div>
        </div>
      </div>
    </button>
  );
}
