package com.freelancing.webapplication.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.freelancing.webapplication.config.AppConstant;
import com.freelancing.webapplication.model.UserModel;
import com.freelancing.webapplication.payloads.ApiResponse;
import com.freelancing.webapplication.payloads.PostDto;
import com.freelancing.webapplication.payloads.PostResponse;
import com.freelancing.webapplication.services.PostService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("freelancing/api")
public class PostController {

	@Autowired
	private PostService postservice;

	@GetMapping("/allPosts")
	public ResponseEntity<PostResponse> getAllPosts(
			@RequestParam(value = "pageNumber", defaultValue = AppConstant.PAGE_NUMBER, required = false) Integer pageNumber,
			@RequestParam(value = "pageSize", defaultValue = AppConstant.PAGE_SIZE, required = false) Integer pageSize,
			@RequestParam(value = "sortBy", defaultValue = AppConstant.SORT_BY, required = false) String sortBy,
			@RequestParam(value = "sortDirection", defaultValue = AppConstant.SORT_DIRECTION, required = false) String sortDirection) {

		return new ResponseEntity<PostResponse>(
				this.postservice.getAllPost(pageNumber, pageSize, sortBy, sortDirection), HttpStatus.OK);

	}

	@PostMapping("/createpost/{userId}/category/{categoryId}")
	public ResponseEntity<PostDto> createPost(@RequestBody PostDto postDTO, @PathVariable Integer userId,
			@PathVariable Integer categoryId) {

		PostDto postdto = this.postservice.createPost(postDTO, userId, categoryId);
		return new ResponseEntity<PostDto>(postdto, HttpStatus.CREATED);
	}

	@GetMapping("/allPostByCategory/{categoryId}")
	public ResponseEntity<List<PostDto>> getAllPostByCategory(@PathVariable Integer categoryId) {

		List<PostDto> posts = this.postservice.getAllPostByCategory(categoryId);
		return new ResponseEntity<List<PostDto>>(posts, HttpStatus.valueOf(200));
	}

	// @PreAuthorize("isAuthenticated()")
	@GetMapping("/allPostsByUser/{userId}")
	public ResponseEntity<List<PostDto>> getAllPostByUser(@PathVariable Integer userId) {
		List<PostDto> allPost = this.postservice.getAllPostByUser(userId);
		return new ResponseEntity<List<PostDto>>(allPost, HttpStatus.valueOf(200));
	}

	@GetMapping("/getPostById/{postId}")
	public ResponseEntity<PostDto> getPost(@PathVariable Integer postId) {
		PostDto post = this.postservice.getPostById(postId);
		return new ResponseEntity<PostDto>(post, HttpStatus.valueOf(200));

	}

	@DeleteMapping("/deleteById/{postId}")
	public ResponseEntity<ApiResponse> deleteById(@Valid @PathVariable Integer postId) {
		this.postservice.deletePost(postId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("Post is deleted Successfully", true), HttpStatus.OK);

	}

	@PutMapping("/updatePost/{postId}")
	public ResponseEntity<PostDto> updatePostById(@RequestBody PostDto postdto, @PathVariable Integer postId) {
		PostDto updatedPost = this.postservice.updatePost(postdto, postId);
		return new ResponseEntity<PostDto>(updatedPost, HttpStatus.OK);

	}

	@GetMapping("/posts/search/{keywords}")
	public ResponseEntity<List<PostDto>> searchPostByTitle(@PathVariable("keywords") String keywords) {
		List<PostDto> searchedPosts = this.postservice.searchPost(keywords);
		return new ResponseEntity<List<PostDto>>(searchedPosts, HttpStatus.valueOf(200));
	}

	@GetMapping("/posts/{id}")
	public ResponseEntity<UserModel> getMethodName(@PathVariable("id") Integer id) {
		System.out.println("Hi there");
		return ResponseEntity.ok(postservice.getUserByPostId(id));

	}

}
