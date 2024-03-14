package com.freelancing.webapplication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancing.webapplication.entities.Category;

public interface CategoryRepo extends JpaRepository<Category, Integer> {

}
