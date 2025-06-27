package com.hexaware.bookmanager.controller;

import com.hexaware.bookmanager.model.Book;
import com.hexaware.bookmanager.service.BookService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/api/books")
public class BookController {
    @Autowired
    private BookService bookService;

    @GetMapping
    public List<Book> getAllBooks() {
        return bookService.getAllBooks();
    }

    @GetMapping("/{isbn}")
    public ResponseEntity<Book> getBookByIsbn(@PathVariable String isbn) {
        return bookService.getBookByIsbn(isbn)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<?> addBook(@Valid @RequestBody Book book) {
        if (bookService.getBookByIsbn(book.getIsbn()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Book with this ISBN already exists.");
        }
        Book savedBook = bookService.addBook(book);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBook);
    }

    @PutMapping("/{isbn}")
    public ResponseEntity<?> updateBook(@PathVariable String isbn, @Valid @RequestBody Book book) {
        return bookService.updateBook(isbn, book)
                .map(updatedBook -> ResponseEntity.ok().body(updatedBook))
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{isbn}")
    public ResponseEntity<?> deleteBook(@PathVariable String isbn) {
        if (!bookService.getBookByIsbn(isbn).isPresent()) {
            return ResponseEntity.notFound().build();
        }
        bookService.deleteBook(isbn);
        return ResponseEntity.noContent().build();
    }

    // @GetMapping("/public")
    // public String publicEndpoint() {
    //     return "This is a public endpoint.";
    // }
} 