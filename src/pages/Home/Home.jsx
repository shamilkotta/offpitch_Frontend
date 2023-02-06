import React from "react";

import Hero from "../../components/Hero/Hero";
import UpcomingSection from "./UpcomingSection";
import QuickButtons from "./QuickButtons";
import CtaOrganize from "./CtaOrganize";

function Home() {
  return (
    <>
      <Hero />
      <UpcomingSection />
      <QuickButtons />
      <CtaOrganize />
    </>
  );
}

export default Home;
