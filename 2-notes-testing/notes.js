// const fs = require('fs');
// const chalk = require('chalk');

// changing require/module.exports syntax to => import/export syntax.
import fs from 'fs';
import chalk from 'chalk';


// ---------------------------- //

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    })
    saveNotes(notes);
    console.log(chalk.green.inverse('New note added!'));
  } else {
    console.log(chalk.red.inverse('Note title taken!'));
  }
  return loadNotes();
}

// ---------------------------- //

const removeNote = (title) => {
  const notes = loadNotes();
  const notesToKeep = notes.filter((note) => note.title !== title);

  if (notes.length > notesToKeep.length) {
    console.log(chalk.green.inverse('Note removed!'))
    saveNotes(notesToKeep)
  } else {
    console.log(chalk.red.inverse('No note found!'))
  }
  return notesToKeep;
}

// ---------------------------- //

const listNotes = () => {
  const notes = loadNotes();

  console.log(chalk.inverse('Your notes'));

  let result = '';
  notes.forEach((note) => {
    result = result.concat(`${note.title}\n`);
  });

  console.log(result);
  return result;
}

// ---------------------------- //

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);

  if (note) {
    console.log(chalk.inverse(note.title));
    console.log(note.body);
  } else {
    console.log(chalk.red.inverse('Note not found!'));
  }
  return note;
}

// ---------------------------- //

// load notes from our database
const loadNotes = () => {
  // defensive code (if the file does not exist)
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return []
  }
}

// save to database
const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

// ---------------------------- //

const resetNotes = () => {
  const notes = [
    { title: 'FirstNote', body: 'note details' }
  ];
  saveNotes(notes);
}

// exporting multiple functions/variables
// module.exports = {
//   addNote: addNote,
//   removeNote: removeNote,
//   listNotes: listNotes,
//   readNote: readNote,
//   resetNotes: resetNotes,
// }

// changing require/module.exports syntax to => import/export syntax.
export default {
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote,
  resetNotes: resetNotes,
}