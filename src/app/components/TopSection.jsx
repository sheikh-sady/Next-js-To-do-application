import BullseyeIcon from "./BullseyeIcon";
import CheckCircleIcon from "./CheckCircleIcon";
import InfoCard from "./InfoCard";
import TimerIcon from "./TimerIcon";

const TopSection = () => {
  return (
    <div className="w-full grid md:grid-cols-4 grid-cols-2 gap-5">
      <InfoCard
        title="Total"
        icon={
          <BullseyeIcon className="bg-gray-100 p-1  rounded-lg text-gray-600" />
        }
      />
      <InfoCard
        title="To Do"
        icon={
          <TimerIcon className="bg-gray-100 p-1  rounded-lg text-gray-600" />
        }
      />
      <InfoCard
        title="In Progress"
        icon={
          <TimerIcon className="bg-blue-100 p-1  rounded-lg text-blue-600" />
        }
      />
      <InfoCard
        title="Completed"
        icon={
          <CheckCircleIcon className="bg-green-100 p-1  rounded-lg text-green-600" />
        }
      />
    </div>
  );
};
export default TopSection;
