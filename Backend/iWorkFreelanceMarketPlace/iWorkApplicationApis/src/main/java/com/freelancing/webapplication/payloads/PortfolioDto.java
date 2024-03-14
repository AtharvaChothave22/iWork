package com.freelancing.webapplication.payloads;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor

public class PortfolioDto {


    private Integer id;

    private String title;

    private String description;

	private String image;

	private String hourlyCharges;

	private CategoryDto category;
	
	private UserDto user;

	
    
}
