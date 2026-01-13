// app/page.tsx (server component)
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import AuthButton from "./AuthButton";
import NotAuthorized from "./NotAuthorized";
import Interactibles from "./interactibles";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return (
      <main>
        <div className="min-h-screen flex flex-col items-center justify-center">
          <h1 className="font-[Libre-Bodoni] text-[5vh] [text-shadow:3px_3px_#558abb] animate-pick-up">Are you ready for your</h1>
          <h1 className="font-[MonsieurLaDoulaise] text-[10vh] relative bottom-[5vh]">fortune?</h1>
          <AuthButton />
        </div>
      </main>
    );
  }

  const userId = (session.user as any).id;
  console.log(userId);
  const allowed = process.env.ALLOWED_IDS?.split(",").map(s => s.trim()) ?? [];
  if (!allowed.includes(userId)) {
    return (
      <div>
        <NotAuthorized />
      </div>);
  }

  return (
    <main className="h-full w-full">
      <Interactibles userId={userId}></Interactibles>
    </main>
  );
}

