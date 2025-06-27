package com.hexaware.bookmanager.repository;

import com.hexaware.bookmanager.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, String> {
} 