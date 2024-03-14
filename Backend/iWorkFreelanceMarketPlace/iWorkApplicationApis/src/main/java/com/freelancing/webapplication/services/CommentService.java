package com.freelancing.webapplication.services;

import java.util.List;

import com.freelancing.webapplication.payloads.CommentDto;


public interface CommentService {
	CommentDto createComment (CommentDto commentDto , Integer postId);
	void deleteComment(Integer commentId);
     List<CommentDto> getAllCommentByPost(Integer postId);
    List<CommentDto> getAllCommentByPortFolio(Integer portFolioId);
}
