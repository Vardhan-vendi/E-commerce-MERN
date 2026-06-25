const CategoryForm = ({ name, setName, handleSubmit }) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center mt-4"
    >
      <div className="flex space-x-2  justify-center text-2xl font-semibold text-purple-700 p-3 ">
        <label htmlFor="category">Category</label>
        <input
          id="category"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter Category"
          className="text-white outline-none border border-pink-300 rounded rounded-10 text-1xl"
        />
      </div>
      <button
        type="submit"
        className="border border-pink-600 bg-pink-100 hover:bg-pink-300 focus:bg-pink-500 px-3 rounded rounded-5 text-2xl outline-none"
      >
        submit
      </button>
    </form>
  );
};

export default CategoryForm;
