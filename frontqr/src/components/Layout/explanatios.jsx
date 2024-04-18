import QR from "../../assets/imgs/QR-types/selectImage.png";
import download from "../../assets/imgs/QR-types/download.png";
import "./styles/explanations.css"
import edit from "../../assets/imgs/QR-types/edit.png";

export const Explanations = () => {
  const data = [
    {
      tittle: "SELECT",
      img: QR,
      description:
        "In the top menu you will find the types of Qr that you can make, select the one that best suits your needs",
    },
    {
      tittle: "EDIT",
      img: edit,
      description:
        "In the top menu you will find the types of Qr that you can make, select the one that best suits your needs",
    },
    {
      tittle: "DOWNLOAD",
      img: download,
      description:
        "In the top menu you will find the types of Qr that you can make, select the one that best suits your needs",
    },
  ];

  return (
    <div className="flex flex-wrap gap-5 justify-center ">
      {data &&
        data.map((item, index) => (
          <div key={index} class="max-w-sm bg-sky-900 border border-gray-200 rounded-lg explanation-box ">
            <img class="rounded-t-lg" src={item.img} alt=""  className="w'full max-h-2xl "/>
            <div class="p-5">
              <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {item.tittle}
              </h5>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};
