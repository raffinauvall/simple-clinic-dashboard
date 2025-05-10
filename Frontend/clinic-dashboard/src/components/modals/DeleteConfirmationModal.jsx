import React from "react";
import ModalWrapper from "./modalWrapper"; // pastikan ini sudah ada
import { toast } from "sonner";

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, loading }) => {
  const handleClick = async () => {
    try {
      await onConfirm();
      toast.success("Data berhasil dihapus");
      onClose();
    } catch {
      toast.error("Gagal menghapus data");
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Hapus Data?
        </h2>
        <p className="text-gray-700 mb-6">
          Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak bisa
          dibatalkan.
        </p>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Batal
          </button>
          <button
            onClick={handleClick}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            {loading ? "Menghapus..." : "Hapus"}
          </button>
        </div>
      </div>
    </ModalWrapper>
  );
};

export default DeleteConfirmationModal;
