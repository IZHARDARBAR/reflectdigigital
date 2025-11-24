export default function Events() {
  return (
    <div className="pt-32 min-h-screen bg-black text-white p-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Events</h1>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Upcoming Event 1</h3>
            <p className="text-gray-300">Event description goes here...</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-lg">
            <h3 className="text-xl font-semibold mb-3">Upcoming Event 2</h3>
            <p className="text-gray-300">Event description goes here...</p>
          </div>
        </div>
      </div>
    </div>
  );
}