// export const dynamic = "force-dynamic"
import Banner from "@/components/Home/Banner";
import Blog from "@/components/Home/Blog";
import Categories from "@/components/Home/Categories";
import Newsletter from "@/components/Home/Newsletter";
import InfiniteImageSlider from "@/components/Home/Slider";
import Slider from "@/components/Home/Slider";
import Text from "@/components/Home/Text";
import BlogCategoryWrapper from "@/components/Layout/BlogCategoryWrapper";
import blogService from "@/Service";
import Image from "next/image";

export default async function Home() {

  const res = await blogService.getFeaturedBlogs()

  return (

    <div>

      <Banner />
      {/* <Slider/> */}
      <InfiniteImageSlider data={res?.data?.data} />
      {/* <Categories /> */}
      <div className="!container  mx-auto lg:px-10">
        <BlogCategoryWrapper>    <Blog />
        </BlogCategoryWrapper>
        <Newsletter />
      </div>

    </div>
  );
}
