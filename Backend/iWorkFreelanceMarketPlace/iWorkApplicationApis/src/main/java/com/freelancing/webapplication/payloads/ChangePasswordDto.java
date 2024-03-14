package com.freelancing.webapplication.payloads;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ChangePasswordDto {

    private Integer userId;
    private String oldPassword;
    private String newPassword;
}
