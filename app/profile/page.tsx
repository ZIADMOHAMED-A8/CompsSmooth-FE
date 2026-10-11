import { ProfilePage } from "./components/ProfilePage";

export default function Page() {
  return (
    <main className="min-h-screen bg-[#f7f8fa] text-[#172033]">
      <div className="mx-auto w-full max-w-[1150px] px-5 py-5">
        <div className="mb-4">
          <h1 className="text-[18px] font-semibold text-[#18212f]">
            Profile
          </h1>

          <p className="mt-1 text-[9px] text-[#9099a6]">
            Manage your account identity and contact information.
          </p>
        </div>

        <ProfilePage />
      </div>
    </main>
  );
}
