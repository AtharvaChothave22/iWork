package com.freelancing.webapplication.impl;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.freelancing.webapplication.config.JwtService;
import com.freelancing.webapplication.entities.Role;
import com.freelancing.webapplication.entities.User;
import com.freelancing.webapplication.entities.UserRole;
import com.freelancing.webapplication.exceptions.ResourceNotFoundException;
import com.freelancing.webapplication.model.AuthToken;
import com.freelancing.webapplication.model.UserModel;
import com.freelancing.webapplication.payloads.ChangePasswordDto;
import com.freelancing.webapplication.payloads.LoginRequestDto;
import com.freelancing.webapplication.payloads.UserDetailDto;
import com.freelancing.webapplication.payloads.UserDto;
import com.freelancing.webapplication.repositories.RoleRepository;
import com.freelancing.webapplication.repositories.UserRepo;
import com.freelancing.webapplication.repositories.UserRoleRepository;
import com.freelancing.webapplication.services.UserService;

import jakarta.transaction.Transactional;
import jakarta.validation.Valid;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private UserRoleRepository userRoleRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private JwtService jwtService;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
	private AuthenticationManager authenticationManager;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Transactional
	@Override
	public User createUser(UserDto dto) {
		User user = modelMapper.map(dto, User.class);
		user.setEmail(dto.getEmail().toLowerCase());
		user.setPassword(passwordEncoder.encode(dto.getPassword()));

		Role foundRole = roleRepository.findByName(dto.getRoleType());
		if (foundRole == null)
			throw new RuntimeException("Role not found");
		user = userRepo.save(user);
		UserRole userRole = new UserRole();
		userRole.setRole(foundRole);
		userRole.setUser(user);
		userRole = userRoleRepository.save(userRole);
		user.setRole(Arrays.asList(userRole));

		return user;
	}

	@Override
	public AuthToken login(LoginRequestDto dto) {
		Authentication authentication = authenticationManager.authenticate(
				new UsernamePasswordAuthenticationToken(dto.getEmail(), dto.getPassword()));

		if (authentication.isAuthenticated()) {
			UserDetails userDetails = (UserDetails) authentication.getPrincipal();

			String accessToken = jwtService.generateToken(userDetails);
			AuthToken tokenDto = new AuthToken();
			tokenDto.setAccessToken(accessToken);
			User user = userRepo.findByEmail(dto.getEmail())
					.orElseThrow(() -> new ResourceNotFoundException("user", "Email", 400));
			UserModel mappedModel = modelMapper.map(user, UserModel.class);
			List<UserRole> userRole = user.getRole();
			for (UserRole userRole2 : userRole) {
				mappedModel.getRoles().add(userRole2.getRole().getName().name());
			}
			tokenDto.setUserModel(mappedModel);
			return tokenDto;

		} else {
			throw new RuntimeException("Internal Server Error");
		}
	}

	@Override
	public UserDto updateUser(UserDetailDto user, Integer userId) {
		User getUser = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));

		getUser.setAbout(user.getAbout());
		getUser.setCity(user.getCity());
		getUser.setCountry(user.getCountry());
		getUser.setName(user.getName());
		getUser.setMobileNumber(user.getMobileNumber());
		getUser.setImage(user.getImage());
		User updatedUser = this.userRepo.save(getUser);
		return this.modelMapper.map(updatedUser, UserDto.class);
	}

	@Override
	public UserModel getUserById(Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", userId));
		return this.modelMapper.map(user, UserModel.class);
	}

	@Override
	public List<UserDetailDto> getAllUsers() {
		List<User> allUsers = this.userRepo.findAll();
		List<UserDetailDto> result = allUsers.stream().map(user -> this.modelMapper.map(user, UserDetailDto.class))
				.collect(Collectors.toList());
		return result;
	}

	@Override
	public void deleteUser(Integer userId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "id", userId));
		this.userRepo.delete(user);

	}

	@Transactional
	@Override
	public String changePassword(ChangePasswordDto dto) {
		User user = userRepo.findById(dto.getUserId())
				.orElseThrow(() -> new ResourceNotFoundException("User", "Id", HttpStatus.NOT_FOUND.value()));

		if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
			return "old password didn't match";
		}

		String newEncryptedPassword = passwordEncoder.encode(dto.getNewPassword());

		user.setPassword(newEncryptedPassword);
		userRepo.save(user);

		return "password changed successfully";
	}

}
