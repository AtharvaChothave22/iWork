package com.freelancing.webapplication.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.freelancing.webapplication.entities.Portfolio;

public interface PortfolioRepo extends JpaRepository<Portfolio, Integer>{
    
}
