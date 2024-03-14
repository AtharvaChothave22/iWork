package com.freelancing.webapplication.model;

import lombok.Data;

// AuthToken

@Data
public class AuthToken {

    private UserModel userModel;

    private String accessToken;
}