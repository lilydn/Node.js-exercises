// changing require/module.exports syntax to => import/export syntax.
// const notes = require('./notes.js');
// const { expect, beforeEach } = require('@jest/globals');
import notes from './notes.js';
import { expect, beforeEach } from 'jest';

describe('notes', () => {

  beforeEach(notes.resetNotes);

  describe('addNote', () => {
    it('should add a new note if note title is not taken', () => {
      const expected = [
        { title: 'FirstNote', body: 'note details' },
        { title: 'SecondNote', body: 'green, blue' }
      ];
      const result = notes.addNote('SecondNote', 'green, blue');

      expect(result).toEqual(expected);
    });

    it('shouldn\'t add a new note if note title is taken', () => {
      const expected = [
        { title: 'FirstNote', body: 'note details' }
      ];
      const result = notes.addNote('FirstNote', 'green, blue');

      expect(result).toEqual(expected);
    });
  });


  describe('removeNote', () => {
    it('should remove a note with a given title if it exists', () => {
      const expected = [];
      const result = notes.removeNote('FirstNote');

      expect(result).toEqual(expected);
    });

    it('shouldn\'t remove a note if it doesn\'t exist', () => {
      const expected = [
        { title: 'FirstNote', body: 'note details' }
      ];
      const result = notes.removeNote('SecondNote');

      expect(result).toEqual(expected);
    });
  });


  describe('listNotes', () => {
    it('should print a list (as string) of existing note titles', () => {
      notes.addNote('SecondNote', 'some details');
      notes.addNote('ThirdNote', 'another details');
      const expected = `FirstNote\nSecondNote\nThirdNote\n`;
      const result = notes.listNotes();

      expect(result).toEqual(expected);
    });

    it('should print an empty string if there are no notes', () => {
      notes.removeNote('FirstNote');
      const expected = '';
      const result = notes.listNotes();

      expect(result).toEqual(expected);
    });
  });


  describe('readNote', () => {
    it('should return a note with a given title if it exists', () => {
      const expected = { title: 'FirstNote', body: 'note details' };
      const result = notes.readNote('FirstNote');

      expect(result).toEqual(expected);
    });

    it('should return undefined if it note doesn\'t exist', () => {
      const expected = undefined;
      const result = notes.readNote('NotExistingNote');

      expect(result).toEqual(expected);
    });
  });
  

});
