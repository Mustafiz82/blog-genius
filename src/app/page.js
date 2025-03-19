import Banner from "@/components/Home/Banner";
import Blog from "@/components/Home/Blog";
import Categories from "@/components/Home/Categories";
import InfiniteImageSlider from "@/components/Home/Slider";
import Slider from "@/components/Home/Slider";
import Text from "@/components/Home/Text";
import Image from "next/image";

export default function Home() {
  return (
    <div>

      <Banner />
      {/* <Slider/> */}
      <InfiniteImageSlider />
      <Categories />
     <Blog/>

    </div>
  );
}
