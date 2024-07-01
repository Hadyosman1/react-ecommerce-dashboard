import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Card from "../components/Card";

//icons
import { SlCalender } from "react-icons/sl";
import { MdInsights } from "react-icons/md";
import { AiOutlineDollar } from "react-icons/ai";
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { PiBagSimple } from "react-icons/pi";
import { LuUserCircle2 } from "react-icons/lu";
import { CiCreditCard1 } from "react-icons/ci";

//charts
import MyPieChart from "../layouts/charts-layout/MyPieChart";
import MyComposedChart from "../layouts/charts-layout/MyComposedChart";

const HomePage = () => {
  const { user } = useSelector((state) => state.authSlice);
  const theme = useSelector((state) => state.themeSlice);
  const [firstChartWidth, setfirstChartWidth] = useState(0);
  const [pieChartWidth, setPieChartWidth] = useState(0);

  const date = new Date();

  const handleResponsiveChartWidth = useCallback(() => {
    if (window.innerWidth > 1000) {
      setfirstChartWidth(700);
      setPieChartWidth(400);
    } else if (window.innerWidth < 1000 && window.innerWidth > 700) {
      setfirstChartWidth(550);
      setPieChartWidth(300);
    } else {
      setfirstChartWidth(370);
      setPieChartWidth(250);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResponsiveChartWidth);
    handleResponsiveChartWidth();
    return () => {
      window.removeEventListener("resize", handleResponsiveChartWidth);
    };
  }, [handleResponsiveChartWidth]);


  return (
    <section className=" flex flex-col gap-4 ">
      {/* header */}
      <div className="flex gap-4 flex-wrap items-center justify-between">
        <div className="text-secondarybreakColor">
          <h1 className="font-bold text-xl mb-2">
            Good Day, <span className="text-sky-500">{user.firstName}</span>{" "}
            <span className="">🖐️</span>
          </h1>
          <h2 className="">{`Here's What's Updating In Your E-Commerce.`}</h2>
        </div>

        <div className="ml-auto flex  gap-4">
          <h3 className="text-white flex items-center bg-sky-700 ">
            <span className="px-3.5">{date.toDateString()}</span>
            <span className="p-2.5 text-lg bg-sky-900/90">
              <SlCalender />
            </span>
          </h3>
          <h4 className="flex items-center p-2.5 bg-violet-700">
            <span className="text-lg text-white">
              <MdInsights className="" />
            </span>
          </h4>
        </div>
      </div>
      {/* header */}

      {/* cards */}
      <div className="grid grid-cols-[repeat(auto-fit,minmax(230px,1fr))] gap-5 lg:gap-3">
        <Card
          bg="bg-emerald-700"
          shadow="shadow-emerald-600"
          title={"Total Earning"}
          anchorText={"View net earnings"}
          number={"$757.40k"}
          subTitle={
            <>
              <FaArrowTrendUp />
              +21.67 %
            </>
          }
          subTitleColor={"text-white"}
          icon={<AiOutlineDollar />}
          iconBg={"bg-green-900"}
          iconColor={"text-slate-200"}
        />
        <Card
          bg="bg-orange-600/90"
          shadow="shadow-orange-500"
          title={"Orders"}
          anchorText={"View all orders"}
          number={"42,378"}
          subTitle={
            <>
              <FaArrowTrendDown />
              -5.75 %
            </>
          }
          subTitleColor={"text-white"}
          icon={<PiBagSimple />}
          iconBg={"bg-amber-900"}
          iconColor={"text-slate-200"}
        />
        <Card
          bg="bg-sky-600"
          shadow="shadow-sky-400"
          title={"Customers"}
          anchorText={"See details"}
          number={"1,85,45M"}
          subTitle={
            <>
              <FaArrowTrendUp />
              +32.01 %
            </>
          }
          subTitleColor={"text-white"}
          icon={<LuUserCircle2 />}
          iconBg={"bg-sky-800"}
          iconColor={"text-slate-200"}
        />
        <Card
          bg="bg-red-700"
          shadow="shadow-red-400"
          title={"My balance"}
          anchorText={"Withdraw money"}
          number={"$245.15k"}
          icon={<CiCreditCard1 />}
          iconBg={"bg-red-900"}
          iconColor={"text-slate-200"}
        />
      </div>
      {/* cards */}

      {/* main content */}

      {/* ====================================== */}
      <div className="flex gap-3 flex-wrap justify-center mt-5">
        <div
          className={`flex-grow overflow-x-auto ${
            theme === "dark" ? `bg-secondary-200` : `bg-main`
          } p-6 flex justify-center items-center`}
        >
          <MyComposedChart firstChartWidth={firstChartWidth} />
        </div>
        <div
          className={`${
            theme === "dark" ? `bg-secondary-200` : `bg-main`
          } p-4 flex flex-col gap-3 items-center justify-center flex-grow `}
        >
          <h1 className="text-3xl font-bold text-center text-mainBreakColor">
            Overview
          </h1>
          <p className="text-sm text-center text-pretty w-10/12  md:w-72 text-secondarybreakColor">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            consectetur, velit id tristique elementum, justo ligula consectetur
            massa, vel condimentum lorem neque non erat.
          </p>
        </div>
      </div>
      {/* ====================================== */}

      {/* ====================================== */}
      <div className="flex gap-3 flex-row-reverse flex-wrap justify-center ">
        <div
          className={`${
            theme === "dark" ? `bg-secondary-200` : `bg-main`
          }  p-6 flex-grow flex justify-center items-center overflow-x-auto`}
        >
          <MyPieChart pieChartWidth={pieChartWidth} />
        </div>

        <div
          className={`${
            theme === "dark" ? `bg-secondary-200` : `bg-main`
          } p-4 flex-grow flex flex-col gap-3 items-center justify-center`}
        >
          <h1 className="text-3xl font-bold text-center text-mainBreakColor">
            Overview
          </h1>
          <p className="text-sm text-center max-w-[300px] text-secondarybreakColor">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            consectetur, velit id tristique elementum, justo ligula consectetur
            massa, vel condimentum lorem neque non erat.
          </p>
        </div>
      </div>
      {/* ====================================== */}

      {/* main content */}
    </section>
  );
};

export default HomePage;
