package com.codewithudo.basicnotesappapi.controller;

import com.codewithudo.basicnotesappapi.model.Note;
import com.codewithudo.basicnotesappapi.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:10001", "http://localhost:10002", "https://note-app-wyswyg-frontend.vercel.app/"})
@RequestMapping("/api/notes")
public class NoteController {

    @Autowired
    private NoteService noteService;

    @GetMapping
    public ResponseEntity<ArrayList<Note>>  getAllNotes() {
        return new ResponseEntity<>(noteService.getAllNotes(),  HttpStatus.OK) ;
    }

    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable int id) {
        Note foundNote = noteService.getNoteById(id);
        if (foundNote == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(foundNote, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<String> addNote(@RequestBody Note note) {
        boolean result = noteService.addNote(note);
        if (result) {
            return new ResponseEntity<>("Note Successfully added", HttpStatus.CREATED);
        }
        return new ResponseEntity<>("Note Not added",HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{id}")
    public ResponseEntity<String> updateNote(@PathVariable int id, @RequestBody Note note) {
        boolean foundNote = noteService.updateNote(id, note);
        if (foundNote) {
            return new ResponseEntity<>("Note Successfully updated", HttpStatus.OK);
        }
        return new ResponseEntity<>("Note doesn't Exist",HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteNote(@PathVariable int id) {
        boolean deleted = noteService.deleteNoteById(id);
        if (deleted) {
            return new ResponseEntity<>("Note Successfully deleted", HttpStatus.OK);
        }
        return new ResponseEntity<>("Note doesn't Exist",HttpStatus.NOT_FOUND);
    }
}
