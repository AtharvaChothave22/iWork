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
import org.springframework.web.bind.annotation.RestController;

import com.freelancing.webapplication.model.AuthToken;
import com.freelancing.webapplication.model.UserModel;
import com.freelancing.webapplication.payloads.ChangePasswordDto;
import com.freelancing.webapplication.payloads.LoginRequestDto;
import com.freelancing.webapplication.payloads.UserDetailDto;
import com.freelancing.webapplication.payloads.UserDto;
import com.freelancing.webapplication.services.UserService;
import jakarta.validation.Valid;

@RestController
@RequestMapping("freelancing/api/users")
public class UserController {

	@Autowired
	private UserService userService;

	@PostMapping("/register")
	public ResponseEntity<AuthToken> createUser(@Valid @RequestBody UserDto userDto) {
		userService.createUser(userDto);
		return login(new LoginRequestDto(userDto.getEmail(), userDto.getPassword()));

	}

	@PostMapping("/login")
	public ResponseEntity<AuthToken> login(@Valid @RequestBody LoginRequestDto dto) {
		return ResponseEntity.ok(userService.login(dto));

	}

	@PutMapping("/change-password")
	public ResponseEntity<String> changePassword(@Valid @RequestBody ChangePasswordDto dto) {

		return ResponseEntity.ok(userService.changePassword(dto));

	}

	@PutMapping("/updateUserById/{userId}")
	public ResponseEntity<UserDto> updateUser(@Valid @RequestBody UserDetailDto userDto, @PathVariable Integer userId) {
		UserDto updatedUser = this.userService.updateUser(userDto, userId);
		return new ResponseEntity<UserDto>(updatedUser, HttpStatus.OK);
	}

	@DeleteMapping("/deleteById/{userId}")
	public ResponseEntity<String> deleteUser(@PathVariable Integer userId) {
		this.userService.deleteUser(userId);
		return new ResponseEntity<String>("user deleted successfully", HttpStatus.OK);

	}

	@GetMapping("/allUsers")
	public ResponseEntity<List<UserDetailDto>> getAllUsers() {

		return ResponseEntity.ok(this.userService.getAllUsers());

	}

	// @PreAuthorize("isAuthenticated()")
	@GetMapping("/userById/{userId}")
	public ResponseEntity<UserModel> findUserById(@PathVariable Integer userId) {

		return ResponseEntity.ok(this.userService.getUserById(userId));

	}

}
