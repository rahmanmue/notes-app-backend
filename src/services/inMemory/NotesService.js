const { nanoid } = require("nanoid");

class NotesService {
  constructor() {
    this._notes = [];
  }

  getNotes() {
    return this._notes;
  }

  getNoteById(id) {
    const note = this._notes.find((note) => note.id == id)[0];

    if (!note) {
      throw new Error("Catatan tidak ditemukan");
    }

    return note;
  }

  addNote({ title, body, tags }) {
    const id = nanoid(16);
    const createAt = new Date().toISOString();
    const updateAt = createAt;

    const newNote = {
      title,
      tags,
      body,
      id,
      createAt,
      updateAt,
    };

    this._notes.push(newNote);

    const isSucces = this._notes.filter((note) => note.id === id).length > 0;

    if (!isSucces) {
      throw new Error("catatan gagal ditambahkan");
    }

    return id;
  }

  editNoteById(id, { title, body, tags }) {
    const index = this._notes.findIndex((note) => note.id == id);

    if (index === -1) {
      throw new Error("Gagal memperbarui catatan. Id tidak ditemukan");
    }

    const updateAt = new Date().toISOString();

    this._notes[index] = {
      ...this._notes[index],
      title,
      tags,
      body,
      updateAt,
    };
  }

  deleteNoteById(id) {
    const index = this._notes.findIndex((note) => note.id === id);

    if (index === -1) {
      throw new Error("Catatan gagal dihapus, id tidak ditemukan");
    }

    this._notes.splice(index, 1);
  }
}

module.exports = NotesService;
