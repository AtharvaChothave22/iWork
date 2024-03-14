package com.freelancing.webapplication.payloads;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CategoryDto {

	private Integer id;
	private String title;
	private String description;

}
