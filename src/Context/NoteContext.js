import axios from "axios";
import { createContext, useState } from "react";
import Swal from "sweetalert2";

export let noteContext = createContext();

export function NoteProvider({ children }) {
  const [Notes, setNotes] = useState(null);

  // ===================>Show Add Notes Model
  function getAddModel(token) {
    Swal.fire({
      title: "Add Note",
      html: `
          <input type="text" placeholder="Enter a Title" id="title" name="title"  class="form-control"/>
          <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3"></textarea>
          `,
      showCancelButton: true,
      confirmButtonText: "Add",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const title = document.getElementById("title")?.value;
        const content = document.getElementById("content")?.value;
        return { title, content };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if(result.value){
        sendData({
          title: result?.value.title,
          content: result?.value.content,
          token,
        });
      }
     
    });
  }
  // ===================> Send Data to Api to Add Notes
  async function sendData({ title, content, token }) {
    const res = await axios
      .post(
        "ApiKey",
        { title, content },
        {
          headers: {
            token,
          },
        }
      )
      .catch((e) =>  Swal.fire({
        position: "center",
        icon: "error",
        title: e.response.data.msg,
        showConfirmButton: false,
        timer: 1500,
      }));
    if (res?.data?.msg === "done") {
      getAllNotes(token);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Your Note has been added",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }
  // ===================> Get All Notes
  async function getAllNotes(token) {
    try {
      let { data } = await axios.get(
        "apikey",
        {
          headers: {
            token,
          },
        }
      );
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
      setNotes([]);
    }
  }
  // ===================> Show Delete Notes Model
  function getDeleteModal({ noteID, token }) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        delteNote({ noteID, token });
      }
    });
  }
  // ===================> Send Data to Api to Delete Notes
  async function delteNote({ noteID, token }) {
    const { data } = await axios
      .delete(`apikey${noteID}`, {
        headers: { token },
      })
      .catch((e) => {
        getAllNotes(token);
      });
    console.log(data);
    getAllNotes(token);
    Swal.fire("Deleted!", "Your Note has been deleted.", "success");
  }
  // ===================> Show Update Notes Model
  function showUpdatemodal({ prevTitle, prevContent, noteID, token }) {
    Swal.fire({
      title: "Update Note",
      html: `
          <input type="text" placeholder="Enter a Title" id="title" name="title" class="form-control" value="${prevTitle}"/>
          <textarea type="text" placeholder="Enter a Description" id="content" name="content" class="form-control mt-3">${prevContent}</textarea>
          `,
      showCancelButton: true,
      confirmButtonText: "Update",
      showLoaderOnConfirm: true,

      preConfirm: () => {
        const title = document.getElementById("title").value;
        const content = document.getElementById("content").value;
        return { title, content };
      },

      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      console.log(result);
      sendUpdateData({
        noteID,
        token,
        title: result.value.title,
        content: result.value.content,
      });
    });
  }
  // ===================> Send Data to Api to Update Notes
  async function sendUpdateData({ noteID, token, title, content }) {
    const { data } = await axios.put(
      `apikey${noteID}`,
      { title, content },
      { headers: { token } }
    );

    getAllNotes(token);

    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your Note has been updated",
      showConfirmButton: false,
      timer: 1000,
    });
  }
  return (
    <noteContext.Provider
      value={{
        getAddModel,
        getAllNotes,
        Notes,
        getDeleteModal,
        showUpdatemodal,
      }}
    >
      {children}
    </noteContext.Provider>
  );
}

