package com.freelancing.webapplication.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.freelancing.webapplication.entities.Comment;
import com.freelancing.webapplication.entities.Portfolio;
import com.freelancing.webapplication.entities.Work;
import com.freelancing.webapplication.exceptions.ResourceNotFoundException;
import com.freelancing.webapplication.payloads.CommentDto;
import com.freelancing.webapplication.repositories.CommentRepo;
import com.freelancing.webapplication.repositories.PortfolioRepo;
import com.freelancing.webapplication.repositories.PostRepo;
import com.freelancing.webapplication.services.CommentService;


@Service
public class CommentServiceImpl implements CommentService {



    @Autowired
	private PortfolioRepo portfolioRepo;

	@Autowired
	private PostRepo postReo;
	@Autowired
	private CommentRepo commentRepo;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public CommentDto createComment(CommentDto commentDTO, Integer postId) {
		
		Work post = this.postReo.findById(postId)
				.orElseThrow(() -> new ResourceNotFoundException("Post", "Post_Id", postId));
		Comment comment = this.modelMapper.map(commentDTO, Comment.class);
		comment.setPost(post);
		Comment savedComment = this.commentRepo.save(comment);
		return this.modelMapper.map(savedComment, CommentDto.class);
	}

	@Override
	public void deleteComment(Integer commentId) {

		Comment comment = this.commentRepo.findById(commentId)
				.orElseThrow(() -> new ResourceNotFoundException("comment", "comment_Id", commentId));
		this.commentRepo.delete(comment);
	}

	@Override
	public List<CommentDto> getAllCommentByPortFolio(Integer portfolioId) {
	Portfolio portfolio = this.portfolioRepo.findById(portfolioId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "UserId", portfolioId));
		List<Comment> allPosts = this.commentRepo.findByPortfolio(portfolio);
		List<CommentDto> allCommentDto = allPosts.stream().map((post) -> this.modelMapper.map(post, CommentDto.class))
				.collect(Collectors.toList());
		return allCommentDto;
		
	}

	@Override
	public List<CommentDto> getAllCommentByPost(Integer postId) {
		Work posts = this.postReo.findById(postId).orElseThrow(() -> new ResourceNotFoundException("Post", "PostId", postId));
		List<Comment> allPosts = this.commentRepo.findByPost(posts);
		List<CommentDto> allCommentDto = allPosts.stream().map((post) -> this.modelMapper.map(post, CommentDto.class))
				.collect(Collectors.toList());
		return allCommentDto;
	}


}
