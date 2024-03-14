package com.freelancing.webapplication.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancing.webapplication.entities.Comment;
import com.freelancing.webapplication.entities.Work;
import com.freelancing.webapplication.entities.Portfolio;

public interface CommentRepo extends JpaRepository<Comment, Integer> {
	List<Comment> findByPost(Work post);
	List<Comment>findByPortfolio(Portfolio portfolio);
}
