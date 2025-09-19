import Hero from "../elements/home/Hero";
import HowItWorks from "../elements/home/HowItWorks";
import Impact from "../elements/home/Impact";
import Info from "../elements/home/Info";
import Process from "../elements/home/Process";
import Ready from "../elements/home/Ready";
import BodyLayout from "../layouts/BodyLayout";

const Home = () => {
  return (
    <BodyLayout>
      <Hero />
      <HowItWorks />
      <Process />
      <Impact />
      <Info />
      <Ready />
    </BodyLayout>
  );
};

export default Home;
