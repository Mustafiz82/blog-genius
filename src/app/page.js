import Banner from "@/components/Home/Banner";
import Blog from "@/components/Home/Blog";
import Categories from "@/components/Home/Categories";
import Newsletter from "@/components/Home/Newsletter";
import InfiniteImageSlider from "@/components/Home/Slider";
import Slider from "@/components/Home/Slider";
import Text from "@/components/Home/Text";
import Image from "next/image";

export default function Home() {

  //   const input ='' ```json
  // {
  //   "blocks": [
  //     {
  //       "type": "header",
  //       "data": {
  //         "text": "The JavaScript Deepsea",
  //         "level": 1
  //       }
  //     },

  //     {
  //       "type": "paragraph",
  //       "data": {
  //         "text": "Understanding how JavaScript manages memory can help prevent leaks and optimize performance. Garbage collection plays a key role, but developers must still be mindful of references."
  //       }
  //     }
  //   ]
  // }
  // ```

  // console.log(input);
  return (

    <div>

      <Banner />
      {/* <Slider/> */}
      <InfiniteImageSlider />
      {/* <Categories /> */}
      <div className="!container px-10">
        <Blog />
        <Newsletter />
      </div>

    </div>
  );
}
