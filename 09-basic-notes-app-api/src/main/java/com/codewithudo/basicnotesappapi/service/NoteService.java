package com.codewithudo.basicnotesappapi.service;

import com.codewithudo.basicnotesappapi.model.Note;
import org.springframework.stereotype.Service;

import java.util.ArrayList;

@Service
public class NoteService {

    private ArrayList<Note> notes = new ArrayList<>();
    private int nextId = 1;

//    public NoteService(ArrayList<Note> notes) {
//        this.notes = notes;
//        this.nextId = notes.size();
//    }

    public ArrayList<Note> getAllNotes(){
        return notes;
    }

    public Note getNoteById(int id){
        for (Note note : notes) {
            if (note.getId() == id) {
                return note;
            }
        }
        return null;
    }

    public boolean addNote(Note note) {
        notes.add(note);
        note.setId(nextId++);
        return true;
    }

    public boolean updateNote(int id, Note note) {
        for(Note n : notes) {
            if(n.getId() == id){
                n.setTitle(note.getTitle());
                n.setContent(note.getContent());
                return true;
            }
        }
        return false;
    }

    public boolean deleteNoteById(int id) {
        return notes.removeIf(note -> note.getId() == id);
    }
}
