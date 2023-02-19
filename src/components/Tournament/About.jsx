import React from "react";

import soccorImg from "../../assets/img/soccor3.jpg";

function About() {
  return (
    <div className="my-10">
      <p className="text-lg font-semibold">About</p>
      <div className="text-gray-600">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Natus rem
        nostrum officiis? Error enim eius possimus, deleniti fugit quaerat
        repellat accusantium commodi eum. Enim, architecto. Lorem ipsum dolor
        sit amet consectetur adipisicing elit. Ipsam adipisci, iure voluptas
        odit optio commodi placeat harum. Animi repellendus deleniti iusto
        voluptates, consequatur nesciunt laborum. Lorem ipsum dolor sit, amet
        consectetur adipisicing elit. Hic necessitatibus amet reprehenderit
        magnam quam voluptas autem fugit nemo ad libero excepturi enim, dolor
        qui rem obcaecati inventore facere iste velit, assumenda, ducimus odio
        sed ratione eveniet ipsa? Autem, quos!
      </div>
      <div className="flex flex-wrap items-center gap-y-3 gap-x-8 my-8">
        <div className="flex items-center">
          <img className="w-12 h-12 rounded-full mr-2" src={soccorImg} alt="" />
          <div className="self-end">
            <p className="font-medium m-0 text-gray-500">Organized by</p>
            <p className="text-lg font-semibold -mt-2">City club</p>
          </div>
        </div>
        <div className="border-l-2 h-10" />
        <div className="flex flex-col justify-end">
          <p className="-mt-1">9189765487</p>
          <p className="-mt-1">hello@city.com</p>
        </div>
      </div>
    </div>
  );
}

export default About;
