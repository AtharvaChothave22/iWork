package com.freelancing.webapplication.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancing.webapplication.entities.Category;
import com.freelancing.webapplication.entities.Work;
import com.freelancing.webapplication.entities.User;

public interface PostRepo extends JpaRepository<Work, Integer> {
	List<Work> findByUser(User user);

	List<Work> findByCategory(Category category);

	List<Work> findByTitleContaining(String title);

}
