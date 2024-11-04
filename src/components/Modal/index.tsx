import { format } from "date-fns";
import React from "react";
import { Button } from "..";
import { deleteAppointment } from "@/api";

interface ModalProps {
  setIsOpenModal: (data: boolean) => void;
  selectedEvent: any;
}

export const Modal: React.FC<ModalProps> = ({
  selectedEvent,
  setIsOpenModal,
}) => {
  const handleJoinMeeting = () => {
    window.open(selectedEvent?.room_url, "_blank");
  };
  const handleCloseModal = () => {
    setIsOpenModal(false);
  };
  const handleMeetingCancel = async () => {
    const response = await deleteAppointment(selectedEvent?.sid);
    console.log(response);
    if (response) {
      setIsOpenModal(false);
    }
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="fixed inset-0 bg-black opacity-50"></div>
      <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-bold text-gray-800 border-b pb-4">
            Meeting with {selectedEvent?.title}
          </h2>

          <div className="space-y-3">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 font-medium">
                {format(selectedEvent?.start as Date, "MMMM d, yyyy h:mm a")} -{" "}
                {format(selectedEvent?.end as Date, "h:mm a")}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-medium">Name:</span>
                <span className="text-gray-800">{selectedEvent?.title}</span>
              </div>
            </div>

            <div className="pt-2">
              <Button
                handleClick={handleJoinMeeting}
                type="button"
                variant="primary"
              >
                Join with Google Meet
              </Button>
              <p className="mt-2 text-sm text-gray-500 break-all">
                {selectedEvent?.room_url}
              </p>
            </div>
          </div>
          <div className="flex justify-between">
            <Button
              type="button"
              variant="primary"
              handleClick={handleMeetingCancel}
            >
              Cancel Meeting
            </Button>
            <Button
              type="button"
              variant="secondary"
              handleClick={handleCloseModal}
            >
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
