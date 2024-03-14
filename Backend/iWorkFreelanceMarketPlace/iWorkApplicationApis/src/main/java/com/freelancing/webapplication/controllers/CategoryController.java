package com.freelancing.webapplication.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.freelancing.webapplication.payloads.ApiResponse;
import com.freelancing.webapplication.payloads.CategoryDto;
import com.freelancing.webapplication.services.CategoryService;

@RestController
@RequestMapping("freelancing/api/Categories")
public class CategoryController {

	@Autowired
	private CategoryService categoryServices;

	@GetMapping("/allCategories")
	public ResponseEntity<List<CategoryDto>> getAllCategories() {

		return ResponseEntity.ok(this.categoryServices.getAllCategories());
	}

	@GetMapping("/getCategoryByID/{categoryId}")
	public ResponseEntity<CategoryDto> getCategoryById(@PathVariable Integer categoryId) {

		return ResponseEntity.ok(this.categoryServices.getCategoryById(categoryId));
	}

	@PostMapping("/register")
	public ResponseEntity<CategoryDto> addNewCategory(@RequestBody CategoryDto categoryDTO) {
		return new ResponseEntity<CategoryDto>(this.categoryServices.createCategory(categoryDTO),
				HttpStatus.OK);
	}

	@PutMapping("/updateCategoryById/{categoryId}")
	public ResponseEntity<CategoryDto> updateCategory(@RequestBody CategoryDto categoryDTO,
			@PathVariable Integer categoryId) {
		return new ResponseEntity<CategoryDto>(this.categoryServices.updateCategory(categoryDTO, categoryId),
				HttpStatus.OK);
	}

	@DeleteMapping("/deleteById/{categoryId}")
	public ResponseEntity<ApiResponse> deleteById(@PathVariable Integer categoryId) {
		this.categoryServices.deleteCategory(categoryId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Category Deleted Successfully", true), HttpStatus.OK);

	}
}