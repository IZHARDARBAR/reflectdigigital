export default function Rewards() {
  return (
    <div className="pt-32 min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Rewards</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Reward 1</h3>
            <p className="text-gray-300">Reward description goes here...</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Reward 2</h3>
            <p className="text-gray-300">Reward description goes here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}