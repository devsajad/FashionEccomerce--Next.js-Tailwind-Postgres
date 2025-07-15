import Spinner from "@/components/Spinner";

export default function loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <Spinner />
    </div>
  );
}
