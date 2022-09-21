function Notes() {
  return (
    <div>
      <div className="flex justify-end py-4">
        <button className="bg-black px-4 py-2 rounded-lg cursor-pointer text-white">
          + Add Notes
        </button>
      </div>

      <div className="mt-10">
        <h2 className="text-2xl 2xl:text-3xl font-bold">Notes</h2>
        <p className="text-sm 2xl:text-base">Proses sudah selesai</p>
      </div>
    </div>
  );
}

export default Notes;
