package com.freelancing.webapplication.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "comment")
public class Comment extends BaseEntity {

	@Column(length = 2000, nullable = false)
	@NotEmpty(message = "Fill enter the commment")
	private String content;

	@ManyToOne
	@JoinColumn(name = "postId")
	private Work post;

	@ManyToOne
	@JoinColumn(name = "userId")
	private User user;

	@ManyToOne
	@JoinColumn(name="portfolio_id")
	private Portfolio portfolio;

}
