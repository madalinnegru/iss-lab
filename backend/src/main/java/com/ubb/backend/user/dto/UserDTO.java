package com.ubb.backend.user.dto;

import java.util.UUID;

public record UserDTO(UUID id, String name, String email, String password, String timeZone) {
}
