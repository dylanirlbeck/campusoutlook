import React from "react";
import Modal from "react-modal";
import "./EventModal.css";
import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";
import AttendForm from "./AttendForm";

const GET_EVENT = gql`
  query Event($eventID: String!) {
    event(id: $eventID) {
      name
      description
      attendees {
        first_name
      }
      time {
        start
        end
      }
    }
  }
`;

const EventModal = props => {
  const { modalIsOpen, closeModal, id } = props;
  const { loading, error, data } = useQuery(GET_EVENT, {
    variables: { eventID: id },
  });

  return (
    <Modal
      isOpen={modalIsOpen}
      style={{
        overlay: {},
        content: {
          position: "absolute",
          top: "0px",
          left: "0px",
          right: "0px",
          bottom: "0px",
          border: "none",
          overflow: "auto",
          WebkitOverflowScrolling: "touch",
          outline: "none",
          backgroundColor: "rgba(255, 255, 255, 0.1)",
        },
      }}
      onRequestClose={closeModal}
      className="relative z-10 flex items-center justify-center bg-red-200">
      overlayClassName="EventModalOverlay"
      <div className="flex flex-grow w-full overflow-hidden EventModalContainer">
        <div className="w-full h-full">
          <div className="h-full">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <div className="flex flex-col px-6 py-8">
                <h2 class="mt-0 mb-2 text-red-700 text-bold text-3xl">
                  {data.event.name}
                </h2>
                <p className="text-s">{data.event.description}</p>
                <p className="text-s">
                  Start: {new Date(data.event.time.start).toDateString()}
                </p>
                <p className="text-s">
                  End: {new Date(data.event.time.end).toDateString()}
                </p>
              </div>
            )}
          </div>
          <div className="z-10">
            <AttendForm />
          </div>
          <div className="sticky bottom-0 z-10 flex flex-row justify-center w-full p-4 border rounded text-md">
            <button
              className="flex w-20 px-5 py-1 text-white bg-red-800 border border-red-800 rounded l-0 hover:bg-red-900"
              onClick={closeModal}>
              Done
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default EventModal;
