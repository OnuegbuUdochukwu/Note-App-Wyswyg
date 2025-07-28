# 📝 Basic Notes App API

A simple Spring Boot REST API for managing an in-memory list of notes.  
Part of the **120 Spring Boot Projects** challenge.

---

## 📁 Project Number:
**09-basic-notes-app-api**

---

## 📖 Features

- Add a new note
- Retrieve all notes
- Retrieve a note by ID
- Update a note by ID
- Delete a note by ID

---

## 📦 Tech Stack

- Java 21
- Spring Boot
- Spring Web
- Lombok

---

## 📑 Endpoints

| Method | Endpoint        | Description             |
|:--------|:----------------|:-------------------------|
| `GET`    | `/api/notes`       | Get all notes              |
| `GET`    | `/api/notes/{id}`  | Get a note by its ID        |
| `POST`   | `/api/notes`       | Add a new note             |
| `PUT`    | `/api/notes/{id}`  | Update a note by its ID     |
| `DELETE` | `/api/notes/{id}`  | Delete a note by its ID     |

---

## 📬 Sample JSON Request

**For `POST /api/notes`**
```json
{
  "title": "Learn Spring Boot",
  "content": "Today I built my first REST API!"
}
