package com.freelancing.webapplication.controllers;

import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.freelancing.webapplication.model.UserModel;
import com.freelancing.webapplication.payloads.ApiResponse;
import com.freelancing.webapplication.payloads.PortfolioDto;
import com.freelancing.webapplication.services.PortfolioService;

@RestController
@RequestMapping("freelancing/api/Portfolio")
public class PortFolioController {

	@Autowired
	private PortfolioService portfolioServices;

	@GetMapping("/allPortfolio")
	public ResponseEntity<List<PortfolioDto>> getAllPortfolio() {

		return new ResponseEntity<List<PortfolioDto>>(
				this.portfolioServices.getAllPortfolio(), HttpStatus.OK);

	}

	@GetMapping("/getPortfolioByID/{portfolioId}")
	public ResponseEntity<PortfolioDto> getPortfolioById(@PathVariable Integer portfolioId) {

		return ResponseEntity.ok(this.portfolioServices.getallPortfolioById(portfolioId));
	}

	@PostMapping("/createportfolio/{userId}/category/{categoryId}")
	public ResponseEntity<PortfolioDto> addNewCategory(@RequestBody PortfolioDto portfolioDto,
			@PathVariable Integer userId,
			@PathVariable Integer categoryId) {

		PortfolioDto portfolioDtoResponse = this.portfolioServices.createPortfolio(portfolioDto, userId, categoryId);
		return new ResponseEntity<PortfolioDto>(portfolioDtoResponse, HttpStatus.OK);

	}

	@DeleteMapping("/deleteById/{portfolioId}")
	public ResponseEntity<ApiResponse> deleteportfolioById(@PathVariable Integer portfolioId) {
		this.portfolioServices.deletePortfolio(portfolioId);
		return new ResponseEntity<ApiResponse>(new ApiResponse("portfolio Deleted Successfully", true), HttpStatus.OK);
	}

	@PutMapping("/updateportfolioById/{portfolioId}")
	public ResponseEntity<PortfolioDto> updateCategory(@RequestBody PortfolioDto portfolioDto,
			@PathVariable Integer portfolioId) {
		return new ResponseEntity<PortfolioDto>(this.portfolioServices.updatePortfolio(portfolioDto, portfolioId),
				HttpStatus.ACCEPTED);
	}

	@GetMapping("/user/{id}")
	public ResponseEntity<UserModel> getMethodName(@PathVariable("id") Integer id) {
		return ResponseEntity.ok(portfolioServices.getUserByPostId(id));

	}

}
