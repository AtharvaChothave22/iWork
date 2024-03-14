package com.freelancing.webapplication.payloads;

import java.util.Date;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PostDto {

	private Integer id;

	private String title;

	private String description;

	private String image;

	private boolean status;

	private String budget;

	private Date createdAt;

	private Date updatedAt;

}
