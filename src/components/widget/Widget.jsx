import Card from "../card";


const Widget = ({ icon, title, subtitle }) => {
  return (
    <Card extra="!flex-row flex-grow items-center justify-between rounded-[20px]">
      <div className=" flex h-[120px] w-8 flex-row items-center">
        <div className="rounded-full bg-slate-800 p-4 dark:bg-navy-700">
          <span className="flex items-center text-white text-brand-500 dark:text-white">
            {icon}
          </span>
        </div>
      </div>

      <div className="h-50  flex w-auto flex-col justify-center">
        <h4 className="text-4xl font-bold text-navy-700 dark:text-white">
          {subtitle}
        </h4>
        <h2 className="font-dm text-lg font-medium text-gray-600">{title}</h2>

      </div>
    </Card>
  );
};

export default Widget;
