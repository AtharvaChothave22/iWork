package com.freelancing.webapplication.entities;

import java.util.List;
import java.util.Set;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "users")
@NoArgsConstructor
@Getter
@Setter
public class User extends BaseEntity {

	@Column
	private String name;

	@Column(unique = true)
	private String email;
	@Column
	private String password;
	@Column
	private String mobileNumber;
	@Column
	private String city;
	@Column
	private String country;
	@Column
	private String image;
	@Column
	private String about;
	@Column
	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private List<Work> posts;

	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
	private Set<Comment> comments;

	@OneToMany(mappedBy = "user")
	private Set<Portfolio> porfolio;

	@OneToMany(mappedBy = "user", fetch = FetchType.EAGER,cascade = CascadeType.ALL)
	private List<UserRole> role;
}
