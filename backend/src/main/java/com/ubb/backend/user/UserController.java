package com.ubb.backend.user;

import com.ubb.backend.user.dto.UserDTO;
import com.ubb.backend.user.dto.UserMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;
    private final UserMapper userMapper;

    @GetMapping
    public Page<UserDTO> findAll(Pageable pageable) {
        return userService.findAll(pageable).map(userMapper::toDTO);
    }

    @GetMapping("/{id}")
    public UserDTO findOne(@PathVariable UUID id) {
        User user = userService.findById(id);
        return userMapper.toDTO(user);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public UserDTO save(@RequestBody UserDTO dto) {
        User user = userMapper.toEntity(dto);
        User savedUser = userService.save(user);
        return userMapper.toDTO(savedUser);
    }
}
