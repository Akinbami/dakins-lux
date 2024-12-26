import { assets } from "../assets/frontend_assets/assets";
import NewsLetterBox from "../components/NewsLetterBox";
import Title from "../components/Title";

const About = () => {
  return (
    <div className="">
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={"ABOUT"} text2={"US"} />
      </div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="" className="w-full max-w-[450px]" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto
            in corrupti enim repudiandae quia voluptas, alias ipsam
            necessitatibus nostrum rem aspernatur! Quas earum, itaque facilis
            magni pariatur debitis porro dolorem.
          </p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Dolorem
            perferendis odit, laudantium quia voluptates vitae in modi numquam
            optio amet, repellat, praesentium quaerat aut repellendus voluptate?
            Accusamus voluptas ipsa neque?
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
            tempore maxime consequatur temporibus laboriosam deleniti facere
            ullam necessitatibus voluptatum enim! Aspernatur explicabo pariatur,
            soluta quos molestias quas saepe. Quidem, tempora.
          </p>
        </div>
      </div>
      <div className="text-4xl py-4">
        <Title text1={"WHY"} text2={"CHOOSE US"} />
      </div>

      <div className="flex flex-col sm:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5 ">
          <b>Quality Assurance</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
            accusamus eius pariatur, vitae esse possimus amet et facere placeat
            omnis. Minus quidem voluptatum pariatur quas doloribus, harum
            reiciendis natus qui?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5 ">
          <b>Convinience</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
            accusamus eius pariatur, vitae esse possimus amet et facere placeat
            omnis. Minus quidem voluptatum pariatur quas doloribus, harum
            reiciendis natus qui?
          </p>
        </div>
        <div className="border px-10 md:px-16 py-8 md:py-20 flex flex-col gap-5 ">
          <b>Exceptional Customer Service</b>
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit
            accusamus eius pariatur, vitae esse possimus amet et facere placeat
            omnis. Minus quidem voluptatum pariatur quas doloribus, harum
            reiciendis natus qui?
          </p>
        </div>
      </div>
      <NewsLetterBox />
    </div>
  );
};

export default About;
