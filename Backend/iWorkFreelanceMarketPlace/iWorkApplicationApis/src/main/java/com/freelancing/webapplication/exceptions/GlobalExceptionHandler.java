package com.freelancing.webapplication.exceptions;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.freelancing.webapplication.payloads.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(MethodArgumentNotValidException.class)
	public ResponseEntity<Map<String, String>> handleMethodArgumentNotValidException(
			MethodArgumentNotValidException ex) {
		Map<String, String> errResult = new HashMap<>();

		ex.getBindingResult().getAllErrors().forEach((error) -> {
			String fieldName = ((FieldError) error).getField();
			String message = error.getDefaultMessage();
			errResult.put(fieldName, message);
		});

		return new ResponseEntity<>(errResult, HttpStatus.BAD_REQUEST);
	}

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(ResourceNotFoundException ex) {
		String message = ex.getMessage();
		ApiResponse apiResponce = new ApiResponse(message, false);
		return new ResponseEntity<ApiResponse>(apiResponce, HttpStatus.NOT_FOUND);

	}

	@ExceptionHandler(RuntimeException.class)
	public ResponseEntity<ApiResponse> resourceNotFoundExceptionHandler(RuntimeException ex) {
		String message = ex.getMessage();
		ApiResponse apiResponce = new ApiResponse(message, false);
		return new ResponseEntity<ApiResponse>(apiResponce, HttpStatus.NOT_FOUND);

	}
}
