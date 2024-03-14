package com.freelancing.webapplication.services;

import java.util.List;

import com.freelancing.webapplication.model.UserModel;
import com.freelancing.webapplication.payloads.PortfolioDto;

public interface PortfolioService {

    PortfolioDto createPortfolio(PortfolioDto portfolioDto, Integer userId, Integer categoryId);

    PortfolioDto updatePortfolio(PortfolioDto portfolioDto, Integer portfolioId);

    PortfolioDto getallPortfolioById(Integer portfolioId);

    List<PortfolioDto> getAllPortfolio();

    void deletePortfolio(Integer portfolioId);

    UserModel getUserByPostId(Integer id);
    
    List<PortfolioDto> getAllPortfolioByUserId(Integer userId);

}
