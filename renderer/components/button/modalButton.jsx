export default function ModalButton({ onDecline, buttonName }) {
  return (
    <>
      <div className="px-6 py-4 flex justify-end space-x-4 items-center">
        {buttonName ? (
          <button
            type="submit"
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray"
          >
            {buttonName}
          </button>
        ) : null}
        <button
          type="button"
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 focus:outline-none focus:shadow-outline-gray"
          onClick={onDecline}
        >
          Cancel
        </button>
      </div>
    </>
  );
}
