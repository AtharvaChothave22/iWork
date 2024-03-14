package com.freelancing.webapplication.services;

import java.util.List;

import com.freelancing.webapplication.payloads.CategoryDto;


public interface CategoryService {
	 CategoryDto createCategory(CategoryDto Category);
	 CategoryDto updateCategory(CategoryDto Category, Integer categoryId);
	 CategoryDto getCategoryById( Integer categoryId);
	 List<CategoryDto> getAllCategories();
	 void deleteCategory(Integer categoryId);
}
