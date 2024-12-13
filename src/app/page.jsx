import React from "react";
// import Category from "@/components/Category";
import Carousel from "@/components/carousel";
import Famous from "@/components/Famous";
import Link from "next/link";


const Home = async () => {  const images = [
    {
      url: 'https://img.freepik.com/free-photo/laptop-rocks-table-arrangement_23-2149672637.jpg?uid=R154701608&ga=GA1.1.1184846028.1720037584&semt=sph',
      label: 'Shop Now',
      // description: 'Some representative placeholder content for the first slide.'
    },
    {
      url: 'https://img.freepik.com/free-photo/elevated-view-laptop-stationeries-blue-backdrop_23-2147880457.jpg?uid=R154701608&ga=GA1.1.1184846028.1720037584&semt=sph',
      label: 'Shop Now',
      // description: 'Some representative placeholder content for the first slide.'
    },
    {
      url: "https://img.freepik.com/free-photo/top-view-keyboard-mouse-arrangement_23-2149386333.jpg?t=st=1720050778~exp=1720054378~hmac=45b7dcfb39ed5094140233e88bbc7b434f0ca07123d893bf26d48aca2840c9e2&w=996",
      label: 'Shop Now',
      // description: 'Some representative placeholder content for the second slide.'
    },
    {
      url: 'https://img.freepik.com/free-photo/office-desk-with-laptop_23-2148821886.jpg?t=st=1720050235~exp=1720053835~hmac=022ddd96b9fced73059f6d7e31015f6820948a9a5bd7eaa8bf9bf7d45af0b27b&w=996',
      label: 'Shop Now',
      // description: 'Some representative placeholder content for the third slide.'
    }
,
  ];

  async function getData() {
    const res = await fetch("http://localhost:3000/api/products",{
      cache: "no-store",
    });
    return res.json();
  
  }

  const data = await getData();
  // console.log(data)
  // function createMarkup(desc) {
  //   return { __html: desc };
  // }
  

  return (
    <div>
      {/* <h1 className="text-5xl m-7 text-center font-bold text-orange-600">
        Amazon{" "}
      </h1> */}
      <div >
        <Carousel images={images} />
      </div>
      <div>
        <h2 className=" font-extrabold text-2xl mt-11 text-orange-500 ml-5 drop-shadow-lg"> Famous Products </h2>
      <Famous/>
      </div>

      <div className=" flex border w-11/12 h-12 bg-white m-auto mt-10  ">
        <div>
          {/* <Category /> */}
        </div>
        <div className="flex-1 mt-3 ml-1 scrolling-container">
          <div className="scrolling-content gap-24">
            <p className="scrolling-item">
  At this store, you can purchase a wide variety of items to meet all your needs. From everyday essentials and household goods to electronics, clothing, and unique gifts, our diverse selection ensures you&apos;ll find exactly what you&apos;re looking for. Whether you&apos;re shopping for yourself or searching for the perfect present, we have something for everyone. Enjoy the convenience of one-stop shopping with our extensive range of high-quality products.
</p>
            <p className="scrolling-item">
  At this store, you can purchase a wide variety of items to meet all your needs. From everyday essentials and household goods to electronics, clothing, and unique gifts, our diverse selection ensures you&apos;ll find exactly what you&apos;re looking for. Whether you&apos;re shopping for yourself or searching for the perfect present, we have something for everyone. Enjoy the convenience of one-stop shopping with our extensive range of high-quality products.
</p>
          </div>
        </div>
      </div>
      {/* product   ....  .. . . . .          .  */}

      <div>
        <h2 className=" font-extrabold text-2xl mt-11 text-orange-500 ml-5 drop-shadow-lg ">New Products</h2>
        <section className="container  mx-auto p-10 md:py-12 px-0 md:p-8 md:px-0">
          <section className=" md:mx-10 p-5 md:p-0 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-7  ">
            {data?.message.map((v, i) => {
              return (
                <Link
                key={i}
                  href={`/singleproduct/${v._id}`}
                  className=" mx-3 bg-orange-100/10   overflow-hidden shadow-lg max-w-sm transform duration-500 hover:-translate-y-2"
                >
                  <div className="relative object-contain  p-3">
                    <img
                      className="w-full h-56"
                      // src="https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      src={
                        v?.images[0]  ||
                        "https://images.pexels.com/photos/7989741/pexels-photo-7989741.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                      }
                      alt={v.title}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-medium mb-2 hover:text-orange-500 line-clamp-1">{v?.title}</h3>
                  
                    <div className="flex items-center justify-between mt-5 ">
                      <div className=" px-2 border-2 border-orange-200 rounded-md ">{v?.category?.title}</div>
                      <span className="font-bold text-lg "> RS.{v.price}</span>
                      
                    </div>
                  </div>
                </Link>
              );
            })}
          </section>
        <div className="flex mt-7 px-12  "><button className="border w-full mx-auto font-bold bg-red-500 rounded-xl globalShadow border-red-500 text-2xl p-3"> <Link href={"/category"}> All Products</Link></button></div>
        </section>
      </div>
    </div>
  );
};

export default Home;