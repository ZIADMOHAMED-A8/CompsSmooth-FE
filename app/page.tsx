import { AddressSearch } from "./components/AddressSearch";
import { RecentComps } from "./components/recent-comps/RecentComps";
import { RunCompsForm } from "./components/RunCompsForm";

export default function HomePage() {
  return (
    <main>
      <RunCompsForm></RunCompsForm>
      <RecentComps></RecentComps>
    </main>
  );
}