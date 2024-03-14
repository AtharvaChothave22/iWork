package com.freelancing.webapplication.impl;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import com.freelancing.webapplication.entities.Category;
import com.freelancing.webapplication.entities.Work;
import com.freelancing.webapplication.entities.User;
import com.freelancing.webapplication.exceptions.ResourceNotFoundException;
import com.freelancing.webapplication.model.UserModel;
import com.freelancing.webapplication.payloads.PostDto;
import com.freelancing.webapplication.payloads.PostResponse;
import com.freelancing.webapplication.repositories.CategoryRepo;
import com.freelancing.webapplication.repositories.PostRepo;
import com.freelancing.webapplication.repositories.UserRepo;
import com.freelancing.webapplication.services.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.CrossOrigin;

@Service
@CrossOrigin
public class PostServiceImpl implements PostService {

	@Autowired
	private PostRepo postRepo;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private CategoryRepo categoryRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public void deletePost(Integer postId) {
		Work postToBeDeleted = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "PostId", postId));
		this.postRepo.delete(postToBeDeleted);
	}

	@Override
	public PostDto getPostById(Integer postId) {
		Work post = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "PostId", postId));
		return this.modelMapper.map(post, PostDto.class);
	}

	@Override
	public PostResponse getAllPost(Integer pageNumber, Integer pageSize, String sortBy, String sortDirection) {
		Sort sort = (sortDirection.equalsIgnoreCase("ascending")) ? Sort.by(sortBy).ascending()
				: Sort.by(sortBy).descending();

		Pageable pageale = PageRequest.of(pageNumber, pageSize, sort);
		Page<Work> pagePost = this.postRepo.findAll(pageale);
		List<Work> allPosts = pagePost.getContent();
		List<PostDto> allPostDto = allPosts.stream().map(post -> this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());
		PostResponse postResponse = new PostResponse();
		postResponse.setContent(allPostDto);
		postResponse.setPageNumber(pagePost.getNumber());
		postResponse.setPageSize(pagePost.getSize());
		postResponse.setTotalElements(pagePost.getTotalElements());
		postResponse.setTotalPages(pagePost.getTotalPages());
		postResponse.setLastPage(pagePost.isLast());
		return postResponse;
	}

	@Override
	public PostDto updatePost(PostDto postDto, Integer postId) {
		Work oldPost = this.postRepo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "PostId", postId));
		oldPost.setBudget(postDto.getBudget());
		oldPost.setDescription(postDto.getDescription());
		oldPost.setTitle(postDto.getTitle());
		oldPost.setImage(postDto.getImage());
		oldPost.setStatus(postDto.isStatus());
		this.postRepo.save(oldPost);
		return this.modelMapper.map(oldPost, PostDto.class);
	}

	@Override
	public List<PostDto> getAllPostByUser(Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "UserId", userId));
		List<Work> allPosts = this.postRepo.findByUser(user);
		List<PostDto> allPostDto = allPosts.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());
		return allPostDto;
	}

	@Override
	public List<PostDto> getAllPostByCategory(Integer CategoryId) {
		Category category = this.categoryRepo.findById(CategoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "CategoryId", CategoryId));
		List<Work> posts = this.postRepo.findByCategory(category);
		posts.stream().forEach(e -> System.out.println(e.getTitle()));
		List<PostDto> allPosts = posts.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());
		return allPosts;
	}

	@Override
	public List<PostDto> searchPost(String keyword) {
		List<Work> searchedPost = this.postRepo.findByTitleContaining(keyword);
		List<PostDto> searchedPostDTO = searchedPost.stream().map((post) -> this.modelMapper.map(post, PostDto.class))
				.collect(Collectors.toList());

		return searchedPostDTO;
	}

	@Override
	public PostDto createPost(PostDto postDTO, Integer userId, Integer categoryId) {

		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
		Category category = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

		Work post = this.modelMapper.map(postDTO, Work.class);
		post.setCategory(category);
		post.setUser(user);
		post.setStatus(true);
		Work newpost = this.postRepo.save(post);
		return this.modelMapper.map(newpost, PostDto.class);
	}

	@Override
	public UserModel getUserByPostId(Integer id) {
		Work work = postRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
		User user = work.getUser();
		return modelMapper.map(user, UserModel.class);
	}
}
