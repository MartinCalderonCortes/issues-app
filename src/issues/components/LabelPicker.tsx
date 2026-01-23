import { LoadingSpinner } from "../../share/components/LoadingSpinner";
import { useLabels } from "../hooks/useLabels";

export const LabelPicker = () => {
  const { labelsQuery } = useLabels()

  if( labelsQuery.isLoading ) {
    return (
      <div className="flex w-full justify-center items-center h-52">
        <LoadingSpinner/>
      </div>
    )
  }
  
  return (
    <div className="flex flex-wrap gap-2 justify-start">
      {
        labelsQuery.data && labelsQuery.data.map(({ id, name, color }) => (
          <span
            className="animate-fadeIn px-2 py-1 rounded-full text-xs font-semibold hover:bg-slate-800 cursor-pointer"
            style={{ border: `1px solid #${color}`, color: '#ffccd3' }}
            key={id}
          >
            {name}
          </span>
        ))
      }
    </div>
  );
};
