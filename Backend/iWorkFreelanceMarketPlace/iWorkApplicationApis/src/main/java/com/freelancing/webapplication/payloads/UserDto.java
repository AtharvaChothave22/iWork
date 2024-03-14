package com.freelancing.webapplication.payloads;


import com.freelancing.webapplication.entities.RoleType;

import jakarta.validation.constraints.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class UserDto {

	@NotNull
	@Size(min = 4, message = "User name must be minimum four character")
	private String name;

	@Email(message = "Please enter valid Email")
	private String email;

	@NotNull
	@Size(min = 5, max = 12, message = "Please enter a valid passwoed between 5 to 10 characters")
	private String password;

	@NotNull
	private String mobileNumber;

	@NotNull
	private RoleType roleType;


}
