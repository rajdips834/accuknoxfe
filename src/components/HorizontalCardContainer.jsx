import React, { useEffect } from "react";
import CardWithChart from "./CardWithChart";
import AddWidget from "./AddWidget";
import AddWidgetModal from "./AddWidgetModal";

export default function HorizontalCardContainer({ Heading, datasets }) {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <>
      {" "}
      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <div className="bg-zinc-700 rounded-2xl shadow-md p-4 md:p-6 w-full max-w-7xl mx-auto my-6">
        {/* Heading */}
        <div className="px-4 py-2">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 text-left">
            {Heading}
          </h2>
        </div>

        {/* Horizontally scrollable cards */}
        <div className="overflow-x-auto">
          <div className="flex gap-6 p-4">
            {datasets.map(
              (ds, idx) => (
                console.log(ds, "Dataset"),
                (
                  <CardWithChart
                    key={idx}
                    type={ds.type || "pie"} // "pie" or "bar"
                    title={ds.name}
                    data={ds.data}
                    height={240}
                    legendPlacement="bottom"
                  />
                )
              )
            )}
            <AddWidget onClick={() => setIsModalOpen(true)} />
          </div>
        </div>
      </div>
    </>
  );
}
