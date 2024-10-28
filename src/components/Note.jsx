import { useEffect, useState } from "react";
import Copy from "../assets/copy.svg";
import Delete from "../assets/delete.svg";

function Note() {
  const [note, setNote] = useState("");
  const [savedNotes, setSavedNotes] = useState([]);

  // Load saved notes from localStorage when the component mounts
  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("savedNotes")) || [];
    setSavedNotes(storedNotes);
  }, []);

  // Save a note and store the updated list in localStorage
  const handleSaveNote = () => {
    const updatedNotes = [...savedNotes, note];
    setSavedNotes(updatedNotes);
    localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
    setNote("");
    alert("Note saved!");
  };

  const handleCopyNote = (selectedNote) => {
    navigator.clipboard.writeText(
      typeof selectedNote == "string" ? selectedNote : note
    );
    alert("Note copied!");
  };

  // Function to remove a note from the list
  const handleRemoveNote = (index) => {
    const updatedNotes = savedNotes.filter((_, i) => i !== index);
    setSavedNotes(updatedNotes);
    localStorage.setItem("savedNotes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="min-w-96 p-4 rounded-sm max-w-md mx-auto bg-white backdrop-blur-md shadow-lg border border-opacity-30 border-white">
      <h1 className="text-2xl font-bold mb-4 text-black">Note Taker</h1>
      <div className="w-96">
        <div className="relative w-full min-w-[200px]">
          <textarea
            className="peer h-full min-h-[100px] w-full resize-none rounded-[7px] border border-blue-gray-200 border-t-transparent bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:resize-none disabled:border-0 disabled:bg-blue-gray-50"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder=" "
          ></textarea>
          <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-gray-900 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Write your note here...
          </label>
        </div>
      </div>

      <div className="w-full flex gap-2 justify-end">
        <button
          className="px-4 py-2 font-sans text-xs font-bold text-center text-gray-900 uppercase align-middle transition-all rounded-md select-none hover:bg-gray-900/10 active:bg-gray-900/20 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleCopyNote}
        >
          Copy
        </button>
        <button
          className="select-none rounded-md bg-gray-900 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          onClick={handleSaveNote}
        >
          Save
        </button>
      </div>

      {/* Render the list of saved notes */}
      {savedNotes.length > 0 && (
        <div className="mt-4">
          <h2 className="text-lg font-semibold text-black">Saved Notes:</h2>
          <div className="max-h-40 overflow-y-auto">
            {savedNotes.map((note, index) => (
              <div
                key={index}
                className="p-3 bg-gray-100 bg-opacity-20 backdrop-blur-md rounded-lg text-black flex justify-between items-center"
              >
                <p className="flex-1 pr-4">{note}</p>
                <div>
                  <button
                    className="text-black p-1"
                    onClick={() => handleCopyNote(note)}
                  >
                    <img src={Copy} className="w-4" alt="Copy" />
                  </button>
                  <button
                    className="text-black p-1"
                    onClick={() => handleRemoveNote(index)}
                  >
                    <img src={Delete} className="w-4" alt="Delete" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Note;
