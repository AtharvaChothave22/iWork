package com.freelancing.webapplication.services;

import java.util.List;

import com.freelancing.webapplication.entities.User;
import com.freelancing.webapplication.model.AuthToken;
import com.freelancing.webapplication.model.UserModel;
import com.freelancing.webapplication.payloads.ChangePasswordDto;
import com.freelancing.webapplication.payloads.LoginRequestDto;
import com.freelancing.webapplication.payloads.UserDetailDto;
import com.freelancing.webapplication.payloads.UserDto;

import jakarta.validation.Valid;

public interface UserService {

	User createUser(UserDto user);

	UserDto updateUser(UserDetailDto user, Integer userId);

	UserModel getUserById(Integer userId);

	List<UserDetailDto> getAllUsers();

	void deleteUser(Integer userId);

	AuthToken login(LoginRequestDto dto);

	String changePassword(@Valid ChangePasswordDto dto);

}
