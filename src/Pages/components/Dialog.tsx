import React from "react";

interface DialogProps {
  isOpen: boolean;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  message,
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-30"
        onClick={onCancel}
      ></div>
      <div className="bg-white rounded-lg shadow-lg p-8 z-10 w-96">
        <h2 className="text-lg font-semibold mb-4">Confirmation</h2>
        <p className="mb-4">{message}</p>
        <div className="flex justify-end space-x-2">
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
