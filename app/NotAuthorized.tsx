import AuthButton from "./AuthButton";

export default function NotAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
        <AuthButton />
        <h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
        <p className="text-lg text-gray-700">
            You are not on the allowlist. Only certain users can view this page.
        </p>
    </div>
  );
}
