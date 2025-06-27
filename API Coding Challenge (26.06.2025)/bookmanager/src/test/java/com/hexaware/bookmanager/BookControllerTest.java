package com.hexaware.bookmanager;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.hexaware.bookmanager.model.Book;
import com.hexaware.bookmanager.repository.BookRepository;

@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest {
    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private ObjectMapper objectMapper;

    @BeforeEach
    void setUp() {
        bookRepository.deleteAll();
    }

    @Test
    void addBook() throws Exception {
        Book book = new Book();
        book.setIsbn("1111111111");
        book.setTitle("Test Book");
        book.setAuthor("Test Author");
        book.setPublicationYear(2025);

        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(book)))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.title").value("Test Book"));
    }

    @Test
    void getAllBooks() throws Exception {
        Book book = new Book();
        book.setIsbn("2222222222");
        book.setTitle("Book 2");
        book.setAuthor("Author 2");
        book.setPublicationYear(2024);
        bookRepository.save(book);

        mockMvc.perform(get("/api/books"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].isbn").value("2222222222"));
    }

    @Test
    void updateBook() throws Exception {
        Book book = new Book();
        book.setIsbn("3333333333");
        book.setTitle("Old Title");
        book.setAuthor("Old Author");
        book.setPublicationYear(2023);
        bookRepository.save(book);

        book.setTitle("New Title");
        book.setAuthor("New Author");

        mockMvc.perform(put("/api/books/" + book.getIsbn())
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(book)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("New Title"))
                .andExpect(jsonPath("$.author").value("New Author"));
    }

    @Test
    void deleteBook() throws Exception {
        Book book = new Book();
        book.setIsbn("4444444444");
        book.setTitle("To Delete");
        book.setAuthor("Author");
        book.setPublicationYear(2022);
        bookRepository.save(book);

        mockMvc.perform(delete("/api/books/" + book.getIsbn()))
                .andExpect(status().isNoContent());
    }
}