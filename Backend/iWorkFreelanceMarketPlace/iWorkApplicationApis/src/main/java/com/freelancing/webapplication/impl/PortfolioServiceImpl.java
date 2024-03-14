package com.freelancing.webapplication.impl;

import java.util.List;
import java.util.stream.Collectors;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.freelancing.webapplication.entities.Category;
import com.freelancing.webapplication.entities.Portfolio;
import com.freelancing.webapplication.entities.User;
import com.freelancing.webapplication.exceptions.ResourceNotFoundException;
import com.freelancing.webapplication.model.UserModel;
import com.freelancing.webapplication.payloads.PortfolioDto;
import com.freelancing.webapplication.repositories.CategoryRepo;
import com.freelancing.webapplication.repositories.PortfolioRepo;
import com.freelancing.webapplication.repositories.UserRepo;
import com.freelancing.webapplication.services.PortfolioService;

@Service
public class PortfolioServiceImpl implements PortfolioService {

	@Autowired
	private PortfolioRepo portfolioRepo;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private UserRepo userRepo;

	@Autowired
	private CategoryRepo categoryRepo;

	@Override
	public PortfolioDto createPortfolio(PortfolioDto portfolioDto, Integer userId, Integer categoryId) {
		User user = this.userRepo.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User", "userId", userId));
		Category category = this.categoryRepo.findById(categoryId)
				.orElseThrow(() -> new ResourceNotFoundException("Category", "categoryId", categoryId));

		Portfolio portfolio = this.modelMapper.map(portfolioDto, Portfolio.class);

		portfolio.setUser(user);
		portfolio.setCategory(category);

		Portfolio newPortfolio = this.portfolioRepo.save(portfolio);
		return this.modelMapper.map(newPortfolio, PortfolioDto.class);

	}

	@Override
	public PortfolioDto updatePortfolio(PortfolioDto portfolioDto, Integer portfolioId) {

        Portfolio oldPortfolio = this.portfolioRepo.findById(portfolioId)
				.orElseThrow(() -> new ResourceNotFoundException("Portfolio", "portfolioId", portfolioId));
						
		oldPortfolio.setTitle(portfolioDto.getTitle());
		oldPortfolio.setDescription(portfolioDto.getDescription());
		oldPortfolio.setHourlyCharges(portfolioDto.getHourlyCharges());
		oldPortfolio.setImage(oldPortfolio.getImage());
	    this.portfolioRepo.save(oldPortfolio);
		Portfolio updatedportfolio = this.portfolioRepo.save(oldPortfolio);
		return this.modelMapper.map(updatedportfolio, PortfolioDto.class);
	}

	@Override
	public PortfolioDto getallPortfolioById(Integer portfolioId) {
		Portfolio portfolio = this.portfolioRepo.findById(portfolioId)
				.orElseThrow(() -> new ResourceNotFoundException("portfolioId", "portfolioId", portfolioId));
		return this.modelMapper.map(portfolio, PortfolioDto.class);

	}

	@Override
	public List<PortfolioDto> getAllPortfolio() {
		List<Portfolio> allPortfolio = this.portfolioRepo.findAll();
		List<PortfolioDto> allPortfolioDTO = allPortfolio.stream()
				.map(portfolio -> this.modelMapper.map(portfolio, PortfolioDto.class)).collect(Collectors.toList());
		return allPortfolioDTO;

	}
	
	@Override
	public List<PortfolioDto> getAllPortfolioByUserId(Integer UserId) {
		List<Portfolio> allPortfolio = this.portfolioRepo.findAll();
		List<PortfolioDto> allPortfolioDTO = allPortfolio.stream()
				.map(portfolio -> this.modelMapper.map(portfolio, PortfolioDto.class)).collect(Collectors.toList());
		return allPortfolioDTO;

	}

	@Override
	public void deletePortfolio(Integer portfolioId) {
		Portfolio portfolio = this.portfolioRepo.findById(portfolioId)
				.orElseThrow(() -> new ResourceNotFoundException("portfolio", "portfolioId", portfolioId));
		this.portfolioRepo.delete(portfolio);

	}

	@Override
	public UserModel getUserByPostId(Integer id) {
		Portfolio portfolio = this.portfolioRepo.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("portfolio", "portfolioId", id));
		User user = portfolio.getUser();
		return modelMapper.map(user, UserModel.class);
	}

}
