import Snowflake from '../components/Snowflake';

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-800"> {/* Added background for contrast */}
      <Snowflake size={300} color="white" /> {/* Adjust size and color here */}
    </div>
  );
}
